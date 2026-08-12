# Sistema de Ícones Lumina

Sistema modular de ícones compatível com múltiplas bibliotecas.

## Filosofia

1. **Modular**: Suporte a múltiplas libs (Lucide, Phosphor, Custom)
2. **Consistente**: API unificada com props padronizadas
3. **Flexível**: Use direto ou via wrapper
4. **Type-safe**: TypeScript completo
5. **Tree-shakeable**: Importe apenas o que usar

## Bibliotecas suportadas

### Lucide (Padrão)
- Instalado por padrão
- Estilo: Moderno, limpo, outline
- 1000+ ícones
- [Documentação](https://lucide.dev)

### Phosphor (Opcional)
- Requer instalação: `bun add phosphor-react`
- Estilo: Versátil (thin, light, regular, bold, fill, duotone)
- 6000+ ícones
- [Documentação](https://phosphoricons.com)

### Custom (SVG Próprios)
- Sempre disponível
- Para logos e ícones específicos
- Exemplos: WhatsApp, logos personalizados

## Uso

### 1. Ícones Lucide (recomendado)

```tsx
import { Menu, User, MessageCircle } from "@nimbuslab/lumina/components/icons/lucide"

// Uso direto
<Menu className="h-6 w-6" />
<User className="h-5 w-5 text-primary" />
```

### 2. Ícones customizados

```tsx
import { WhatsApp } from "@nimbuslab/lumina/components/icons/custom"

// Com size helper
<WhatsApp size="md" />
<WhatsApp size="lg" className="text-green-500" />

// Manual
<WhatsApp className="h-6 w-6" />
```

### 3. Wrapper universal

```tsx
import { Icon } from "@nimbuslab/lumina/components/icons"
import { Menu } from "lucide-react"
import { WhatsApp } from "@nimbuslab/lumina/components/icons/custom"

// Com Lucide
<Icon icon={Menu} size="lg" />

// Com Custom
<Icon icon={WhatsApp} size="md" />
```

### 4. Com Phosphor (opcional)

```tsx
// 1. Instalar primeiro: bun add phosphor-react
// 2. Adicionar exports em phosphor/index.ts
// 3. Usar:

import { House } from "@nimbuslab/lumina/components/icons/phosphor"
<House className="h-6 w-6" weight="bold" />
```

## Tamanhos

Tamanhos padronizados disponíveis via prop `size`:

| Size | Classes | Pixels |
|------|---------|--------|
| `xs` | `h-3 w-3` | 12px |
| `sm` | `h-4 w-4` | 16px |
| `md` | `h-5 w-5` | 20px (padrão) |
| `lg` | `h-6 w-6` | 24px |
| `xl` | `h-8 w-8` | 32px |

```tsx
<WhatsApp size="xs" />
<WhatsApp size="sm" />
<WhatsApp size="md" /> {/* padrão */}
<WhatsApp size="lg" />
<WhatsApp size="xl" />
```

## Customização

### Override de classes

```tsx
<WhatsApp size="md" className="text-green-600 hover:text-green-700" />
```

### Animações

```tsx
<Menu className="h-6 w-6 transition-transform hover:rotate-90" />
<WhatsApp size="md" className="hover:scale-110 transition-transform" />
```

## Adicionar novos ícones

### Ícone customizado (SVG)

1. Criar arquivo em `custom/`:

```tsx
// custom/telegram.tsx
import { forwardRef } from "react"
import { cn } from "../../../lib/utils"
import { iconSizes, type BaseIconProps } from "../types"

export const Telegram = forwardRef<SVGSVGElement, BaseIconProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeClass = iconSizes[size]

    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn(sizeClass, className)}
        {...props}
      >
        <path d="..." />
      </svg>
    )
  }
)

Telegram.displayName = "Telegram"
```

2. Exportar em `custom/index.ts`:

```tsx
export { Telegram } from "./telegram"
```

### Adicionar do Lucide

Editar `lucide/index.ts` e adicionar o export:

```tsx
export { NovoIcone } from "lucide-react"
```

### Adicionar do Phosphor

1. Instalar: `bun add phosphor-react`
2. Editar `phosphor/index.ts`:

```tsx
export { House, MagnifyingGlass } from "phosphor-react"
```

## Quando usar cada biblioteca

### Use Lucide quando:
- Ícones de UI comum (menu, user, settings)
- Ícones de navegação
- Ícones de ações (edit, delete, share)
- Na maioria dos casos (padrão)

### Use Phosphor quando:
- Precisa de variações de peso (thin, light, bold)
- Precisa de estilo duotone
- Lucide não tem o ícone específico

### Use Custom quando:
- Logos de marcas (WhatsApp, Telegram)
- Ícones proprietários da nimbuslab
- Nenhuma biblioteca tem o ícone

## Estrutura

```
icons/
├── index.ts              # Exports públicos
├── icon.tsx              # Wrapper universal
├── types.ts              # Types compartilhados
├── README.md             # Esta documentação
├── lucide/               # Re-exports Lucide
│   └── index.ts
├── phosphor/             # Re-exports Phosphor
│   └── index.ts
└── custom/               # SVGs customizados
    ├── index.ts
    ├── whatsapp.tsx
    └── ...
```

## Exemplos reais

### Header com ícones

```tsx
import { Menu, User } from "@nimbuslab/lumina/components/icons/lucide"
import { WhatsApp } from "@nimbuslab/lumina/components/icons/custom"

function Header() {
  return (
    <header>
      <Menu className="h-6 w-6" />
      <User className="h-5 w-5" />
      <WhatsApp size="md" className="text-green-600" />
    </header>
  )
}
```

### Botão com ícone

```tsx
import { Button } from "@nimbuslab/lumina/components/button"
import { WhatsApp } from "@nimbuslab/lumina/components/icons"

<Button>
  <WhatsApp size="sm" />
  Falar no WhatsApp
</Button>
```

### Lista de social icons

```tsx
import { Github, Linkedin, Dribbble } from "@nimbuslab/lumina/components/icons/lucide"

const socials = [
  { icon: Github, href: "..." },
  { icon: Linkedin, href: "..." },
  { icon: Dribbble, href: "..." },
]

{socials.map(({ icon: Icon, href }) => (
  <a href={href}>
    <Icon className="h-5 w-5" />
  </a>
))}
```

---

Consulte a documentação das bibliotecas:
- [Lucide](https://lucide.dev)
- [Phosphor](https://phosphoricons.com)
