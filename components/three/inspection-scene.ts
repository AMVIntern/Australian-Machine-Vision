import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import {
  GEAR,
  MAX_HEIGHT,
  borePoints,
  circlePoints,
  kidneyPoints,
  outlinePoints,
  surfaceHeight,
} from "./gear-geometry";

/**
 * A machined gear on an inspection table, measured by a sweeping laser line
 * (3D laser profiling). Scroll progress moves the camera from a three-quarter
 * view to straight overhead while fitted features lock on to the part.
 *
 * Pure three.js, owned by one <canvas>; an optional second canvas receives
 * the live height profile under the laser. The React wrapper drives
 * progress, pointer, framing and lifecycle.
 */

const TAU = Math.PI * 2;
const BEVEL = 0.012;
const TOP = GEAR.web + BEVEL * 2; // top of the disc after bevels
const HUB_TOP = TOP + GEAR.hubH;
const LASER_RANGE = 1.3;
const LASER_PERIOD = 6.4; // seconds for one sweep there and back

const sm = (a: number, b: number, x: number) => {
  const k = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return k * k * (3 - 2 * k);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type LaserUniforms = {
  uLaserX: { value: number };
  uLaserOn: { value: number };
};

/** Paint the laser sheet's intersection line onto a lit material. */
function withLaser(mat: THREE.MeshStandardMaterial, u: LaserUniforms) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uLaserX = u.uLaserX;
    shader.uniforms.uLaserOn = u.uLaserOn;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vLaserW;")
      .replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvLaserW = (modelMatrix * vec4(transformed, 1.0)).xyz;"
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vLaserW;\nuniform float uLaserX;\nuniform float uLaserOn;"
      )
      .replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
        float ld = abs(vLaserW.x - uLaserX);
        float core = 1.0 - smoothstep(0.004, 0.009, ld);
        float glow = exp(-ld * 60.0);
        gl_FragColor.rgb = min(gl_FragColor.rgb + vec3(0.13, 0.83, 0.93) * (core * 1.3 + glow * 0.28) * uLaserOn, vec3(1.0));`
      );
  };
}

const FLOOR_VERT = /* glsl */ `
  varying vec3 vW;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const FLOOR_FRAG = /* glsl */ `
  varying vec3 vW;
  uniform float uLaserX;
  uniform float uLaserOn;
  void main() {
    vec2 p = vW.xz;
    vec2 q = p / 0.2;
    vec2 g = abs(fract(q - 0.5) - 0.5) / fwidth(q);
    float minor = 1.0 - min(min(g.x, g.y), 1.0);
    vec2 q2 = p;
    vec2 g2 = abs(fract(q2 - 0.5) - 0.5) / fwidth(q2);
    float major = 1.0 - min(min(g2.x, g2.y), 1.0);
    float fade = smoothstep(3.1, 0.9, length(p));
    float grid = max(minor * 0.09, major * 0.2) * fade;

    float ld = abs(vW.x - uLaserX);
    float reach = smoothstep(2.2, 0.6, abs(vW.z)) * uLaserOn;
    float core = (1.0 - smoothstep(0.004, 0.009, ld)) * reach;
    float glow = exp(-ld * 40.0) * 0.22 * reach;
    float laser = max(core, glow);

    vec3 col = mix(vec3(0.078, 0.643, 0.612), vec3(0.13, 0.83, 0.93), step(0.001, laser));
    gl_FragColor = vec4(col, max(grid, laser));
  }
`;

function makeLine(
  pts: [number, number][],
  y: number,
  closed: boolean,
  mat: LineMaterial
) {
  const flat: number[] = [];
  const list = closed ? [...pts, pts[0]] : pts;
  // top-view (x, y) -> scene (x, height, -y)
  for (const [x, z] of list) flat.push(x, y, -z);
  const geo = new LineGeometry();
  geo.setPositions(flat);
  const line = new Line2(geo, mat);
  line.computeLineDistances();
  line.renderOrder = 5;
  return { line, segments: list.length - 1 };
}

export class InspectionScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(28, 1, 0.1, 60);
  private part = new THREE.Group();
  private envTex: THREE.Texture;
  private laser: LaserUniforms = { uLaserX: { value: 0 }, uLaserOn: { value: 0 } };
  private overlays: { line: Line2; segments: number; from: number; to: number }[] = [];
  private lineMats: LineMaterial[] = [];
  private disposables: { dispose(): void }[] = [];
  private profileCanvas: HTMLCanvasElement | null;
  private profileCtx: CanvasRenderingContext2D | null;
  private clock = new THREE.Clock();
  private time = 0;
  private raf = 0;
  private running = false;
  private progress = 0;
  private pointer = { x: 0, y: 0 };
  private eased = { x: 0, y: 0 };
  private shift = 0; // fraction of the width the subject is moved right
  private width = 1;
  private height = 1;

  constructor(canvas: HTMLCanvasElement, profileCanvas?: HTMLCanvasElement | null) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.profileCanvas = profileCanvas ?? null;
    this.profileCtx = this.profileCanvas?.getContext("2d") ?? null;

    // studio reflections without loading an HDR file
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.envTex = pmrem.fromScene(room, 0.04).texture;
    this.scene.environment = this.envTex;
    room.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      (m.material as THREE.Material | undefined)?.dispose?.();
    });
    pmrem.dispose();

    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(2.4, 6.5, 3.4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -1.9;
    key.shadow.camera.right = 1.9;
    key.shadow.camera.top = 1.9;
    key.shadow.camera.bottom = -1.9;
    key.shadow.camera.near = 2;
    key.shadow.camera.far = 14;
    key.shadow.radius = 5;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    this.scene.add(key, new THREE.HemisphereLight(0xf4fbfa, 0xc9d3d1, 0.55));

    this.buildPart();
    this.buildTable();
    this.buildOverlays();
    this.scene.add(this.part);
  }

  private buildPart() {
    const metal = new THREE.MeshStandardMaterial({
      color: 0x9aa6ab,
      metalness: 1,
      roughness: 0.33,
      envMapIntensity: 0.95,
    });
    withLaser(metal, this.laser);
    this.disposables.push(metal);

    const toPath = (pts: [number, number][]) => new THREE.Path(pts.map(([x, y]) => new THREE.Vector2(x, y)));
    const bevel = {
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL,
      bevelSegments: 2,
    };

    // disc: outline with the slots and the bore cut through
    const disc = new THREE.Shape(outlinePoints().map(([x, y]) => new THREE.Vector2(x, y)));
    for (let k = 0; k < GEAR.holes; k++) disc.holes.push(toPath(kidneyPoints(k)));
    disc.holes.push(toPath(borePoints()));
    const discGeo = new THREE.ExtrudeGeometry(disc, { depth: GEAR.web, ...bevel });
    discGeo.rotateX(-Math.PI / 2);
    discGeo.translate(0, BEVEL, 0);

    // raised hub around the bore
    const hub = new THREE.Shape(circlePoints(GEAR.hubR, 128).map(([x, y]) => new THREE.Vector2(x, y)));
    hub.holes.push(toPath(borePoints()));
    const hubGeo = new THREE.ExtrudeGeometry(hub, { depth: GEAR.hubH - BEVEL, ...bevel });
    hubGeo.rotateX(-Math.PI / 2);
    hubGeo.translate(0, TOP - BEVEL * 0.5, 0);

    for (const geo of [discGeo, hubGeo]) {
      const mesh = new THREE.Mesh(geo, metal);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.part.add(mesh);
      this.disposables.push(geo);
    }
  }

  private buildTable() {
    const shadowGeo = new THREE.PlaneGeometry(10, 10);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.receiveShadow = true;
    shadow.renderOrder = 1;

    const gridGeo = new THREE.PlaneGeometry(8, 8);
    gridGeo.rotateX(-Math.PI / 2);
    const gridMat = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VERT,
      fragmentShader: FLOOR_FRAG,
      uniforms: { uLaserX: this.laser.uLaserX, uLaserOn: this.laser.uLaserOn },
      transparent: true,
      depthWrite: false,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.position.y = 0.0006;
    grid.renderOrder = 2;

    this.scene.add(shadow, grid);
    this.disposables.push(shadowGeo, shadowMat, gridGeo, gridMat);
  }

  private buildOverlays() {
    const mat = (color: number, opts: Partial<{ dashed: boolean; width: number }> = {}) => {
      const m = new LineMaterial({
        color,
        linewidth: opts.width ?? 1.6,
        dashed: opts.dashed ?? false,
        dashSize: 0.05,
        gapSize: 0.035,
        transparent: true,
        toneMapped: false,
      });
      this.lineMats.push(m);
      return m;
    };
    const teal = mat(0x0d9488);
    const dashed = mat(0x5c6f6c, { dashed: true, width: 1.2 });
    const lift = 0.004;

    const add = (o: { line: Line2; segments: number }, from: number, to: number) => {
      o.line.visible = false;
      this.part.add(o.line);
      this.overlays.push({ ...o, from, to });
      this.disposables.push(o.line.geometry);
    };

    add(makeLine(circlePoints(GEAR.tipR + 0.06, 160), TOP + lift, true, dashed), 0.42, 0.58);
    add(makeLine(circlePoints(GEAR.boreR + 0.03, 72), HUB_TOP + lift, true, teal), 0.47, 0.6);
    const c = 0.3;
    add(makeLine([[-c, 0], [c, 0]], HUB_TOP + lift, false, teal), 0.5, 0.6);
    add(makeLine([[0, -c], [0, c]], HUB_TOP + lift, false, teal), 0.52, 0.62);
    for (let k = 0; k < GEAR.holes; k++) {
      add(makeLine(kidneyPoints(k, 24, 0.022), TOP + lift, true, teal), 0.55 + k * 0.03, 0.66 + k * 0.03);
    }
  }

  get isRunning() {
    return this.running;
  }

  resize(width: number, height: number) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    // wide screens: copy on the left, the part on the right
    const wide = this.width / this.height > 1.1 && this.width >= 1024;
    this.shift = wide ? 0.21 : 0;
    this.camera.setViewOffset(this.width, this.height, -this.shift * this.width, 0, this.width, this.height);
    this.camera.updateProjectionMatrix();
    for (const m of this.lineMats) m.resolution.set(this.width, this.height);

    if (this.profileCanvas) {
      this.profileCanvas.width = Math.round(this.profileCanvas.clientWidth * dpr);
      this.profileCanvas.height = Math.round(this.profileCanvas.clientHeight * dpr);
    }
  }

  setProgress(p: number) {
    this.progress = p;
  }

  setPointer(x: number, y: number) {
    this.pointer.x = x;
    this.pointer.y = y;
  }

  private tick = () => {
    if (!this.running) return;
    this.update(Math.min(this.clock.getDelta(), 0.05));
    this.renderer.render(this.scene, this.camera);
    this.drawProfile();
    this.raf = requestAnimationFrame(this.tick);
  };

  /** Advance by dt seconds. dt = 0 re-poses the current moment (paused). */
  private update(dt: number) {
    this.time += dt;
    const t = this.time;
    const p = this.progress;

    // laser sweeps there and back across the part
    this.laser.uLaserX.value = -LASER_RANGE * Math.cos((t * TAU) / LASER_PERIOD);
    this.laser.uLaserOn.value = sm(0.3, 1.2, t);

    // slow turntable
    this.part.rotation.y = -0.4 + t * 0.05;

    // pointer parallax, eased; frozen while paused
    const ease = 1 - Math.pow(0.92, dt * 60);
    this.eased.x += (this.pointer.x - this.eased.x) * ease;
    this.eased.y += (this.pointer.y - this.eased.y) * ease;

    // three-quarter view -> overhead inspection camera
    const top = sm(0.18, 0.62, p);
    const polar = lerp(0.98, 0.07, top) + this.eased.y * 0.05 * (1 - top);
    const az = lerp(-0.62, 0, top) + this.eased.x * 0.14 * (1 - 0.6 * top);
    const radius = lerp(7.2, 6.5, top);
    const target = new THREE.Vector3(0, lerp(0.14, 0.05, top), 0);
    this.camera.position.set(
      target.x + radius * Math.sin(polar) * Math.sin(az),
      target.y + radius * Math.cos(polar),
      target.z + radius * Math.sin(polar) * Math.cos(az)
    );
    this.camera.lookAt(target);

    // fitted features draw on as the camera settles overhead
    for (const o of this.overlays) {
      const k = sm(o.from, o.to, p);
      o.line.visible = k > 0.001;
      o.line.geometry.instanceCount = Math.max(1, Math.ceil(o.segments * k));
    }
  }

  /** Height profile along the laser line, drawn into the readout canvas. */
  private drawProfile() {
    const c = this.profileCanvas;
    const ctx = this.profileCtx;
    if (!c || !ctx || !c.width || !c.height) return;
    const W = c.width;
    const H = c.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const padTop = 8 * dpr;
    const padBottom = 7 * dpr;
    const base = H - padBottom;
    const scaleY = (H - padTop - padBottom) / MAX_HEIGHT;
    const x = this.laser.uLaserX.value;
    const a = this.part.rotation.y;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    const n = 180;

    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = dpr;
    ctx.strokeStyle = "rgba(16, 29, 27, 0.16)";
    ctx.beginPath();
    ctx.moveTo(0, base + 0.5);
    ctx.lineTo(W, base + 0.5);
    ctx.stroke();

    const ys: number[] = [];
    for (let i = 0; i <= n; i++) {
      const z = -1.25 + (2.5 * i) / n;
      // world -> part-local, then local -> top-view shape coordinates
      const lx = ca * x - sa * z;
      const lz = sa * x + ca * z;
      ys.push(base - surfaceHeight(lx, -lz) * scaleY * this.laser.uLaserOn.value);
    }

    ctx.beginPath();
    ys.forEach((y, i) => {
      const px = (W * i) / n;
      if (i === 0) ctx.moveTo(px, y);
      else ctx.lineTo(px, y);
    });
    ctx.lineTo(W, base);
    ctx.lineTo(0, base);
    ctx.closePath();
    ctx.fillStyle = "rgba(20, 164, 156, 0.12)";
    ctx.fill();

    ctx.beginPath();
    ys.forEach((y, i) => {
      const px = (W * i) / n;
      if (i === 0) ctx.moveTo(px, y);
      else ctx.lineTo(px, y);
    });
    ctx.strokeStyle = "#0d9488";
    ctx.lineWidth = 1.5 * dpr;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.clock.getDelta(); // drop the time spent stopped
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  /** Skip the intro and pose the laser across the hub: the still frame. */
  primeStill() {
    this.time = 1.87;
  }

  /** Draw the current moment without advancing time. */
  renderStill() {
    this.update(0);
    this.renderer.render(this.scene, this.camera);
    this.drawProfile();
  }

  dispose() {
    this.stop();
    for (const d of this.disposables) d.dispose();
    for (const m of this.lineMats) m.dispose();
    this.envTex.dispose();
    this.renderer.dispose();
  }
}
