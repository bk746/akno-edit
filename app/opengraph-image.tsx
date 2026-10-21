import { ImageResponse } from "next/og";

export const alt = "Akno — Des sites que les IA recommandent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          padding: "64px 80px",
          textAlign: "center",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            marginBottom: 48,
          }}
        >
          AK
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 500,
            color: "#f2f2f2",
            letterSpacing: "-0.045em",
            lineHeight: 1.08,
            maxWidth: 900,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span>Des sites que les IA </span>
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            recommandent.
          </span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 22,
            color: "#8e8e93",
            letterSpacing: "-0.01em",
          }}
        >
          Akno — Studio web, Annecy
        </div>
      </div>
    ),
    { ...size },
  );
}
