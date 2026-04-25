# @nimbuslab/lumina

## 0.3.0

### Minor Changes

- afd01cd: Primeiro release público open source do Lumina.

  - Licença MIT (substituindo proprietária)
  - `publishConfig.access` alterado de `restricted` para `public`
  - Provenance habilitado (npm Trusted Publishing via OIDC)
  - README reescrito com posicionamento público (badges, hero, quick start, roadmap, compatibilidade)
  - CONTRIBUTING.md adicionado com guia para PRs externos
  - Metadata enriquecido: keywords técnicas, description otimizada para descobrabilidade, `engines`, `author`

## 0.2.0

### Minor Changes

- 283eff2: Primeira release standalone do design system Lumina extraído do monorepo nimbuslab.

  - Build compilado via tsup (ESM + DTS + sourcemaps, bundle por arquivo para tree-shaking)
  - Exports apontando para `dist/` com conditional exports (types + import)
  - Publicação privada no npm via Changesets (`@nimbuslab/lumina`)
  - Removida dependência órfã framer-motion (Lumina é animation-library-agnostic)
  - GSAP como peer dependency opcional (`>=3.12.0`)
  - Aliases Apple-friendly adicionados em `styles/globals.css` (canvas, ink, surface, surface-elevated, surface-sunken, ink-muted, hairline, tint, tint-subtle) coexistindo com tokens shadcn padrão
