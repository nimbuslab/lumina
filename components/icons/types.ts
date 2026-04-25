import type { LucideIcon } from "lucide-react"
import type { SVGProps } from "react"

/**
 * Tamanhos padronizados de ícones
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl"

/**
 * Mapa de tamanhos para classes Tailwind
 */
export const iconSizes: Record<IconSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
}

/**
 * Props base para qualquer ícone
 */
export interface BaseIconProps extends Omit<SVGProps<SVGSVGElement>, "size"> {
  size?: IconSize
  className?: string
}

/**
 * Tipo para ícones do Lucide
 */
export type LucideIconType = LucideIcon

/**
 * Tipo para ícones customizados (SVG)
 */
export type CustomIconType = React.FC<BaseIconProps>

/**
 * Tipo união para qualquer ícone suportado
 */
export type IconType = LucideIconType | CustomIconType
