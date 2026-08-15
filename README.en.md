<div align="center">

# Lumina

**Accessible React design system, built on Radix UI and Tailwind CSS v4.**
Optimized for Next.js App Router, React 19 and Server Components.

[Ler em português](./README.md)

[![npm version](https://img.shields.io/npm/v/@nimbuslab/lumina?color=FF5500&label=npm)](https://www.npmjs.com/package/@nimbuslab/lumina)
[![npm downloads](https://img.shields.io/npm/dw/@nimbuslab/lumina?color=FF5500)](https://www.npmjs.com/package/@nimbuslab/lumina)
[![license](https://img.shields.io/npm/l/@nimbuslab/lumina?color=FF5500)](./LICENSE)
[![CI](https://github.com/nimbuslab/lumina/actions/workflows/ci.yml/badge.svg)](https://github.com/nimbuslab/lumina/actions)

[Site](https://lumina.nimbuslab.com.br) · [Components](#components) · [Tokens](#design-tokens) · [Themes](#themes) · [Roadmap](#roadmap) · [Changelog](./CHANGELOG.md)

</div>

---

## Why Lumina

- **Accessible by default**: Radix UI primitives cover ARIA, focus and keyboard
- **Tailwind CSS v4 native**: `@theme` block, automatic `@source`, zero `tailwind.config.ts`
- **Refined semantic tokens**: `canvas`, `ink`, `surface`, `surface-elevated`, `hairline`, `tint` coexisting with shadcn tokens
- **Truly tree-shakeable**: per-file build (pure ESM), only loads what you import
- **Animation-library-agnostic**: moods ready for GSAP interpolation, no required dependency
- **Native OG images**: Open Graph templates for Next.js (`nimbus-og`, `changelog-card`)
- **Unified icons**: single wrapper over Lucide (bundled) and custom icons, with an opt-in extension point for Phosphor

## Installation

```bash
bun add @nimbuslab/lumina
```

### Peer dependencies

```bash
bun add react react-dom next tailwindcss
# optional, if you want to animate with GSAP
bun add gsap
```

| Peer | Version |
|---|---|
| `react` | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `next` | `>=15.0.0` |
| `tailwindcss` | `^4.0.0` |
| `gsap` *(optional)* | `>=3.12.0` |

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
      <Button>Click me</Button>
    </Card>
  )
}
```

Done. Light mode by default, dark mode by adding `class="dark"` to the `<html>` element.

## Components

52 component modules, most of them on Radix primitives. Each module also exports its own parts (`Card` ships `CardHeader`, `CardTitle`, `CardContent` and so on):

`Accordion` · `Alert` · `AlertDialog` · `Analytics` · `AspectRatio` · `Avatar` · `AvatarGroup` · `Badge` · `Breadcrumb` · `Button` · `Calendar` · `Card` · `Carousel` · `Chart` · `Checkbox` · `Collapsible` · `Combobox` · `Command` · `ContextMenu` · `DatePicker` · `Dialog` · `Drawer` · `DropdownMenu` · `ErrorPage` · `Form` · `HoverCard` · `Input` · `InputGroup` · `InputOTP` · `Label` · `Menubar` · `NavigationMenu` · `Pagination` · `Popover` · `Progress` · `RadioGroup` · `Resizable` · `ScrollArea` · `Select` · `Separator` · `Sheet` · `Sidebar` · `Skeleton` · `Slider` · `Sonner` · `Switch` · `Table` · `Tabs` · `Textarea` · `Toggle` · `ToggleGroup` · `Tooltip`

Plus utilities: `Icon` (Lucide and custom icons), `OG templates`, `Hooks`.

### Phosphor icons

The `Phosphor` namespace exists as an extension point and ships empty: `phosphor-react` is not a dependency of this package. To use it, install it yourself and import from the library:

```bash
bun add phosphor-react
```

## Design tokens

### shadcn-compatible (industry standard)

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

### Refined semantic aliases

```
--color-canvas             /* maps to background */
--color-ink                /* maps to foreground */
--color-ink-muted          /* maps to muted-foreground */
--color-surface            /* maps to card */
--color-surface-elevated   /* card with 6% white */
--color-surface-sunken     /* background with 4% black */
--color-hairline           /* border at 60% alpha */
--color-tint               /* maps to primary */
--color-tint-subtle        /* primary at 10% alpha */
```

### Brand

```
--color-nimbus-50 ... --color-nimbus-950
```

## Themes

- **Light**: default (no class)
- **Dark**: `class="dark"` on `<html>`
- **Moods**: `.mood-warm`, `.mood-light`, `.mood-intense`

Programmatic application (GSAP-compatible):

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

- [x] v0.2.0: first release on npm
- [x] v0.3.0: open source public release with MIT license
- [x] v0.4.0: official site at [lumina.nimbuslab.com.br](https://lumina.nimbuslab.com.br) with showcase, docs and Lumina dogfooding
- [ ] v0.5.0: additional themes and mood variants
- [ ] v1.0.0: stable API, breaking changes only on majors

## Compatibility

| Lumina | React | Next.js | Tailwind |
|---|---|---|---|
| `0.x` | `^19` | `>=15` | `^4` |

## Bundle

Per-file build (`bundle: false` in tsup), maximum tree-shaking. Import only what you use:

```tsx
// only the Button is loaded
import { Button } from "@nimbuslab/lumina/components/button"
```

Each component pulls in only its required Radix primitives.

## Contributing

Lumina is maintained by the nimbuslab team. External PRs are accepted by invitation. To report bugs or suggest features, contact `suporte@nimbuslab.com.br`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Stack

[Radix UI](https://www.radix-ui.com/) · [Tailwind CSS v4](https://tailwindcss.com/) · [TypeScript](https://www.typescriptlang.org/) · [tsup](https://tsup.egoist.dev/) · [Changesets](https://github.com/changesets/changesets) · [Bun](https://bun.sh/)

## License

[MIT](./LICENSE) © [nimbuslab](https://nimbuslab.com.br)

<div align="center">

Crafted in Brasília, DF, Brazil

</div>
