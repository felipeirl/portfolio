import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role.pt}`;
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
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(255,202,137,0.35), transparent 55%), radial-gradient(circle at 0% 100%, rgba(255,234,208,0.12), transparent 50%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 40, color: "#ffca89", fontStyle: "italic", display: "flex" }}>
          {profile.name}
        </div>
        <div
          style={{
            fontSize: 128,
            fontWeight: 800,
            lineHeight: 0.95,
            marginTop: 16,
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ display: "flex" }}>Desenvolvedor</span>
          <span style={{ display: "flex", color: "#ffca89" }}>Back-End</span>
        </div>
        <div style={{ fontSize: 30, marginTop: 40, color: "rgba(255,255,255,0.7)", display: "flex" }}>
          Go · REST APIs · Microsserviços · AWS · IA
        </div>
      </div>
    ),
    size,
  );
}
