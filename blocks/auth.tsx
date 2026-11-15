"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Check, Loader2 } from "lucide-react"

import { Alert } from "../components/alert"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/input-otp"
import { Label } from "../components/label"
import { cn } from "../lib/utils"
import { AuthLogo } from "./auth-logo"

/**
 * Bloco de entrada (login) do Lumina.
 *
 * Tela dividida: painel à esquerda (kicker, headline, apoio e um `visual` opcional) e formulário à direita. No
 * celular o painel vira um cabeçalho compacto. Usa só os tokens semânticos do Lumina (nenhuma cor fixa), então segue o tema do app, claro ou escuro.
 *
 * O bloco NÃO conhece Better Auth nem rede: recebe props e dispara callbacks. Quem usa decide a `step`, o `loading`,
 * o `error` e os `resendSeconds` (há `useResendCountdown` para a contagem do reenvio).
 */

export type AuthStep = "entrar" | "codigo" | "recusa" | "consentimento"

export interface AuthConsent {
  /** Nome do app que pede acesso. */
  appName: string
  /** O que o app poderá fazer, uma frase por item. */
  permissions: string[]
  /** Link opcional da política de privacidade do app. */
  privacyHref?: string
}

/** Textos da interface. `{email}`, `{seconds}`, `{app}` e `{product}` são trocados pelo valor. */
export interface AuthTexts {
  signInTitle: string
  signInHelp: string
  /** Apoio quando não há login com Google. */
  signInHelpEmail: string
  google: string
  or: string
  emailLabel: string
  emailPlaceholder: string
  sendCode: string
  sendingCode: string
  codeTitle: string
  codeHelp: string
  codeLabel: string
  verifyCode: string
  verifyingCode: string
  useOtherEmail: string
  resend: string
  resendIn: string
  deniedTitle: string
  retry: string
  consentTitle: string
  /** Título quando o app não informou o nome. */
  consentTitleFallback: string
  consentIntro: string
  consentAccount: string
  cancel: string
  allow: string
  allowing: string
  privacy: string
}

export const defaultAuthTexts: AuthTexts = {
  signInTitle: "Entrar",
  signInHelp: "Use sua conta Google ou receba um código por e-mail.",
  signInHelpEmail: "Receba um código por e-mail para entrar.",
  google: "Continuar com Google",
  or: "ou",
  emailLabel: "E-mail",
  emailPlaceholder: "voce@empresa.com",
  sendCode: "Enviar código",
  sendingCode: "Enviando código",
  codeTitle: "Digite o código",
  codeHelp: "Enviamos um código de 6 dígitos para {email}.",
  codeLabel: "Código de 6 dígitos",
  verifyCode: "Verificar código",
  verifyingCode: "Verificando código",
  useOtherEmail: "Usar outro e-mail",
  resend: "Reenviar código",
  resendIn: "Reenviar em {seconds} s",
  deniedTitle: "Essa conta não pode entrar aqui",
  retry: "Tentar com outro e-mail",
  consentTitle: "{app} quer acessar sua conta",
  consentTitleFallback: "Autorizar acesso à sua conta",
  consentIntro: "Com a sua permissão, este app poderá usar sua conta {product} para:",
  consentAccount: "Entrando como",
  cancel: "Cancelar",
  allow: "Permitir",
  allowing: "Permitindo",
  privacy: "Política de privacidade",
}

interface AuthBlockBaseProps {

  /* Painel */
  /** Kicker em mono, caixa alta. */
  kicker?: string
  /** Headline do painel. */
  title: string
  /** Palavra (trecho) do título que vai em text-primary (só em título grande). Se não estiver no título, é ignorada. */
  highlight?: string
  /** Texto de apoio do painel. */
  description?: string
  /** Slot opcional (uma foto, por exemplo). Sem ele, nada é renderizado no lugar. */
  visual?: React.ReactNode

  /* Estado */
  /** E-mail da conta: destino do código, conta do consentimento e valor inicial do campo. */
  email?: string
  /** Operação em andamento na tela atual. */
  loading?: boolean
  /** Erro da tela atual (e-mail ou código). A recusa ignora este campo e mostra sempre a mesma mensagem. */
  error?: string | null
  /** Incremente a cada erro: dois erros com a mesma mensagem só limpam o código se esta chave mudar (ou se o loading voltar a false com erro). */
  errorKey?: number | string
  /** Segundos que faltam para liberar o reenvio. 0 libera. */
  resendSeconds?: number
  /** Nome do produto que aparece no consentimento. Padrão: a marca nimbuslab. */
  productName?: string

  /* Callbacks */
  onGoogle?: () => void
  onRequestCode?: (email: string) => void
  onVerifyCode?: (email: string, code: string) => void
  onResend?: () => void
  onUseOtherEmail?: () => void
  onRetry?: () => void
  onAllow?: () => void
  onCancel?: () => void

  texts?: Partial<AuthTexts>
  className?: string
}

/** `consent` é obrigatório na tela de consentimento (união discriminada pelo `step`). */
export type AuthBlockProps = AuthBlockBaseProps &
  (
    | {
        /** Tela atual. Quem usa controla. */
        step: "consentimento"
        consent: AuthConsent
      }
    | {
        step: Exclude<AuthStep, "consentimento">
        consent?: AuthConsent
      }
  )

/** Só https: passa a URL normalizada, ou undefined (javascript:, http:, relativa, inválida). */
function safeHttpsUrl(href?: string): string | undefined {
  if (!href) return undefined
  try {
    const url = new URL(href)
    return url.protocol === "https:" ? url.href : undefined
  } catch {
    return undefined
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CODE_LENGTH = 6

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}

function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m))
}

/**
 * Contagem regressiva do reenvio: `seconds` cai de `start` até 0; `restart()` recomeça.
 * Com `startPaused`, fica em 0 até o primeiro `restart()` (ex.: ao entrar no passo do código).
 */
export function useResendCountdown(start: number, options: { startPaused?: boolean } = {}) {
  const [seconds, setSeconds] = React.useState(options.startPaused ? 0 : start)
  const [run, setRun] = React.useState(0)
  const active = seconds > 0

  React.useEffect(() => {
    if (!active) return
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [active, run])

  const restart = React.useCallback(() => {
    setSeconds(start)
    setRun((r) => r + 1)
  }, [start])

  return { seconds, restart }
}

/* Estilos da régua de identidade (12/11): botão mono 15/20 semibold, 44 de altura, raio 12, sem sombra,
   anel de foco de 3 px e sem opacidade em texto. */
const buttonBase =
  "h-11 w-full rounded-xl px-[22px] py-3 text-[15px] leading-5 font-semibold shadow-none hover:shadow-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:ring-offset-0 disabled:opacity-100"
const buttonPrimary = cn(buttonBase, "disabled:bg-muted disabled:text-muted-foreground")
const buttonOutlined = cn(
  buttonBase,
  "border-[1.5px] border-foreground bg-card text-foreground hover:border-foreground hover:bg-muted hover:text-foreground disabled:border-border disabled:text-muted-foreground"
)
const buttonText =
  "h-auto w-auto self-start rounded-[10px] px-0 py-0 text-sm leading-5 font-semibold text-foreground underline underline-offset-4 hover:no-underline focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:ring-offset-0 disabled:text-muted-foreground disabled:no-underline disabled:opacity-100"
const inputField =
  "h-11 rounded-[10px] border-input bg-card px-3.5 py-3 shadow-none focus-visible:border-primary focus-visible:ring-primary/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20"

const titleClass = "font-title text-[28px] leading-9 font-bold tracking-[-0.03em] text-foreground"
// Apoio do formulário em text-foreground: o muted-foreground do claro dá 4,2:1 sobre o background (abaixo do AA).
const helpClass = "text-sm leading-5 text-foreground"

export function AuthBlock({
  step,
  kicker,
  title,
  highlight,
  description,
  visual,
  email = "",
  loading = false,
  error = null,
  errorKey,
  resendSeconds = 0,
  consent,
  productName = "nimbuslab",
  onGoogle,
  onRequestCode,
  onVerifyCode,
  onResend,
  onUseOtherEmail,
  onRetry,
  onAllow,
  onCancel,
  texts: textsProp,
  className,
}: AuthBlockProps) {
  const t: AuthTexts = { ...defaultAuthTexts, ...textsProp }

  return (
    <div
      data-slot="auth-block"
      className={cn("grid min-h-svh grid-rows-[auto_1fr] bg-background text-foreground lg:grid-cols-2 lg:grid-rows-1", className)}
    >
      <Panel kicker={kicker} title={title} highlight={highlight} description={description} visual={visual} />
      <main className="flex items-start justify-center px-[21px] py-[34px] lg:items-center lg:p-[55px]">
        <div className="w-full max-w-sm">
          {step === "entrar" ? (
            <SignInStep t={t} initialEmail={email} loading={loading} error={error} onGoogle={onGoogle} onRequestCode={onRequestCode} />
          ) : step === "codigo" ? (
            <CodeStep
              t={t}
              email={email}
              loading={loading}
              error={error}
              errorKey={errorKey}
              resendSeconds={resendSeconds}
              onVerifyCode={onVerifyCode}
              onResend={onResend}
              onUseOtherEmail={onUseOtherEmail}
            />
          ) : step === "recusa" ? (
            <DeniedStep t={t} onRetry={onRetry} />
          ) : (
            <ConsentStep t={t} email={email} consent={consent} productName={productName} loading={loading} onAllow={onAllow} onCancel={onCancel} />
          )}
        </div>
      </main>
    </div>
  )
}

function Panel({
  kicker,
  title,
  highlight,
  description,
  visual,
}: Pick<AuthBlockProps, "kicker" | "title" | "highlight" | "description" | "visual">) {
  const at = highlight ? title.indexOf(highlight) : -1
  const headline =
    highlight && at >= 0 ? (
      <>
        {title.slice(0, at)}
        <span data-slot="auth-highlight" className="text-primary">
          {highlight}
        </span>
        {title.slice(at + highlight.length)}
      </>
    ) : (
      title
    )

  return (
    <aside className="flex flex-col border-b border-border bg-card lg:border-r lg:border-b-0">
      <div className="flex flex-col gap-[13px] p-[21px] lg:gap-[34px] lg:p-[55px]">
        <AuthLogo className="h-5 w-auto self-start lg:h-6" />
        <div className="flex flex-col lg:max-w-md">
          {kicker ? (
            <p className="mb-[13px] hidden font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground lg:block">
              {kicker}
            </p>
          ) : null}
          <p className="font-title text-xl leading-7 font-bold tracking-[-0.03em] text-foreground lg:text-[44px] lg:leading-[52px] lg:tracking-[-0.04em]">
            {headline}
          </p>
          {description ? (
            <p className="mt-[21px] hidden text-pretty text-lg leading-7 text-muted-foreground lg:block">{description}</p>
          ) : null}
        </div>
      </div>
      {visual ? (
        // Sangra até as bordas do painel (sem cartão). O visual deve preencher o slot: imagens recebem object-cover.
        <div
          data-slot="auth-visual"
          className="relative h-[120px] overflow-hidden lg:h-auto lg:min-h-[280px] lg:flex-1 [&_img]:size-full [&_img]:object-cover"
        >
          {visual}
        </div>
      ) : null}
    </aside>
  )
}

function SignInStep({
  t,
  initialEmail,
  loading,
  error,
  onGoogle,
  onRequestCode,
}: {
  t: AuthTexts
  initialEmail: string
  loading: boolean
  error: string | null
  onGoogle?: () => void
  onRequestCode?: (email: string) => void
}) {
  const id = React.useId()
  const errorId = `${id}-erro`
  const [value, setValue] = React.useState(initialEmail)
  const valid = isValidEmail(value)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || loading) return
    onRequestCode?.(value.trim())
  }

  return (
    <div className="flex flex-col gap-[34px]">
      <header className="flex flex-col gap-2">
        <h1 className={titleClass}>{t.signInTitle}</h1>
        <p className={helpClass}>{onGoogle ? t.signInHelp : t.signInHelpEmail}</p>
      </header>

      {onGoogle ? (
        <>
          <Button type="button" variant="outline" className={buttonOutlined} onClick={onGoogle} disabled={loading}>
            <GoogleLogo />
            {t.google}
          </Button>
          <div className="flex items-center gap-[13px] text-foreground">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.12em]">{t.or}</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </>
      ) : null}

      <form onSubmit={submit} noValidate className="flex flex-col gap-[21px]">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-email`}>{t.emailLabel}</Label>
          <Input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t.emailPlaceholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={inputField}
          />
          {error ? (
            <p id={errorId} role="alert" className="border-l-2 border-destructive pl-3 text-sm leading-5 text-foreground">
              {error}
            </p>
          ) : null}
        </div>
        <Button
          type="submit"
          className={buttonPrimary}
          disabled={loading || !valid}
          aria-busy={loading || undefined}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              {t.sendingCode}
            </>
          ) : (
            t.sendCode
          )}
        </Button>
      </form>
    </div>
  )
}

function CodeStep({
  t,
  email,
  loading,
  error,
  errorKey,
  resendSeconds,
  onVerifyCode,
  onResend,
  onUseOtherEmail,
}: {
  t: AuthTexts
  email: string
  loading: boolean
  error: string | null
  errorKey?: number | string
  resendSeconds: number
  onVerifyCode?: (email: string, code: string) => void
  onResend?: () => void
  onUseOtherEmail?: () => void
}) {
  const id = React.useId()
  const errorId = `${id}-erro`
  const [code, setCode] = React.useState("")
  const sent = React.useRef<string | null>(null)
  const complete = code.length === CODE_LENGTH

  // Código recusado: limpa para tentar de novo e libera o mesmo código para um novo envio. Dispara quando o erro
  // muda, quando o consumidor muda o errorKey (mesma mensagem de novo) ou quando o loading volta a false com erro.
  React.useEffect(() => {
    if (error && !loading) {
      setCode("")
      sent.current = null
    }
  }, [error, errorKey, loading])

  function submit(value: string) {
    if (loading || value.length !== CODE_LENGTH || sent.current === value) return
    sent.current = value
    onVerifyCode?.(email, value)
  }

  function change(value: string) {
    setCode(value)
    if (value.length < CODE_LENGTH) sent.current = null
    else submit(value)
  }

  return (
    <div className="flex flex-col gap-[34px]">
      <header className="flex flex-col gap-2">
        <h1 className={titleClass}>{t.codeTitle}</h1>
        <p className={helpClass}>{fill(t.codeHelp, { email })}</p>
      </header>

      <form
        className="flex flex-col gap-[21px]"
        onSubmit={(e) => {
          e.preventDefault()
          submit(code)
        }}
      >
        <div className="flex flex-col gap-2">
          <InputOTP
            maxLength={CODE_LENGTH}
            pattern={REGEXP_ONLY_DIGITS}
            value={code}
            onChange={change}
            disabled={loading}
            autoFocus
            aria-label={t.codeLabel}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            containerClassName="justify-between gap-2"
          >
            <InputOTPGroup className="w-full justify-between gap-2">
              {Array.from({ length: CODE_LENGTH }, (_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className={cn(
                    "h-11 w-11 flex-1 rounded-[10px] border border-input bg-card font-mono text-base first:rounded-[10px] last:rounded-[10px]",
                    error && "border-destructive"
                  )}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error ? (
            <p id={errorId} role="alert" className="border-l-2 border-destructive pl-3 text-sm leading-5 text-foreground">
              {error}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          className={buttonPrimary}
          disabled={loading || !complete}
          aria-busy={loading || undefined}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              {t.verifyingCode}
            </>
          ) : (
            t.verifyCode
          )}
        </Button>
      </form>

      <div className="flex flex-col gap-[13px]">
        <Button
          type="button"
          variant="link"
          className={buttonText}
          onClick={onResend}
          disabled={loading || resendSeconds > 0}
        >
          {resendSeconds > 0 ? fill(t.resendIn, { seconds: resendSeconds }) : t.resend}
        </Button>
        <Button type="button" variant="link" className={buttonText} onClick={onUseOtherEmail} disabled={loading}>
          {t.useOtherEmail}
        </Button>
      </div>
    </div>
  )
}

function DeniedStep({ t, onRetry }: { t: AuthTexts; onRetry?: () => void }) {
  return (
    <div className="flex flex-col gap-[34px]">
      <Alert
        aria-live="assertive"
        aria-atomic="true"
        className="rounded-[14px] border-destructive bg-card p-[21px] text-foreground"
      >
        <h1 className="font-title text-[22px] leading-7 font-bold tracking-[-0.03em]">{t.deniedTitle}</h1>
      </Alert>
      {onRetry ? (
        <Button type="button" variant="outline" className={buttonOutlined} onClick={onRetry}>
          {t.retry}
        </Button>
      ) : null}
    </div>
  )
}

function ConsentStep({
  t,
  email,
  consent,
  productName,
  loading,
  onAllow,
  onCancel,
}: {
  t: AuthTexts
  email: string
  consent?: AuthConsent
  productName: string
  loading: boolean
  onAllow?: () => void
  onCancel?: () => void
}) {
  const appName = consent?.appName?.trim() ?? ""
  return (
    <div className="flex flex-col gap-[34px]">
      <header className="flex flex-col gap-2">
        <h1 className={titleClass}>{appName ? fill(t.consentTitle, { app: appName }) : t.consentTitleFallback}</h1>
        {email ? (
          <p className={helpClass}>
            {t.consentAccount} <span className="font-medium text-foreground">{email}</span>
          </p>
        ) : null}
      </header>

      <section className="flex flex-col gap-[13px] rounded-[14px] border border-border bg-card p-[21px]">
        <p className="text-sm leading-5 font-medium text-foreground">{fill(t.consentIntro, { product: productName })}</p>
        <ul className="flex flex-col gap-[13px]">
          {(consent?.permissions ?? []).map((permission) => (
            <li key={permission} className="flex items-start gap-3 text-sm leading-5 text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
              <span>{permission}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-2 gap-[13px]">
        <Button type="button" variant="outline" className={buttonOutlined} onClick={onCancel} disabled={loading}>
          {t.cancel}
        </Button>
        <Button
          type="button"
          className={buttonPrimary}
          onClick={onAllow}
          disabled={loading}
          aria-busy={loading || undefined}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              {t.allowing}
            </>
          ) : (
            t.allow
          )}
        </Button>
      </div>

      {safeHttpsUrl(consent?.privacyHref) ? (
        <a
          href={safeHttpsUrl(consent?.privacyHref)}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start rounded-[10px] text-sm leading-5 font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:outline-none"
        >
          {t.privacy}
        </a>
      ) : null}
    </div>
  )
}

/** G oficial do Google (cores da marca do provedor). */
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  )
}
