# @nimbuslab/lumina

Design system interno da nimbuslab.

Componentes React construídos sobre Radix UI e Tailwind CSS v4, com suporte nativo a Next.js App Router e React 19.

## Instalação

Requer token com acesso ao escopo privado `@nimbuslab` no npm.

```bash
bun add @nimbuslab/lumina
```

### Peer dependencies

```bash
bun add react react-dom next tailwindcss framer-motion
```

## Uso

### Estilos globais

Importar o CSS base no entry do app (layout root, `globals.css`, etc):

```css
@import "@nimbuslab/lumina/styles/globals.css";
```

### Componentes

```tsx
import { Button } from "@nimbuslab/lumina/components/button"
import { Card } from "@nimbuslab/lumina/components/card"

export function Example() {
  return (
    <Card>
      <Button>Clique aqui</Button>
    </Card>
  )
}
```

### Tokens

```ts
import { colors, typography, spacing } from "@nimbuslab/lumina/tokens"
```

### Hooks

```ts
import { useMobile } from "@nimbuslab/lumina/hooks/use-mobile"
```

### Icons

```tsx
import { Icon } from "@nimbuslab/lumina/components/icons"
```

### OG images (Next.js)

```tsx
import { NimbusOG } from "@nimbuslab/lumina/og/nimbus-og"
```

## Desenvolvimento

```bash
bun install
bun run build       # gera dist/
bun run dev         # watch mode
bun run typecheck
```

## Publicação

Versionamento via Changesets. Publish automatizado por workflow GitHub Actions no push para `main`.

```bash
bunx changeset       # registrar mudança
bunx changeset version  # bumpar versão + CHANGELOG
git push             # workflow publica no npm
```

## Licença

UNLICENSED — uso interno da nimbuslab.
