# @nimbuslab/lumina

## 0.4.0

### Minor Changes

- a900853: Toaster: os tipos success, error, warning e info ganham estilo próprio sobre o toast neutro, usando os tokens do design system em vez do richColors do sonner.
- a900853: HoverCard: o conteúdo passa a renderizar em portal, então deixa de ser cortado por ancestrais com overflow hidden, e aceita a prop container. O módulo ./lib/portal-context entra no mapa de exports, tornando o PortalContainerProvider finalmente acessível para definir o container dos overlays.
- a900853: Button: novo eixo tone (default, neutral, primary, destructive) e os tamanhos icon-sm e icon-md. Mudança aditiva: o padrão tone default não altera nenhum estilo existente.
- a900853: SidebarProvider: nova prop keyboardShortcut para escolher a tecla do atalho ou passar false e desligá-lo. SIDEBAR_COOKIE_NAME passa a ser exportado, e SidebarMenuSubItem ganha min-w-0 para que rótulos longos sejam cortados em vez de estourar a largura.

### Patch Changes

- a900853: Corrige o CSS publicado: globals.css importava tw-animate-css por um caminho relativo de node_modules que não existe dentro do pacote, quebrando o import de @nimbuslab/lumina/styles/globals.css em qualquer projeto. A cópia dos estilos no build também passa a ser idempotente, evitando publicar sem o arquivo no caminho declarado em exports.
- a900853: Corrige a sintaxe de variável CSS dos utilitários para o Tailwind v4 em calendar, chart, combobox, context-menu, hover-card, menubar, popover, select e sidebar. Esses utilitários não geravam CSS nenhum, então voltam a valer o tamanho de célula do calendário, a largura do popover do combobox, a origem das animações dos overlays, a cor do indicador do gráfico e a largura do esqueleto do menu lateral.
- a900853: Dialog passa a limitar a largura em 90vw no mobile, aplicando max-w-lg só a partir do breakpoint sm, e o lado right do Sheet ganha o espaçamento interno que faltava.

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
