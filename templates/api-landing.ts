/**
 * Template de landing page para APIs nimbuslab.
 * Design baseado nos tokens do Lumina (dark mode).
 * Retorna HTML string puro — sem dependência de React ou Tailwind.
 */

interface ApiLandingLink {
  title: string;
  description: string;
  href: string;
}

interface ApiLandingConfig {
  /** Nome da API exibido no header (ex: "Sentinel") */
  name: string;
  /** Descrição curta (ex: "Uptime monitoring by nimbuslab") */
  description: string;
  /** Versão da API (ex: "0.1.0") */
  version: string;
  /** Cards de links (docs, spec, etc) */
  links?: ApiLandingLink[];
  /** Badges/tags exibidos numa seção (ex: ["HTTP", "TCP"]) */
  badges?: string[];
  /** Título da seção de badges (ex: "Tipos de Check") */
  badgesTitle?: string;
}

export function apiLandingHtml(config: ApiLandingConfig): string {
  const { name, description, version, links = [], badges = [], badgesTitle } = config;

  const cardsHtml = links.length > 0
    ? `<div class="cards">${links.map((l) => `
        <a href="${l.href}" class="card">
          <div class="card-title">${l.title}</div>
          <div class="card-desc">${l.description}</div>
        </a>`).join("")}
      </div>`
    : "";

  const badgesHtml = badges.length > 0
    ? `<div class="section">
        ${badgesTitle ? `<div class="section-title">${badgesTitle}</div>` : ""}
        <div class="badges">${badges.map((b) => `<span class="badge">${b}</span>`).join("")}</div>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — nimbuslab</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #141210;
      --card: #1a1714;
      --border: #302b27;
      --primary: #FF5500;
      --fg: #edeae6;
      --muted: #908a85;
      --font-body: 'Inter', system-ui, sans-serif;
      --font-display: 'Comfortaa', cursive;
      --font-mono: 'JetBrains Mono', monospace;
    }

    body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      line-height: 1.6;
    }

    .container { max-width: 640px; width: 100%; }

    .header { text-align: center; margin-bottom: 2.5rem; }

    .logo {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 700;
      color: var(--fg);
      letter-spacing: -0.02em;
    }
    .logo span { color: var(--primary); }

    .app-name {
      font-family: var(--font-mono);
      font-size: 0.875rem;
      color: var(--primary);
      margin-top: 0.25rem;
      letter-spacing: 0.05em;
    }

    .description {
      font-size: 0.875rem;
      color: var(--muted);
      margin-top: 0.5rem;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: var(--muted);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      text-decoration: none;
      color: var(--fg);
      transition: border-color 0.2s, transform 0.2s;
    }
    .card:hover {
      border: 1px solid var(--primary);
      transform: translateY(-2px);
    }

    .card-title { font-weight: 600; font-size: 0.9375rem; margin-bottom: 0.375rem; }
    .card-desc { font-size: 0.8125rem; color: var(--muted); }

    .section {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--muted);
      margin-bottom: 1rem;
    }

    .badges { display: flex; flex-wrap: wrap; gap: 0.5rem; }

    .badge {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--fg);
    }

    footer { text-align: center; font-size: 0.75rem; color: var(--muted); }
    footer a { color: var(--primary); text-decoration: none; }
    footer a:hover { text-decoration: underline; }

    .version {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--muted);
      margin-top: 0.25rem;
    }

    @media (max-width: 480px) {
      .cards { grid-template-columns: 1fr; }
      .logo { font-size: 1.5rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <div class="logo">nimbus<span>lab</span></div>
      <div class="app-name">${name}</div>
      <div class="description">${description}</div>
      <div class="version">v${version}</div>
      <div class="status">
        <div class="status-dot"></div>
        Online
      </div>
    </header>

    ${cardsHtml}
    ${badgesHtml}

    <footer>
      &copy; ${new Date().getFullYear()} <a href="https://nimbuslab.com.br">nimbuslab</a>
    </footer>
  </div>
</body>
</html>`;
}
