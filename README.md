<div align="center">

# Lumina

**Design system React acessível, sobre Radix UI e Tailwind CSS v4.**
Otimizado para Next.js App Router, React 19 e Server Components.

[Read in English](./README.en.md)

[![npm version](https://img.shields.io/npm/v/@nimbuslab/lumina?color=FF5500&label=npm)](https://www.npmjs.com/package/@nimbuslab/lumina)
[![npm downloads](https://img.shields.io/npm/dw/@nimbuslab/lumina?color=FF5500)](https://www.npmjs.com/package/@nimbuslab/lumina)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@nimbuslab/lumina?color=FF5500&label=bundle)](https://bundlephobia.com/package/@nimbuslab/lumina)
[![license](https://img.shields.io/npm/l/@nimbuslab/lumina?color=FF5500)](./LICENSE)
[![CI](https://github.com/nimbuslab/lumina/actions/workflows/ci.yml/badge.svg)](https://github.com/nimbuslab/lumina/actions)

[Componentes](#componentes) · [Tokens](#tokens-de-design) · [Temas](#temas) · [Roadmap](#roadmap)

</div>

---

## Por que Lumina

- **Acessível por padrão**: primitivos Radix UI cobrem ARIA, foco e teclado
- **Tailwind CSS v4 nativo**: `@theme` block, `@source` automático, zero `tailwind.config.ts`
- **Tokens semânticos elegantes**: `canvas`, `ink`, `surface`, `surface-elevated`, `hairline`, `tint` coexistindo com tokens shadcn
- **Tree-shakeable de verdade**: build por arquivo (ESM puro), só carrega o que você importa
- **Animation-library-agnostic**: moods prontos para interpolação com GSAP, sem dependência obrigatória
- **OG images nativos**: templates Open Graph para Next.js (`nimbus-og`, `changelog-card`)
- **Icons unificados**: wrapper único para Lucide, Phosphor e ícones custom

## Instalação

```bash
bun add @nimbuslab/lumina
```

### Peer dependencies

```bash
bun add react react-dom next tailwindcss
# opcional, se for animar com GSAP
bun add gsap
```

| Peer | Versão |
|---|---|
| `react` | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `next` | `>=15.0.0` |
| `tailwindcss` | `^4.0.0` |
| `gsap` *(opcional)* | `>=3.12.0` |

## Quick start

```css
/* app/globals.css */
@import "@nimbuslab/lumina/styles/globals.css";
```

```tsx
// app/page.tsx
import { Button } from "@nimbuslab/lumina/components/button"
import { Card } from "@nimbuslab/lumina/components/card"

export default function Page() {
  return (
    <Card>
      <Button>Clique aqui</Button>
    </Card>
  )
}
```

Pronto. Light mode por padrão, dark mode com `class="dark"` no `<html>`.

## Componentes

70+ componentes baseados em primitivos Radix:

`Accordion` · `Alert` · `AlertDialog` · `AspectRatio` · `Avatar` · `AvatarGroup` · `Badge` · `Breadcrumb` · `Button` · `Calendar` · `Card` · `Carousel` · `Chart` · `Checkbox` · `Collapsible` · `Combobox` · `Command` · `ContextMenu` · `DatePicker` · `Dialog` · `Drawer` · `DropdownMenu` · `Form` · `HoverCard` · `Input` · `InputOTP` · `Label` · `Menubar` · `NavigationMenu` · `Pagination` · `Popover` · `Progress` · `RadioGroup` · `Resizable` · `ScrollArea` · `Select` · `Separator` · `Sheet` · `Sidebar` · `Skeleton` · `Slider` · `Sonner` · `Switch` · `Table` · `Tabs` · `Textarea` · `Toggle` · `ToggleGroup` · `Tooltip`

E utilitários: `Icon` (Lucide, Phosphor e custom), `OG templates`, `Hooks`.

## Tokens de design

### Compatíveis com shadcn (padrão de mercado)

```
--background  --foreground
--card        --card-foreground
--popover     --popover-foreground
--primary     --primary-foreground
--secondary   --secondary-foreground
--muted       --muted-foreground
--accent      --accent-foreground
--destructive --destructive-foreground
--border  --input  --ring  --radius
--sidebar-*   --chart-1..5
```

### Aliases semânticos elegantes

```
--color-canvas             /* equivale a background */
--color-ink                /* equivale a foreground */
--color-ink-muted          /* equivale a muted-foreground */
--color-surface            /* equivale a card */
--color-surface-elevated   /* card com 6% de white */
--color-surface-sunken     /* background com 4% de black */
--color-hairline           /* border com 60% de alpha */
--color-tint               /* equivale a primary */
--color-tint-subtle        /* primary com 10% de alpha */
```

### Brand

```
--color-nimbus-50 ... --color-nimbus-950
```

## Temas

- **Light**: padrão (sem classe)
- **Dark**: `class="dark"` no `<html>`
- **Moods**: `.mood-warm`, `.mood-light`, `.mood-intense`

Aplicação programática (compatível com GSAP):

```ts
import gsap from "gsap"
import { buildMoodProxy, applyMoodToElement } from "@nimbuslab/lumina/tokens/moods"

const proxy = buildMoodProxy("dark")
const target = buildMoodProxy("warm")

gsap.to(proxy, {
  ...target,
  duration: 0.6,
  onUpdate: () => applyMoodToElement(proxy, document.documentElement),
})
```

## Roadmap

- [x] v0.2.0: primeira release no npm
- [x] v0.3.0: release público open source com licença MIT
- [ ] v0.4.0: site oficial em `lumina.nimbuslab.com.br` com showcase, docs e dogfooding do próprio Lumina
- [ ] v0.5.0: temas adicionais e variantes de mood
- [ ] v1.0.0: API estável, breaking changes só em majors

## Compatibilidade

| Lumina | React | Next.js | Tailwind |
|---|---|---|---|
| `0.x` | `^19` | `>=15` | `^4` |

## Bundle

Build por arquivo (`bundle: false` no tsup), tree-shaking máximo. Importe só o que usa:

```tsx
// pega só o Button
import { Button } from "@nimbuslab/lumina/components/button"
```

Cada componente carrega só seus primitivos Radix necessários.

## Contribuindo

Lumina é mantido pela equipe da nimbuslab. PRs externos são aceitos por convite. Para reportar bugs ou sugerir features, contate `suporte@nimbuslab.com.br`.

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

## Stack

[Radix UI](https://www.radix-ui.com/) · [Tailwind CSS v4](https://tailwindcss.com/) · [TypeScript](https://www.typescriptlang.org/) · [tsup](https://tsup.egoist.dev/) · [Changesets](https://github.com/changesets/changesets) · [Bun](https://bun.sh/)

## Licença

[MIT](./LICENSE) © [nimbuslab](https://nimbuslab.com.br)

<div align="center">

Construído em Brasília, DF, Brasil

</div>
