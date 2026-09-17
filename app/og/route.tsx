import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

// Edge Runtime required by @vercel/og
export const runtime = "edge";

/**
 * /og route — dynamic Open Graph image generator.
 *
 * Query params:
 *   title       — headline text (required)
 *   description — subtitle / excerpt (optional)
 *   type        — "post" | "project" | "page" (optional, default "page")
 *
 * Example:
 *   /og?title=Building+a+Real-Time+API&description=A+deep+dive&type=post
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") ?? "Jathuja";
  const description =
    searchParams.get("description") ??
    "IT Undergraduate & Full-Stack Developer";
  const type = (searchParams.get("type") ?? "page").toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0B0B0C",
          padding: "64px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Accent bar — top left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            backgroundColor: "#FF4D2E",
          }}
        />

        {/* Grid lines — decorative */}
        <div
          style={{
            position: "absolute",
            bottom: "120px",
            left: "64px",
            right: "64px",
            height: "1px",
            backgroundColor: "rgba(247,246,243,0.08)",
          }}
        />

        {/* Type badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "4px 12px",
              border: "1px solid rgba(255,77,46,0.4)",
              color: "#FF4D2E",
              fontSize: "11px",
              letterSpacing: "0.15em",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {type}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 44 : 56,
              fontWeight: 400,
              color: "#F7F6F3",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              maxWidth: "880px",
              marginBottom: "24px",
            }}
          >
            {title}
          </div>

          {description && (
            <div
              style={{
                fontSize: 20,
                color: "rgba(247,246,243,0.55)",
                lineHeight: 1.5,
                maxWidth: "720px",
                fontFamily: "sans-serif",
                fontWeight: 400,
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Footer: author identity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingTop: "32px",
          }}
        >
          {/* Monogram box */}
          <div
            style={{
              display: "flex",
              width: "40px",
              height: "40px",
              backgroundColor: "#FF4D2E",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 700,
              color: "#fff",
              fontFamily: "monospace",
            }}
          >
            J
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#F7F6F3",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              JATHUJA
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(247,246,243,0.45)",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
              }}
            >
              IT UNDERGRADUATE &amp; FULL-STACK DEVELOPER
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
