import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-mono font-normal ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/25",
        outline:
          "border border-input bg-background hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        magnetic: "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01]",
        ripple: "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20",
        liquid: "border border-primary/30 bg-transparent text-primary hover:border-primary hover:bg-primary/5",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-4",
        icon: "h-10 w-10",
        "icon-sm": "size-7",
        "icon-md": "size-9",
      },
      // Eixo de tom, ortogonal ao variant. `default` não altera nada (preserva
      // os variants sólidos existentes); os demais tingem icon buttons ghost de
      // forma consistente — neutro por padrão, primary só em toggle ativo,
      // destructive revelando o vermelho apenas no hover.
      tone: {
        default: "",
        neutral: "text-muted-foreground hover:bg-muted hover:text-foreground",
        primary: "text-primary hover:bg-primary/10 hover:text-primary",
        destructive: "text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      tone: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({ className, variant, size, tone, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, tone, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
