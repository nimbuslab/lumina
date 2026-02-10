// ─── Types ───────────────────────────────────────────────────

export interface HslValues {
  h: number
  s: number
  l: number
}

export interface MoodColorSet {
  background: HslValues
  foreground: HslValues
  card: HslValues
  cardForeground: HslValues
  popover: HslValues
  popoverForeground: HslValues
  secondary: HslValues
  secondaryForeground: HslValues
  muted: HslValues
  mutedForeground: HslValues
  border: HslValues
  input: HslValues
  ring: HslValues
}

export type MoodName = "dark" | "warm" | "light" | "intense"

export type MoodMap = Record<MoodName, MoodColorSet>

export type MoodProxy = Record<string, number>

// ─── CSS var mapping ─────────────────────────────────────────

export const MOOD_CSS_VARS: Record<keyof MoodColorSet, string> = {
  background: "background",
  foreground: "foreground",
  card: "card",
  cardForeground: "card-foreground",
  popover: "popover",
  popoverForeground: "popover-foreground",
  secondary: "secondary",
  secondaryForeground: "secondary-foreground",
  muted: "muted",
  mutedForeground: "muted-foreground",
  border: "border",
  input: "input",
  ring: "ring",
} as const

const MOOD_KEYS = Object.keys(MOOD_CSS_VARS) as (keyof MoodColorSet)[]

// ─── Mood definitions ────────────────────────────────────────

export const moods: MoodMap = {
  dark: {
    background:          { h: 20, s: 8,  l: 8  },
    foreground:          { h: 30, s: 10, l: 92 },
    card:                { h: 20, s: 8,  l: 10 },
    cardForeground:      { h: 30, s: 10, l: 92 },
    popover:             { h: 20, s: 8,  l: 10 },
    popoverForeground:   { h: 30, s: 10, l: 92 },
    secondary:           { h: 20, s: 6,  l: 16 },
    secondaryForeground: { h: 30, s: 10, l: 92 },
    muted:               { h: 20, s: 6,  l: 14 },
    mutedForeground:     { h: 20, s: 5,  l: 55 },
    border:              { h: 20, s: 6,  l: 18 },
    input:               { h: 20, s: 6,  l: 18 },
    ring:                { h: 20, s: 100, l: 50 },
  },
  warm: {
    background:          { h: 25, s: 12, l: 14 },
    foreground:          { h: 30, s: 10, l: 90 },
    card:                { h: 25, s: 10, l: 17 },
    cardForeground:      { h: 30, s: 10, l: 90 },
    popover:             { h: 25, s: 10, l: 17 },
    popoverForeground:   { h: 30, s: 10, l: 90 },
    secondary:           { h: 25, s: 10, l: 22 },
    secondaryForeground: { h: 30, s: 10, l: 90 },
    muted:               { h: 25, s: 8,  l: 20 },
    mutedForeground:     { h: 25, s: 8,  l: 58 },
    border:              { h: 25, s: 10, l: 24 },
    input:               { h: 25, s: 10, l: 24 },
    ring:                { h: 20, s: 100, l: 50 },
  },
  light: {
    background:          { h: 30, s: 20, l: 94 },
    foreground:          { h: 20, s: 10, l: 15 },
    card:                { h: 30, s: 18, l: 97 },
    cardForeground:      { h: 20, s: 10, l: 15 },
    popover:             { h: 30, s: 18, l: 97 },
    popoverForeground:   { h: 20, s: 10, l: 15 },
    secondary:           { h: 30, s: 15, l: 88 },
    secondaryForeground: { h: 20, s: 10, l: 15 },
    muted:               { h: 30, s: 12, l: 90 },
    mutedForeground:     { h: 20, s: 8,  l: 45 },
    border:              { h: 30, s: 12, l: 82 },
    input:               { h: 30, s: 12, l: 82 },
    ring:                { h: 20, s: 100, l: 50 },
  },
  intense: {
    background:          { h: 15, s: 10, l: 6  },
    foreground:          { h: 20, s: 100, l: 60 },
    card:                { h: 15, s: 10, l: 8  },
    cardForeground:      { h: 20, s: 100, l: 60 },
    popover:             { h: 15, s: 10, l: 8  },
    popoverForeground:   { h: 20, s: 100, l: 60 },
    secondary:           { h: 15, s: 8,  l: 14 },
    secondaryForeground: { h: 20, s: 100, l: 60 },
    muted:               { h: 15, s: 8,  l: 12 },
    mutedForeground:     { h: 15, s: 20, l: 40 },
    border:              { h: 15, s: 8,  l: 16 },
    input:               { h: 15, s: 8,  l: 16 },
    ring:                { h: 20, s: 100, l: 50 },
  },
}

// ─── Helpers ─────────────────────────────────────────────────

/** Build a flat numeric proxy from a mood (for GSAP interpolation) */
export function buildMoodProxy(moodName: MoodName): MoodProxy {
  const colorSet = moods[moodName]
  const proxy: MoodProxy = {}
  for (const key of MOOD_KEYS) {
    const hsl = colorSet[key]
    proxy[`${key}_h`] = hsl.h
    proxy[`${key}_s`] = hsl.s
    proxy[`${key}_l`] = hsl.l
  }
  return proxy
}

/** Build target values for gsap.to() from a mood name */
export function buildMoodTarget(moodName: MoodName): MoodProxy {
  return buildMoodProxy(moodName)
}

/** Write current proxy values as CSS custom properties on an element */
export function applyMoodToElement(proxy: MoodProxy, element: HTMLElement) {
  for (const key of MOOD_KEYS) {
    const cssVar = MOOD_CSS_VARS[key]
    const h = proxy[`${key}_h`]
    const s = proxy[`${key}_s`]
    const l = proxy[`${key}_l`]
    element.style.setProperty(`--${cssVar}`, `${h} ${s}% ${l}%`)
  }
}

/** Remove all mood CSS custom properties from an element */
export function clearMoodFromElement(element: HTMLElement) {
  for (const key of MOOD_KEYS) {
    element.style.removeProperty(`--${MOOD_CSS_VARS[key]}`)
  }
}
