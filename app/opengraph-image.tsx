import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "BestBridge Consultancy — Thailand Visas, HR & Legal Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #143E6B 0%, #1F5C9A 55%, #4FB8DD 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#E8A33D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#143E6B",
            }}
          >
            BB
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            BestBridge Consultancy
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            Thailand Visas, Work Permits, HR & Legal — done right.
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255,255,255,0.88)",
              maxWidth: 960,
            }}
          >
            Bangkok-based consultancy. Fast turnaround, BOI expertise,
            English & Thai service.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <div>bestbridge.cloud</div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>Visa & Work Permits</span>
            <span>·</span>
            <span>HR Services</span>
            <span>·</span>
            <span>Legal</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
