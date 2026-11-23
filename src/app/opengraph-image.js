import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "Sai Phaneendra & Vyshnavi — Wedding Invitation · 3 December 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (pkg, file) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

export default async function OgImage() {
  const [cinzel, script, cormorant] = await Promise.all([
    font("cinzel", "cinzel-latin-600-normal.woff"),
    font("pinyon-script", "pinyon-script-latin-400-normal.woff"),
    font("cormorant-garamond", "cormorant-garamond-latin-400-italic.woff"),
  ]);
  const gold = "#D9B56C";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 35%, #8C2A38 0%, #4A0B16 60%, #2E060D 100%)" }}>
        <div style={{ position: "absolute", top: 28, left: 28, width: 1144, height: 574, border: `2px solid ${gold}`, display: "flex" }} />
        <div style={{ position: "absolute", top: 40, left: 40, width: 1120, height: 550, border: `1px solid rgba(217,181,108,0.5)`, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#FBF6EC" }}>
          <div style={{ fontFamily: "Cinzel", fontSize: 24, letterSpacing: 8, color: gold }}>SRIRASTHU · SUBHAMASTHU · AVIGHNAMASTHU</div>
          <div style={{ fontFamily: "Cormorant", fontSize: 34, marginTop: 26, color: "#F3E7D0" }}>You're cordially invited to the wedding of</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
            <span style={{ fontFamily: "Pinyon", fontSize: 128, color: "#F6E7B8" }}>Sai Phaneendra</span>
          </div>
          <span style={{ fontFamily: "Cormorant", fontSize: 56, color: gold, marginTop: -18 }}>&amp;</span>
          <span style={{ fontFamily: "Pinyon", fontSize: 128, color: "#F6E7B8", marginTop: -36 }}>Vyshnavi</span>
          <div style={{ fontFamily: "Cinzel", fontSize: 30, letterSpacing: 10, color: gold, marginTop: 10 }}>03 · DECEMBER · 2026</div>
        </div>
      </div>
    ),
    { ...size, fonts: [
      { name: "Cinzel", data: cinzel, weight: 600 },
      { name: "Pinyon", data: script, weight: 400 },
      { name: "Cormorant", data: cormorant, style: "italic" },
    ] }
  );
}
