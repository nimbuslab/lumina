---
"@nimbuslab/lumina": minor
---

HoverCard: o conteúdo passa a renderizar em portal, então deixa de ser cortado por ancestrais com overflow hidden, e aceita a prop container. O módulo ./lib/portal-context entra no mapa de exports, tornando o PortalContainerProvider finalmente acessível para definir o container dos overlays.
