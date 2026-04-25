/**
 * Sistema de Ícones Lumina
 *
 * Suporta múltiplas bibliotecas de ícones de forma modular:
 * - Lucide (padrão) - Ícones modernos e limpos
 * - Phosphor (opcional) - Alternativa com estilo diferente
 * - Custom (SVG próprios) - Quando nenhuma lib tem o ícone
 *
 * @example
 * ```tsx
 * // Ícones Lucide (padrão)
 * import { Menu, User } from "@nimbuslab/lumina/components/icons/lucide"
 * <Menu className="h-6 w-6" />
 *
 * // Ícones customizados
 * import { WhatsApp } from "@nimbuslab/lumina/components/icons/custom"
 * <WhatsApp size="md" />
 *
 * // Wrapper universal
 * import { Icon } from "@nimbuslab/lumina/components/icons"
 * import { Menu } from "lucide-react"
 * <Icon icon={Menu} size="lg" />
 * ```
 */

// Componente wrapper universal
export { Icon } from "./icon"
export type { IconProps } from "./icon"

// Types e utilities
export type {
  IconSize,
  BaseIconProps,
  IconType,
  LucideIconType,
  CustomIconType,
} from "./types"
export { iconSizes } from "./types"

// Ícones customizados (export direto para conveniência)
export * from "./custom"

// Re-exports organizados por biblioteca
// Usuários podem importar de sub-paths para tree-shaking
export * as Lucide from "./lucide"
export * as Phosphor from "./phosphor"
export * as Custom from "./custom"
