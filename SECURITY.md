# Política de segurança

## Versões com suporte

O Lumina ainda está na linha `0.x`. Só a versão menor mais recente publicada
no npm recebe correções de segurança.

| Versão | Suporte |
|---|---|
| `0.4.x` | sim |
| `0.3.x` e anteriores | não |

## Como reportar uma vulnerabilidade

A aba de Issues deste repositório está desabilitada, e falha de segurança não
deve ser discutida em público antes da correção. Reporte por email:

**suporte@nimbuslab.com.br**

Inclua, se possível:

- descrição da falha e do impacto
- versão do pacote e do ambiente (React, Next.js, Tailwind)
- passos para reproduzir, de preferência com um exemplo mínimo

## O que esperar

- confirmação de recebimento em até 5 dias úteis
- avaliação e retorno sobre a procedência em até 15 dias úteis
- correção publicada no npm e registrada no [CHANGELOG.md](./CHANGELOG.md)

Pedimos que a divulgação pública só aconteça depois da correção publicada.
Créditos ao autor do reporte são registrados no changelog, salvo pedido em
contrário.

## Escopo

Este documento cobre o pacote `@nimbuslab/lumina` publicado no npm e o código
deste repositório. O Lumina é uma biblioteca de componentes de interface: não
processa autenticação, não guarda segredos e não faz chamadas de rede por conta
própria. Os vetores relevantes costumam ser injeção de conteúdo não sanitizado
em componentes que recebem markup e problemas de dependências transitivas.
