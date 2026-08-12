"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group !z-[100]"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          // Tipos semânticos sobre o toast neutro base (substitui o richColors,
          // que injetava paleta crua e ignorava os tokens do DS). Só ícone +
          // borda ganham cor; título/descrição seguem no texto neutro. success/
          // error usam os tokens da marca (--primary laranja / --destructive); o
          // DS não expõe --warning/--info, então amber/sky convencionais.
          success:
            "group-[.toaster]:border-primary/40 group-[.toaster]:[&>[data-icon]]:text-primary",
          error:
            "group-[.toaster]:border-destructive/40 group-[.toaster]:[&>[data-icon]]:text-destructive",
          warning:
            "group-[.toaster]:border-amber-500/40 group-[.toaster]:[&>[data-icon]]:text-amber-500",
          info:
            "group-[.toaster]:border-sky-500/40 group-[.toaster]:[&>[data-icon]]:text-sky-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
