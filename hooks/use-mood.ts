"use client"

import { createContext, useContext } from "react"
import type { MoodName } from "../tokens/moods"

export interface MoodContextValue {
  /** Current dominant mood based on scroll position or static setting */
  currentMood: MoodName
  /** Whether the current mood uses a light background */
  isLight: boolean
}

export const MoodContext = createContext<MoodContextValue>({
  currentMood: "dark",
  isLight: false,
})

export function useMood() {
  return useContext(MoodContext)
}
