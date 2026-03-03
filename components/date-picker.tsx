"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, X } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface DatePickerProps {
  value?: Date | string
  onChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  fromDate?: Date
  toDate?: Date
  className?: string
  align?: "start" | "center" | "end"
  formatStr?: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseDate(value: Date | string | undefined): Date | undefined {
  if (!value) return undefined
  if (value instanceof Date) return value
  // ISO string ou YYYY-MM-DD
  const d = new Date(value)
  return isNaN(d.getTime()) ? undefined : d
}

// ── DatePicker ───────────────────────────────────────────────────────────────

function DatePicker({
  value,
  onChange,
  placeholder = "Selecionar data...",
  disabled = false,
  clearable = true,
  fromDate,
  toDate,
  className,
  align = "start",
  formatStr = "dd/MM/yyyy",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const date = parseDate(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "h-9 w-full justify-start gap-2 px-2 font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="size-4 shrink-0 opacity-50" />
          <span className="truncate">
            {date ? format(date, formatStr, { locale: ptBR }) : placeholder}
          </span>
          {clearable && date && (
            <X
              className="ml-auto size-3.5 shrink-0 opacity-50 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                onChange(undefined)
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[80] w-auto p-0" align={align}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onChange(d)
            setOpen(false)
          }}
          defaultMonth={date}
          fromDate={fromDate}
          toDate={toDate}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
