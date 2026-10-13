import * as THREE from "three";

/**
 * A structured-light scanning scene: a point cloud product sits in a dark
 * inspection volume while a sheet of light sweeps across it. Scroll progress
 * morphs the cloud from a bottle into a gear, then disperses it into a flat
 * measurement lattice.
 *
 * Pure three.js, owned by a single <canvas>. The React wrapper drives
 * progress, pointer and lifecycle.
 */

const VERT = /* glsl */ `
  attribute vec3 aBottle;
  attribute vec3 aGear;
  attribute vec3 aGrid;
  attribute vec3 aScatter;
  attribute float aRand;

  uniform float uTime;
  uniform float uIntro;   // 0 scattered, 1 assembled
  uniform float uM1;      // bottle -> gear
  uniform float uM2;      // -> lattice
  uniform float uScanX;   // scan sheet position in object space
  uniform float uSweep;   // 1 while the sheet is sweeping
  uniform float uSize;
  uniform float uDpr;

  varying float vFlash;
  varying float vBase;
  varying float vFade;

  void main() {
    float s1 = smoothstep(aRand * 0.35, aRand * 0.35 + 0.65, uM1);
    float s2 = smoothstep(aRand * 0.4, aRand * 0.4 + 0.6, uM2);
    float si = smoothstep(aRand * 0.5, aRand * 0.5 + 0.5, uIntro);

    vec3 pos = mix(aBottle, aGear, s1);
    pos = mix(pos, aGrid, s2);
    pos = mix(aScatter, pos, si);

    // idle shimmer, stronger while dispersing
    float w = 0.008 + s2 * 0.05 + (1.0 - si) * 0.08;
    pos += w * vec3(
      sin(uTime * 1.6 + aRand * 43.7),
      cos(uTime * 1.2 + aRand * 29.3),
      sin(uTime * 2.0 + aRand * 17.1)
    );

    // light sheet: sharp flash at the sheet, soft trailing afterglow
    float d = pos.x - uScanX;
    float flash = exp(-d * d * 70.0) * uSweep;
    float tail = exp(-max(-d, 0.0) * 2.4) * step(d, 0.0) * uSweep * 0.4;
    vFlash = flash;
    vBase = 0.24 + tail * 0.4;
    vFade = 1.0 - smoothstep(0.75, 1.0, uM2) * 0.72;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = uSize * (0.75 + aRand * 0.65) * (1.0 + flash * 1.1);
    gl_PointSize = size * uDpr * (4.6 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;

  varying float vFlash;
  varying float vBase;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.2, length(c)) * 0.3;
    if (a < 0.01) discard;

    vec3 teal = vec3(0.078, 0.643, 0.612);   // #14a49c
    vec3 cyan = vec3(0.55, 0.93, 1.0);       // scan light
    vec3 col = teal * vBase + cyan * vFlash * 1.05;

    gl_FragColor = vec4(col, a * vFade);
  }
`;

const SHEET_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SHEET_FRAG = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uOpacity;
  void main() {
    float edgeY = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.78, vUv.y);
    float core = smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
    vec3 cyan = vec3(0.55, 0.93, 1.0);
    gl_FragColor = vec4(cyan, core * edgeY * uOpacity);
  }
`;

function bottleRadius(t: number): number {
  // t: 0 at base, 1 at lip
  if (t < 0.045) return 0.5 * (t / 0.045) * 0.2 + 0.42; // rounded base edge
  if (t < 0.56) return 0.54;
  if (t < 0.74) {
    const k = (t - 0.56) / 0.18;
    const e = k * k * (3 - 2 * k);
    return 0.54 - e * 0.335; // shoulder
  }
  if (t < 0.93) return 0.205 - (t - 0.74) * 0.05;
  return 0.225; // lip ring
}

function gearRadius(theta: number): number {
  const teeth = 12;
  const w = Math.sin(theta * teeth);
  const tooth = Math.min(Math.max(w * 2.4, -1), 1) * 0.5 + 0.5; // soft square wave
  return 0.78 + tooth * 0.18;
}

function buildAttributes(count: number) {
  const bottle = new Float32Array(count * 3);
  const gear = new Float32Array(count * 3);
  const grid = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const rand = new Float32Array(count);

  const side = Math.ceil(Math.sqrt(count));
  const gearTiltX = 0.42;
  const gearTiltY = -0.3;

  for (let i = 0; i < count; i++) {
    const r1 = Math.random();
    rand[i] = r1;

    // bottle: lathe surface, denser where circumference is larger
    let t = Math.random();
    // bias samples toward the wider body so density looks even
    if (Math.random() < 0.35) t = Math.random() * 0.56;
    const theta = Math.random() * Math.PI * 2;
    const br = bottleRadius(t);
    const by = t * 3.0 - 1.5;
    bottle[i * 3] = Math.cos(theta) * br;
    bottle[i * 3 + 1] = by;
    bottle[i * 3 + 2] = Math.sin(theta) * br;

    // gear: annulus with teeth, slight thickness, tilted toward camera
    const gTheta = Math.random() * Math.PI * 2;
    const rMax = gearRadius(gTheta);
    const hole = 0.3;
    const rr = Math.sqrt(Math.random());
    const gr = hole + (rMax - hole) * rr;
    let gx = Math.cos(gTheta) * gr;
    let gy = Math.sin(gTheta) * gr;
    let gz = (Math.random() - 0.5) * 0.3;
    // rotate around X then Y so the gear face reads in perspective
    let y2 = gy * Math.cos(gearTiltX) - gz * Math.sin(gearTiltX);
    let z2 = gy * Math.sin(gearTiltX) + gz * Math.cos(gearTiltX);
    let x2 = gx * Math.cos(gearTiltY) + z2 * Math.sin(gearTiltY);
    let z3 = -gx * Math.sin(gearTiltY) + z2 * Math.cos(gearTiltY);
    gear[i * 3] = x2;
    gear[i * 3 + 1] = y2;
    gear[i * 3 + 2] = z3;

    // lattice: ordered rows filling a wide plane
    const gxi = i % side;
    const gyi = Math.floor(i / side);
    grid[i * 3] = (gxi / (side - 1) - 0.5) * 9.0 + (Math.random() - 0.5) * 0.05;
    grid[i * 3 + 1] = (gyi / (side - 1) - 0.5) * 5.2 + (Math.random() - 0.5) * 0.05;
    grid[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

    // intro scatter: loose shell around the volume
    const sr = 2.6 + Math.random() * 2.4;
    const sphi = Math.acos(2 * Math.random() - 1);
    const sth = Math.random() * Math.PI * 2;
    scatter[i * 3] = Math.sin(sphi) * Math.cos(sth) * sr;
    scatter[i * 3 + 1] = Math.cos(sphi) * sr * 0.7;
    scatter[i * 3 + 2] = Math.sin(sphi) * Math.sin(sth) * sr;
  }

  return { bottle, gear, grid, scatter, rand };
}

export class ScanField {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private group = new THREE.Group();
  private points: THREE.Points;
  private sheet: THREE.Mesh;
  private pointsMat: THREE.ShaderMaterial;
  private sheetMat: THREE.ShaderMaterial;
  private clock = new THREE.Clock();
  private raf = 0;
  private running = false;
  private progress = 0;
  private pointer = { x: 0, y: 0 };
  private rot = { x: 0, y: 0 };
  private desktopShift = 0;

  constructor(canvas: HTMLCanvasElement, particleCount: number) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    this.camera.position.set(0, 0, 6.4);

    const attrs = buildAttributes(particleCount);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(attrs.bottle, 3));
    geo.setAttribute("aBottle", new THREE.BufferAttribute(attrs.bottle, 3));
    geo.setAttribute("aGear", new THREE.BufferAttribute(attrs.gear, 3));
    geo.setAttribute("aGrid", new THREE.BufferAttribute(attrs.grid, 3));
    geo.setAttribute("aScatter", new THREE.BufferAttribute(attrs.scatter, 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(attrs.rand, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 12);

    this.pointsMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uIntro: { value: 0 },
        uM1: { value: 0 },
        uM2: { value: 0 },
        uScanX: { value: -2 },
        uSweep: { value: 0 },
        uSize: { value: 13 },
        uDpr: { value: 1 },
      },
    });

    this.points = new THREE.Points(geo, this.pointsMat);
    this.group.add(this.points);

    this.sheetMat = new THREE.ShaderMaterial({
      vertexShader: SHEET_VERT,
      fragmentShader: SHEET_FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uOpacity: { value: 0 } },
    });
    this.sheet = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 3.8), this.sheetMat);
    this.group.add(this.sheet);

    this.scene.add(this.group);
  }

  resize(width: number, height: number) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.pointsMat.uniforms.uDpr.value = dpr;

    // keep the object right of the copy on wide screens, centred on small
    const wide = width / height > 1.05 && width >= 1024;
    this.desktopShift = wide ? 1.55 : 0;
    const scale = wide ? 1 : Math.max(0.62, Math.min(width / 900, 0.85));
    this.group.scale.setScalar(scale);
    if (!wide) this.group.position.y = 0.25;
    else this.group.position.y = 0;
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
    const t = this.clock.getElapsedTime();
    const u = this.pointsMat.uniforms;

    u.uTime.value = t;
    u.uIntro.value = Math.min(u.uIntro.value + 0.012, 1);

    const p = this.progress;
    const sm = (a: number, b: number, x: number) => {
      const k = Math.min(Math.max((x - a) / (b - a), 0), 1);
      return k * k * (3 - 2 * k);
    };
    u.uM1.value = sm(0.3, 0.62, p);
    u.uM2.value = sm(0.68, 0.98, p);

    // scan sweep cycle: across in 2.6s, dark for 1.6s
    const period = 4.2;
    const ct = t % period;
    const sweeping = ct < 2.6 ? 1 : 0;
    const k = Math.min(ct / 2.6, 1);
    const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const scanX = -1.7 + eased * 3.4;
    const sweepVis = sweeping * (1 - u.uM2.value);
    u.uScanX.value = scanX;
    u.uSweep.value = sweepVis;

    this.sheet.position.x = scanX;
    this.sheetMat.uniforms.uOpacity.value =
      0.32 * sweepVis * Math.min(u.uIntro.value * 1.6, 1);

    // slow turntable plus pointer parallax
    const targetY = t * 0.1 + this.pointer.x * 0.22;
    const targetX = this.pointer.y * 0.14;
    this.rot.y += (targetY - this.rot.y) * 0.06;
    this.rot.x += (targetX - this.rot.x) * 0.06;
    this.points.rotation.y = this.rot.y;
    this.points.rotation.x = this.rot.x;
    // the lattice should face the camera squarely as it takes over
    const flat = u.uM2.value;
    this.points.rotation.y *= 1 - flat;
    this.points.rotation.x *= 1 - flat;

    // drift the whole group toward centre as the object dissolves
    this.group.position.x = this.desktopShift * (1 - flat);

    // camera eases back during the gear reveal
    this.camera.position.z = 6.4 + u.uM1.value * 0.5 - flat * 0.4;

    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.tick);
  };

  start() {
    if (this.running) return;
    this.running = true;
    this.clock.getDelta();
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  renderOnce() {
    const u = this.pointsMat.uniforms;
    u.uIntro.value = 1;
    u.uTime.value = 1.3; // sheet mid-object for the static frame
    u.uScanX.value = 0.2;
    u.uSweep.value = 1;
    this.sheet.position.x = 0.2;
    this.sheetMat.uniforms.uOpacity.value = 0.32;
    this.group.position.x = this.desktopShift;
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.stop();
    this.points.geometry.dispose();
    this.pointsMat.dispose();
    this.sheet.geometry.dispose();
    this.sheetMat.dispose();
    this.renderer.dispose();
  }
}
