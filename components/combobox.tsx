"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface ComboboxOption {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  clearable?: boolean
  className?: string
  align?: "start" | "center" | "end"
  renderOption?: (option: ComboboxOption) => React.ReactNode
}

// ── Combobox ─────────────────────────────────────────────────────────────────

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Selecionar...",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum resultado.",
  disabled = false,
  clearable = false,
  className,
  align = "start",
  renderOption,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "h-9 w-full justify-between px-2 font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <span className="truncate">
            {selected ? (
              <span className="flex items-center gap-2">
                {selected.icon && <selected.icon className="size-4 shrink-0" />}
                {selected.label}
              </span>
            ) : (
              placeholder
            )}
          </span>
          <span className="flex shrink-0 items-center">
            {clearable && value ? (
              <X
                className="size-3.5 opacity-50 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  onValueChange("")
                  setOpen(false)
                }}
              />
            ) : (
              <ChevronsUpDown className="size-4 opacity-50" />
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[--radix-popover-trigger-width] p-0" align={align}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList onWheel={(e) => e.stopPropagation()}>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => {
                    onValueChange(option.value === value ? "" : option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4 shrink-0",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {renderOption ? (
                    renderOption(option)
                  ) : (
                    <span className="flex items-center gap-2">
                      {option.icon && <option.icon className="size-4 shrink-0" />}
                      {option.label}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox }
