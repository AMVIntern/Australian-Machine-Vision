import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Australian Machine Vision - machine vision and automated inspection";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #2dd4bf 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, opacity: 0.9 }}>
          Australian Machine Vision
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Inspection systems engineered for reliability and real world
          performance
        </div>
        <div style={{ fontSize: 30, marginTop: 36, opacity: 0.92 }}>
          Machine vision and automated inspection · Australia and global markets
        </div>
      </div>
    ),
    { ...size }
  );
}
