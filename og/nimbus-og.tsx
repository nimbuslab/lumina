/**
 * Componente reutilizavel para OG images da nimbuslab.
 *
 * Usa inline styles (requisito do Satori) com tokens do Lumina DS.
 * Compativel com `next/og` ImageResponse.
 *
 * @example
 * ```tsx
 * // apps/lola/app/opengraph-image.tsx
 * import { ImageResponse } from "next/og"
 * import { NimbusOG } from "@nimbuslab/lumina/og/nimbus-og"
 * import { loadOGFonts } from "@nimbuslab/lumina/og/load-font"
 *
 * export const size = { width: 1200, height: 630 }
 * export const contentType = "image/png"
 * export const alt = "Lola - Assistente inteligente"
 *
 * export default async function Image() {
 *   const fonts = await loadOGFonts()
 *   return new ImageResponse(
 *     <NimbusOG
 *       brand="lola"
 *       title="Assistente inteligente"
 *       titleAccent="pra quem usa IA de verdade"
 *       description="Memoria persistente, gestao de projetos e comunicacao integrada via MCP."
 *       pills={["Memoria", "Projetos", "Comunicacao", "Multi-provider"]}
 *     />,
 *     { ...size, fonts }
 *   )
 * }
 * ```
 */

import type { ReactNode } from "react"

// ── Tokens Lumina (inline para Satori) ────────────────────────────────────────

const colors = {
  nimbus500: "#FF5500",
  cream: "#F0E8DC",
  muted: "#8A8078",
  subtle: "#5A5450",
  bgStart: "#1a1614",
  bgMid: "#161312",
  bgEnd: "#121010",
}

// ── Nimbus cloud logo SVG path ────────────────────────────────────────────────

const CLOUD_PATH =
  "M115.252 124C143.263 124 165.97 101.18 165.97 73.02C165.97 44.86 143.263 22.03 115.252 22.03C113.356 22.03 111.482 22.14 109.636 22.35C109.579 22.24 109.521 22.14 109.456 22.03C101.59 8.84 87.226 0 70.814 0C49.988 0 32.477 14.21 27.324 33.51C26.97 34.82 26.673 36.17 26.449 37.53C10.869 44.65.029 60.43.029 78.75.029 103.74 20.182 124 45.039 124H115.252Z"

// ── Props ─────────────────────────────────────────────────────────────────────

export interface NimbusOGProps {
  /** Nome do produto (ex: "lola", "sentinel", "dash", "nimbuslab") */
  brand: string
  /** Titulo principal (linha 1, cor clara) */
  title: string
  /** Titulo com destaque (linha 2, cor nimbus-500). Opcional. */
  titleAccent?: string
  /** Descricao curta abaixo do titulo */
  description?: string
  /** Pills/tags no rodape */
  pills?: string[]
  /** Logo customizado (JSX). Se omitido, usa nimbus cloud. */
  logo?: ReactNode
  /** Tamanho da fonte do titulo. Default: 52 */
  titleSize?: number
}

export function NimbusOG({
  brand,
  title,
  titleAccent,
  description,
  pills = [],
  logo,
  titleSize = 52,
}: NimbusOGProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        background: `linear-gradient(145deg, ${colors.bgStart} 0%, ${colors.bgMid} 50%, ${colors.bgEnd} 100%)`,
        fontFamily: "Inter",
        color: colors.cream,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glows decorativos */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-60px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          left: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,85,0,0.04) 0%, transparent 70%)`,
          display: "flex",
        }}
      />

      {/* Top: Logo + brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {logo ?? (
          <svg width="44" height="33" viewBox="0 0 166 124" fill="none">
            <path d={CLOUD_PATH} fill={colors.nimbus500} />
          </svg>
        )}
        <span
          style={{
            fontFamily: "Comfortaa",
            fontSize: "28px",
            fontWeight: 700,
            color: colors.cream,
            display: "flex",
          }}
        >
          {brand}
          <span style={{ color: colors.nimbus500 }}>.</span>
        </span>
      </div>

      {/* Center: Headline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "-20px" }}>
        <span
          style={{
            fontFamily: "Comfortaa",
            fontSize: `${titleSize}px`,
            fontWeight: 700,
            lineHeight: 1.2,
            color: colors.cream,
            display: "flex",
          }}
        >
          {title}
        </span>
        {titleAccent && (
          <span
            style={{
              fontFamily: "Comfortaa",
              fontSize: `${titleSize}px`,
              fontWeight: 700,
              lineHeight: 1.2,
              color: colors.nimbus500,
              display: "flex",
            }}
          >
            {titleAccent}
          </span>
        )}
        {description && (
          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.6,
              color: colors.muted,
              marginTop: "20px",
              maxWidth: "700px",
              display: "flex",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Bottom: pills + nimbuslab */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {pills.length > 0 && (
          <div style={{ display: "flex", gap: "12px" }}>
            {pills.map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: `1px solid rgba(255,85,0,0.2)`,
                  background: `rgba(255,85,0,0.05)`,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: colors.nimbus500,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}
        <span
          style={{
            fontSize: "16px",
            color: colors.subtle,
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          by nimbuslab
        </span>
      </div>
    </div>
  )
}
