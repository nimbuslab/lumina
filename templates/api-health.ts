/**
 * Template de health check para APIs nimbuslab.
 * Design minimalista baseado nos tokens do Lumina (dark mode).
 * Retorna HTML string puro — sem dependência de React ou Tailwind.
 */

interface ApiHealthConfig {
  /** Nome da API (ex: "nimbuslab-api") */
  name: string;
  /** Versão (ex: "0.1.0") */
  version: string;
  /** Status atual (ex: "ok") */
  status: string;
  /** Timestamp ISO (ex: "2026-02-20T12:00:00.000Z") */
  timestamp: string;
  /** Uptime legível (opcional, ex: "3d 12h 45m") */
  uptime?: string;
}

export function apiHealthHtml(config: ApiHealthConfig): string {
  const { name, version, status, timestamp, uptime } = config;
  const isOk = status === "ok";
  const statusColor = isOk ? "#22c55e" : "#ef4444";
  const statusLabel = isOk ? "Online" : "Offline";

  const uptimeHtml = uptime
    ? `<div class="info-row">
        <span class="info-label">Uptime</span>
        <span class="info-value">${uptime}</span>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Health</title>
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
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    .container { max-width: 400px; width: 100%; }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 2rem;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }

    .logo {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--fg);
      letter-spacing: -0.02em;
    }
    .logo span { color: var(--primary); }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: ${statusColor};
      background: ${statusColor}10;
      border: 1px solid ${statusColor}30;
      border-radius: 20px;
      padding: 0.25rem 0.75rem;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${statusColor};
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .info { display: flex; flex-direction: column; gap: 0.75rem; }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .info-label {
      font-size: 0.8125rem;
      color: var(--muted);
    }

    .info-value {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: var(--fg);
    }

    footer {
      text-align: center;
      font-size: 0.6875rem;
      color: var(--muted);
      margin-top: 1.5rem;
    }
    footer a { color: var(--primary); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">nimbus<span>lab</span></div>
        <div class="status-badge">
          <div class="status-dot"></div>
          ${statusLabel}
        </div>
      </div>

      <div class="info">
        <div class="info-row">
          <span class="info-label">Serviço</span>
          <span class="info-value">${name}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Versão</span>
          <span class="info-value">v${version}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Timestamp</span>
          <span class="info-value">${new Date(timestamp).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</span>
        </div>
        ${uptimeHtml}
      </div>
    </div>

    <footer>
      <a href="/">${name}</a> &middot; Health Check
    </footer>
  </div>
</body>
</html>`;
}
