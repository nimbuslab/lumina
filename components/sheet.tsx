"use client"

import { type ComponentProps, useCallback, useEffect, useRef, useState } from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { PortalContainerProvider } from "../lib/portal-context"
import { cn } from "../lib/utils"

// Wrapper que previne o gesto nativo de "voltar" no mobile quando o Sheet está aberto.
// Empurra uma entrada fake no history; se o user apertar back/swipar, fecha o Sheet.
function Sheet({ open, onOpenChange, ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  const onOpenChangeRef = useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  useEffect(() => {
    if (!open) return

    let closedByBack = false
    history.pushState({ sheet: true }, "")

    const onPopState = () => {
      closedByBack = true
      onOpenChangeRef.current?.(false)
    }

    window.addEventListener("popstate", onPopState)

    return () => {
      window.removeEventListener("popstate", onPopState)
      // Se fechou via botão/overlay/swipe (não pelo back), remove a entrada fake.
      // Só chama back() se ainda estiver na entrada fake (evita conflito com Link navigation)
      if (!closedByBack && history.state?.sheet) history.back()
    }
  }, [open])

  return <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} {...props} />
}

const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

function SheetOverlay({
  className,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay> & {
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      ref={ref}
      {...props}
    />
  )
}

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b p-6 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t p-6 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-full border-r p-6 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-full border-l p-6 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-xl",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

function SheetContent({
  side = "right",
  className,
  children,
  ref: externalRef,
  onOpenAutoFocus,
  ...props
}: SheetContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  const internalRef = useRef<HTMLDivElement>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  // Resolve ref
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      setContainer(node)
      if (typeof externalRef === "function") externalRef(node)
      else if (externalRef) (externalRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    },
    [externalRef],
  )

  // Swipe-to-close: detecta swipe na direção do side
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      const dy = e.changedTouches[0].clientY - touchStartY.current
      const absDx = dx < 0 ? -dx : dx
      const absDy = dy < 0 ? -dy : dy

      // Só fecha se o swipe horizontal for dominante e > 80px
      if (absDx < 80 || absDy > absDx) return

      const shouldClose =
        (side === "right" && dx > 0) ||
        (side === "left" && dx < 0)

      if (shouldClose) {
        // Encontrar o close button e clicar (respeita o onOpenChange do Radix)
        internalRef.current?.querySelector<HTMLButtonElement>("[data-sheet-close]")?.click()
      }
    },
    [side],
  )

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={setRef}
        className={cn(sheetVariants({ side }), className)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onOpenAutoFocus={(e) => {
          // Previne auto-focus no primeiro input (melhor UX mobile)
          if (onOpenAutoFocus) return onOpenAutoFocus(e)
        }}
        {...props}
      >
        <DialogPrimitive.Close
          data-sheet-close
          className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <PortalContainerProvider value={container}>
          {children}
        </PortalContainerProvider>
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title> & {
  ref?: React.Ref<HTMLHeadingElement>
}) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description> & {
  ref?: React.Ref<HTMLParagraphElement>
}) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
