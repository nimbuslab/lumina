---
"@nimbuslab/lumina": patch
---

Corrige o CSS publicado: globals.css importava tw-animate-css por um caminho relativo de node_modules que não existe dentro do pacote, quebrando o import de @nimbuslab/lumina/styles/globals.css em qualquer projeto. A cópia dos estilos no build também passa a ser idempotente, evitando publicar sem o arquivo no caminho declarado em exports.
