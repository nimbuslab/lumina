/**
 * Componente de OG image para changelogs da nimbuslab.
 *
 * Visual inspirado no changelog do Linear: header dark, content area limpa,
 * footer dark. Usa inline styles (requisito do Satori).
 * Compativel com `next/og` ImageResponse.
 *
 * @example
 * ```tsx
 * import { ImageResponse } from "next/og"
 * import { ChangelogCard } from "@nimbuslab/lumina/og/changelog-card"
 * import { loadOGFonts } from "@nimbuslab/lumina/og/load-font"
 *
 * export const size = { width: 1200, height: 630 }
 * export const contentType = "image/png"
 *
 * export async function GET(request: Request) {
 *   const fonts = await loadOGFonts()
 *   const { searchParams } = new URL(request.url)
 *   return new ImageResponse(
 *     <ChangelogCard
 *       app="cumulus"
 *       title="Kanban redesenhado"
 *       description="Nova visao de kanban com drag-and-drop e colunas customizaveis."
 *       type="feature"
 *     />,
 *     { ...size, fonts }
 *   )
 * }
 * ```
 */

// ── Tokens ────────────────────────────────────────────────────────────────────

const colors = {
  // Dark (header e footer)
  darkBg: "#141210",
  darkBorder: "#2a2420",
  cream: "#F0E8DC",
  muted: "#8A8078",
  nimbus: "#FF5500",

  // Light (content area)
  contentBg: "#F8F6F3",
  contentText: "#1a1614",
  contentMuted: "#6b6560",
  contentBorder: "#e8e2da",
}

const BADGE_STYLES: Record<ChangelogType, { bg: string; color: string; label: string }> = {
  feature: { bg: "rgba(255,85,0,0.12)", color: "#FF5500", label: "Feature" },
  fix: { bg: "rgba(34,197,94,0.12)", color: "#16a34a", label: "Fix" },
  improvement: { bg: "rgba(59,130,246,0.12)", color: "#2563eb", label: "Melhoria" },
  breaking: { bg: "rgba(239,68,68,0.12)", color: "#dc2626", label: "Breaking" },
}

// Nimbus cloud SVG path
const CLOUD_PATH =
  "M115.252 124C143.263 124 165.97 101.18 165.97 73.02C165.97 44.86 143.263 22.03 115.252 22.03C113.356 22.03 111.482 22.14 109.636 22.35C109.579 22.24 109.521 22.14 109.456 22.03C101.59 8.84 87.226 0 70.814 0C49.988 0 32.477 14.21 27.324 33.51C26.97 34.82 26.673 36.17 26.449 37.53C10.869 44.65.029 60.43.029 78.75.029 103.74 20.182 124 45.039 124H115.252Z"

// ── Types ─────────────────────────────────────────────────────────────────────

export type ChangelogType = "feature" | "fix" | "improvement" | "breaking"

export interface ChangelogCardProps {
  /** Nome do app/produto (ex: "cumulus", "sentinel", "lola") */
  app: string
  /** Titulo da feature/mudanca */
  title: string
  /** Descricao curta (opcional) */
  description?: string
  /** Tipo da mudanca */
  type: ChangelogType
  /** Data formatada (ex: "12 mar 2026"). Se omitida, nao exibe data. */
  date?: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ChangelogCard({ app, title, description, type, date }: ChangelogCardProps) {
  const badge = BADGE_STYLES[type]

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter",
        overflow: "hidden",
      }}
    >
      {/* Header dark */}
      <div
        style={{
          background: colors.darkBg,
          borderBottom: `1px solid ${colors.darkBorder}`,
          padding: "22px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo + app name */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <svg width="36" height="27" viewBox="0 0 166 124" fill="none">
            <path d={CLOUD_PATH} fill={colors.nimbus} />
          </svg>
          <span
            style={{
              fontFamily: "Comfortaa",
              fontSize: "22px",
              fontWeight: 700,
              color: colors.cream,
              display: "flex",
              alignItems: "center",
              gap: "0px",
            }}
          >
            {app}
            <span style={{ color: colors.nimbus }}>.</span>
          </span>
        </div>

        {/* Data */}
        {date && (
          <span
            style={{
              fontSize: "14px",
              color: colors.muted,
              letterSpacing: "0.03em",
              display: "flex",
            }}
          >
            {date}
          </span>
        )}
      </div>

      {/* Content area — light */}
      <div
        style={{
          flex: 1,
          background: colors.contentBg,
          padding: "56px 64px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Badge de tipo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: "20px",
                background: badge.bg,
                fontSize: "13px",
                fontWeight: 600,
                color: badge.color,
                letterSpacing: "0.02em",
              }}
            >
              {badge.label}
            </div>
          </div>

          {/* Titulo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "Comfortaa",
                fontSize: "52px",
                fontWeight: 700,
                lineHeight: 1.15,
                color: colors.contentText,
                display: "flex",
                maxWidth: "900px",
              }}
            >
              {title}
            </span>

            {description && (
              <span
                style={{
                  fontSize: "22px",
                  lineHeight: 1.55,
                  color: colors.contentMuted,
                  maxWidth: "760px",
                  display: "flex",
                }}
              >
                {description}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer dark */}
      <div
        style={{
          background: colors.darkBg,
          borderTop: `1px solid ${colors.darkBorder}`,
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: "Comfortaa",
            fontSize: "16px",
            fontWeight: 700,
            color: colors.muted,
            display: "flex",
            alignItems: "center",
            gap: "0px",
          }}
        >
          by nimbuslab
          <span style={{ color: colors.nimbus }}>.</span>
        </span>
      </div>
    </div>
  )
}
