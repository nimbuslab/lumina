"use client"

import { Children, type ComponentProps, isValidElement } from "react"

import { cn } from "../lib/utils"

const SIZE_CLASSES = {
  xs: "size-5 text-[10px]",
  sm: "size-6 text-xs",
  md: "size-8 text-sm",
  lg: "size-10 text-base",
} as const

type AvatarGroupSize = keyof typeof SIZE_CLASSES

interface AvatarGroupProps extends ComponentProps<"div"> {
  max?: number
  size?: AvatarGroupSize
}

function AvatarGroup({
  children,
  max = 4,
  size = "sm",
  className,
  ...props
}: AvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement)
  const visible = items.slice(0, max)
  const overflow = items.length - max

  return (
    <div
      className={cn("flex items-center -space-x-2", className)}
      {...props}
    >
      {visible.map((child, i) => (
        <div
          key={i}
          className={cn(
            "relative shrink-0 rounded-full ring-2 ring-background",
            SIZE_CLASSES[size],
          )}
        >
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-2 ring-background",
            SIZE_CLASSES[size],
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}

export { AvatarGroup }
export type { AvatarGroupProps, AvatarGroupSize }
