# blocks/auth

Bloco de login do Lumina. Usa só os tokens semânticos do Lumina (nenhuma cor fixa, exceto o G oficial do Google),
então segue o tema do app, claro ou escuro, e muda junto quando os tokens mudarem. Não conhece Better Auth nem rede:
recebe props e dispara callbacks. Uso:

```tsx
import { AuthBlock, useResendCountdown } from "@nimbuslab/lumina/blocks/auth"
```

Telas (`step`): `entrar`, `codigo`, `recusa`, `consentimento`. O `visual` do painel é um slot opcional (ReactNode):
a imagem não vem no pacote. Ele sangra até as bordas do painel e imagens recebem `object-fit: cover`
(use `object-position` na própria imagem para escolher o recorte). No celular vira uma faixa de 120 px.

## O que o app precisa carregar

O bloco usa as classes `font-sans`, `font-title` e `font-mono` e os tokens de `styles/globals.css`. O app precisa:

1. Importar `@nimbuslab/lumina/styles/globals.css` e incluir `blocks` nos `@source` do Tailwind do app
   (`@source "../node_modules/@nimbuslab/lumina/blocks"` ou o caminho equivalente no monorepo).
2. Carregar as três famílias:
   - **Inter** (corpo e rótulos);
   - **Comfortaa como fonte VARIÁVEL**, de 300 a 700, para o título sair em 700;
   - **JetBrains Mono** variável (botões e kicker usam SemiBold 600).
3. No `next/font/google`, **não passe `weight` na Comfortaa** (`Comfortaa({ subsets: ["latin"], variable: "--font-title" })`).
   Com `weight: ["500", "600", "700"]` o Next gerou três `@font-face` apontando para o mesmo arquivo e o título saiu fino.
   Confira em `document.fonts` e no computed style: `font-weight: 700` e traço visivelmente mais grosso que 500.
