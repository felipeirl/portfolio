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
          backgroundColor: "#07090d",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(124,77,255,0.35), transparent 50%), radial-gradient(circle at 90% 90%, rgba(0,229,255,0.25), transparent 50%)",
          color: "#e6edf3",
        }}
      >
        <div style={{ fontSize: 28, color: "#00e5ff", fontFamily: "monospace", display: "flex" }}>
          $ whoami
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24, display: "flex" }}>
          {profile.name}
        </div>
        <div
          style={{
            fontSize: 48,
            marginTop: 12,
            display: "flex",
            color: "#00e5ff",
          }}
        >
          {profile.role.pt}
        </div>
        <div style={{ fontSize: 30, marginTop: 36, color: "#8b949e", display: "flex" }}>
          Go · REST APIs · Microsserviços · AWS · IA
        </div>
      </div>
    ),
    size,
  );
}
