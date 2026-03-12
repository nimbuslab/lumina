/**
 * Componente de OG image para changelogs da nimbuslab.
 *
 * Design fiel ao DS do cumulus: dark mode warm, cores HSL reais,
 * tipografia Comfortaa + Inter, identidade nimbuslab.
 * Usa inline styles (requisito do Satori). Compativel com `next/og`.
 */

// ── Tokens do DS cumulus (dark mode) ─────────────────────────────────────────

const ds = {
  bg:          "#1A1410", // hsl(20 8% 8%)
  card:        "#211814", // hsl(20 8% 10%)
  cardHover:   "#2A1F1A", // hsl(20 8% 13%)
  border:      "#3D3430", // hsl(20 6% 18%)
  borderFaint: "#2C2420",
  fg:          "#ECEBE8", // hsl(30 10% 92%)
  fgMuted:     "#8D8784", // hsl(20 5% 55%)
  fgSubtle:    "#5C5754", // hsl(20 5% 35%)
  primary:     "#FF5500",
}

const BADGE: Record<ChangelogType, { bg: string; border: string; color: string; label: string }> = {
  feature:     { bg: "rgba(255,85,0,0.1)",  border: "rgba(255,85,0,0.25)",   color: "#FF5500", label: "Feature"  },
  fix:         { bg: "rgba(22,163,74,0.1)", border: "rgba(22,163,74,0.25)",  color: "#4ade80", label: "Fix"      },
  improvement: { bg: "rgba(59,130,246,0.1)",border: "rgba(59,130,246,0.25)", color: "#60a5fa", label: "Melhoria" },
  breaking:    { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.25)",  color: "#f87171", label: "Breaking" },
}

const CLOUD_PATH =
  "M115.252 124C143.263 124 165.97 101.18 165.97 73.02C165.97 44.86 143.263 22.03 115.252 22.03C113.356 22.03 111.482 22.14 109.636 22.35C109.579 22.24 109.521 22.14 109.456 22.03C101.59 8.84 87.226 0 70.814 0C49.988 0 32.477 14.21 27.324 33.51C26.97 34.82 26.673 36.17 26.449 37.53C10.869 44.65.029 60.43.029 78.75.029 103.74 20.182 124 45.039 124H115.252Z"

// ── Types ─────────────────────────────────────────────────────────────────────

export type ChangelogType = "feature" | "fix" | "improvement" | "breaking"

export interface ChangelogCardProps {
  app: string
  title: string
  description?: string
  type: ChangelogType
  date?: string
}

// ── Mock UI (kanban abstrato) ─────────────────────────────────────────────────

function UIMock({ type }: { type: ChangelogType }) {
  const accent = BADGE[type].color
  const cols = [
    { cards: 3, active: false },
    { cards: 2, active: true },
    { cards: 4, active: false },
  ]
  const labels = ["A fazer", "Em progresso", "Concluído"]

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "6px", width: "108px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: col.active ? accent : ds.fgSubtle, display: "flex" }} />
            <span style={{ fontSize: "9px", color: col.active ? ds.fgMuted : ds.fgSubtle, fontFamily: "Inter", display: "flex" }}>
              {labels[ci]}
            </span>
          </div>
          {Array.from({ length: col.cards }).map((_, i) => (
            <div
              key={i}
              style={{
                background: col.active && i === 0 ? ds.cardHover : ds.card,
                border: `1px solid ${col.active && i === 0 ? "rgba(255,85,0,0.3)" : ds.border}`,
                borderRadius: "6px",
                padding: "8px 10px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <div style={{ height: "6px", borderRadius: "3px", background: col.active && i === 0 ? "rgba(255,85,0,0.25)" : ds.borderFaint, width: `${55 + (i * 17) % 30}%`, display: "flex" }} />
              <div style={{ height: "5px", borderRadius: "3px", background: ds.borderFaint, width: `${35 + (i * 13) % 25}%`, display: "flex" }} />
              <div style={{ display: "flex", gap: "3px", marginTop: "2px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: col.active && i === 0 ? accent : ds.fgSubtle, opacity: 0.7, display: "flex" }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ChangelogCard({ app, title, description, type, date }: ChangelogCardProps) {
  const badge = BADGE[type]
  const now = new Date()
  const displayDate = date ?? `${now.getDate()} ${now.toLocaleString("pt-BR", { month: "short" })} ${now.getFullYear()}`

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: ds.bg,
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 65%)", display: "flex" }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px", borderBottom: `1px solid ${ds.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg width="32" height="24" viewBox="0 0 166 124" fill="none">
            <path d={CLOUD_PATH} fill={ds.primary} />
          </svg>
          <span style={{ fontFamily: "Comfortaa", fontSize: "20px", fontWeight: 700, color: ds.fg, display: "flex", letterSpacing: "-0.01em" }}>
            {app}<span style={{ color: ds.primary }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "4px 10px", borderRadius: "6px", border: `1px solid ${ds.border}`, background: ds.card, fontSize: "11px", color: ds.fgMuted, letterSpacing: "0.06em" }}>
            CHANGELOG
          </div>
          <span style={{ fontSize: "13px", color: ds.fgSubtle, display: "flex" }}>{displayDate}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 48px", gap: "56px" }}>
        {/* Texto */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "5px 12px", borderRadius: "6px", border: `1px solid ${badge.border}`, background: badge.bg, fontSize: "12px", fontWeight: 600, color: badge.color, letterSpacing: "0.04em", width: "fit-content" }}>
            {badge.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ fontFamily: "Comfortaa", fontSize: title.length > 28 ? "42px" : "52px", fontWeight: 700, lineHeight: 1.15, color: ds.fg, display: "flex", letterSpacing: "-0.02em" }}>
              {title}
            </span>
            {description && (
              <span style={{ fontSize: "18px", lineHeight: 1.6, color: ds.fgMuted, maxWidth: "500px", display: "flex" }}>
                {description}
              </span>
            )}
          </div>
        </div>

        {/* Mock UI */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: ds.card, border: `1px solid ${ds.border}`, borderRadius: "12px", padding: "24px 20px", flexShrink: 0 }}>
          <UIMock type={type} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", borderTop: `1px solid ${ds.border}` }}>
        <span style={{ fontSize: "12px", color: ds.fgSubtle, display: "flex" }}>nimbuslab.com.br</span>
        <span style={{ fontFamily: "Comfortaa", fontSize: "14px", fontWeight: 700, color: ds.fgSubtle, display: "flex" }}>
          by nimbuslab<span style={{ color: ds.primary }}>.</span>
        </span>
      </div>
    </div>
  )
}
