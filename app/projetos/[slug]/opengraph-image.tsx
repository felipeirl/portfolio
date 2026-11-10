import { ImageResponse } from "next/og";
import { getCase } from "@/data/cases";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCase(slug);
  const title = item?.title ?? profile.name;
  const summary = item?.summary.pt ?? profile.role.pt;
  const stack = item?.stack.join(" · ") ?? "";

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
            "radial-gradient(circle at 85% 0%, rgba(255,202,137,0.35), transparent 55%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 36, color: "#ffca89", display: "flex" }}>{profile.name}</div>
        <div style={{ fontSize: 120, fontWeight: 800, marginTop: 16, textTransform: "uppercase", display: "flex" }}>
          {title}
        </div>
        <div style={{ fontSize: 32, marginTop: 24, color: "rgba(255,255,255,0.75)", display: "flex", maxWidth: 1000 }}>
          {summary}
        </div>
        <div style={{ fontSize: 26, marginTop: 36, color: "#ffca89", display: "flex" }}>{stack}</div>
      </div>
    ),
    size,
  );
}
