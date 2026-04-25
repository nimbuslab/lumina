import { cn } from "../lib/utils"

interface ErrorPageProps {
  icon: React.ReactNode
  iconVariant?: "muted" | "destructive"
  iconSize?: "default" | "large"
  title: string
  description: string
  action?: React.ReactNode
  digest?: string
  footnote?: string
  className?: string
}

function ErrorPage({
  icon,
  iconVariant = "muted",
  iconSize = "default",
  title,
  description,
  action,
  digest,
  footnote,
  className,
}: ErrorPageProps) {
  const isLarge = iconSize === "large"
  const Heading = isLarge ? "h1" : "h2"

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 px-4 text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          isLarge ? "size-20" : "size-16",
          iconVariant === "destructive" ? "bg-destructive/10" : "bg-muted"
        )}
      >
        {icon}
      </div>

      <div className={isLarge ? "space-y-3" : "space-y-2"}>
        <Heading
          className={cn(
            "font-bold tracking-tight",
            isLarge ? "text-2xl" : "text-xl"
          )}
        >
          {title}
        </Heading>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
        {digest && (
          <p className="text-xs text-muted-foreground/60">Código: {digest}</p>
        )}
      </div>

      {action}

      {footnote && (
        <p className="text-xs text-muted-foreground/60">{footnote}</p>
      )}
    </div>
  )
}

export { ErrorPage }
export type { ErrorPageProps }
