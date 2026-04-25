import { forwardRef } from "react"
import { cn } from "../../lib/utils"
import { iconSizes, type BaseIconProps, type IconType } from "./types"

/**
 * Wrapper universal para ícones
 * Compatível com Lucide, Phosphor e ícones customizados
 *
 * @example
 * ```tsx
 * // Com Lucide
 * import { Icon } from "@nimbuslab/lumina/components/icons"
 * import { Menu } from "lucide-react"
 * <Icon icon={Menu} size="md" />
 *
 * // Com ícone customizado
 * import { Icon, WhatsApp } from "@nimbuslab/lumina/components/icons"
 * <Icon icon={WhatsApp} size="md" />
 *
 * // Direto (sem wrapper)
 * import { WhatsApp } from "@nimbuslab/lumina/components/icons"
 * <WhatsApp size="md" />
 * ```
 */
export interface IconProps extends BaseIconProps {
  /**
   * Componente de ícone (Lucide, Phosphor ou customizado)
   */
  icon: IconType
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, size = "md", className, ...props }, ref) => {
    const sizeClass = iconSizes[size]

    return (
      <IconComponent
        ref={ref}
        className={cn(sizeClass, className)}
        {...props}
      />
    )
  }
)

Icon.displayName = "Icon"
