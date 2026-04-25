/**
 * Carrega fontes do Google Fonts como TTF (ArrayBuffer) para uso com Satori/next-og.
 *
 * Satori nao suporta WOFF2, por isso usamos User-Agent antigo para receber TTF.
 */

const UA_TTF =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"

async function fetchFont(family: string, weight: FontWeight): Promise<ArrayBuffer> {
  const api = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`
  const css = await fetch(api, {
    headers: { "User-Agent": UA_TTF },
  }).then((r) => r.text())

  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?truetype['"]?\)/)
  const url = match?.[1]
  if (!url) throw new Error(`Fonte nao encontrada: ${family} ${weight}`)

  return fetch(url).then((r) => r.arrayBuffer())
}

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export interface OGFont {
  name: string
  data: ArrayBuffer
  style: "normal"
  weight: FontWeight
}

/**
 * Carrega as fontes padrao da nimbuslab para OG images.
 *
 * Retorna array pronto para passar ao ImageResponse.
 *
 * @example
 * ```ts
 * import { loadOGFonts } from "@nimbuslab/lumina/og/load-font"
 *
 * const fonts = await loadOGFonts()
 * return new ImageResponse(<Component />, { ...size, fonts })
 * ```
 */
export async function loadOGFonts(): Promise<OGFont[]> {
  const [interSemiBold, comfortaaBold] = await Promise.all([
    fetchFont("Inter", 600),
    fetchFont("Comfortaa", 700),
  ])

  return [
    { name: "Inter", data: interSemiBold, style: "normal" as const, weight: 600 },
    { name: "Comfortaa", data: comfortaaBold, style: "normal" as const, weight: 700 },
  ]
}
