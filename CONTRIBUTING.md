# Contribuindo com Lumina

Lumina é mantido pela equipe da **nimbuslab**. Aceitamos contribuições externas, mas o projeto segue uma direção interna específica — alinhada com os produtos da nimbuslab e clientes atendidos.

## Como contribuir

### Reportar bugs ou sugerir features

- Email: `hugo@nimbuslab.com.br`
- Inclua versão do Lumina, React, Next.js e descrição reproduzível

### Pull requests

PRs externos são revisados, mas:

- **Bug fixes** com reprodução clara são bem-vindos
- **Novos componentes ou breaking changes** geralmente aceitos só por convite — abra contato antes de implementar
- **Melhorias de docs e tipos** são sempre bem-vindos

## Setup local

```bash
git clone git@github.com:nimbuslab/lumina.git
cd lumina
bun install
bun run build
bun run typecheck
```

## Padrões

Veja convenções de código, naming e estrutura de componentes no [CLAUDE.md do monorepo nimbuslab](https://github.com/nimbuslab/nimbuslab) (público para colaboradores). Resumo:

- TypeScript strict
- Componentes em PascalCase, arquivos em kebab-case
- Named exports (nunca default)
- Estilização com Tailwind + `cn()` para merge
- Variantes com `class-variance-authority`
- Acessibilidade primeiro: prefira primitivos Radix
- Commits em português brasileiro, conventional commits, sem emojis, sem assinaturas de IA

## Versionamento

Usamos [Changesets](https://github.com/changesets/changesets). Toda mudança que afeta o pacote precisa de um changeset:

```bash
bunx changeset
# escolha minor (feature) ou patch (fix)
# escreva descrição em pt-br
git add .changeset
git commit -m "feat(component): adiciona X"
```

PRs sem changeset não são mesclados (exceto refactors internos sem impacto público).

## Release

Push em `main` aciona o workflow [`release.yml`](.github/workflows/release.yml):

1. Se houver changesets pendentes: abre PR `chore: versionar pacote`
2. Quando esse PR é mergeado: bumpa versão, gera CHANGELOG, publica no npm com provenance

## Licença

Ao contribuir, você concorda em licenciar sua contribuição sob [MIT](./LICENSE).
