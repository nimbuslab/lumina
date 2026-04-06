import { type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "rounded-md border-transparent bg-primary text-primary-foreground px-2.5 py-0.5 text-xs hover:bg-primary/80",
        secondary:
          "rounded-md border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs hover:bg-secondary/80",
        destructive:
          "rounded-md border-transparent bg-destructive text-destructive-foreground px-2.5 py-0.5 text-xs hover:bg-destructive/80",
        outline:
          "rounded-md text-foreground px-2.5 py-0.5 text-xs",
        counter:
          "size-5 rounded-full border-transparent bg-primary text-primary-foreground text-[10px] font-bold leading-none p-0",
        "counter-sm":
          "size-4 rounded-full border-transparent bg-primary text-primary-foreground text-[9px] font-bold leading-none p-0",
        "counter-secondary":
          "size-5 rounded-full border-transparent bg-secondary text-secondary-foreground text-[10px] font-bold leading-none p-0",
        "counter-destructive":
          "size-5 rounded-full border-transparent bg-destructive text-destructive-foreground text-[10px] font-bold leading-none p-0",
        dot:
          "size-2 rounded-full border-transparent bg-primary p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
export type { BadgeProps }
