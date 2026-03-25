"use client"

import Script from "next/script"
import type { ReactNode } from "react"

// ── Container ────────────────────────────────────────────────────────────────

interface AnalyticsProps {
  children: ReactNode
}

export function Analytics({ children }: AnalyticsProps) {
  return <>{children}</>
}

// ── Lens (nimbuslab) ─────────────────────────────────────────────────────────

interface LensProps {
  siteId: string
  replay?: boolean
}

export function Lens({ siteId, replay }: LensProps) {
  return (
    <Script
      src="https://lens-api.nimbuslab.com.br/lens.js"
      data-site={siteId}
      {...(replay ? { "data-replay": "true" } : {})}
      strategy="afterInteractive"
    />
  )
}

// ── Microsoft Clarity ────────────────────────────────────────────────────────

interface ClarityProps {
  projectId: string
}

export function Clarity({ projectId }: ClarityProps) {
  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");`,
      }}
    />
  )
}

// ── Google Analytics 4 ───────────────────────────────────────────────────────

interface GA4Props {
  measurementId: string
  /** Bloqueia ad storage e personalization por padrão (LGPD) */
  consentMode?: boolean
}

export function GA4({ measurementId, consentMode = true }: GA4Props) {
  const consentBlock = consentMode
    ? `gtag('consent','default',{'analytics_storage':'granted','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied'});`
    : ""

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${consentBlock}gtag('config','${measurementId}');`,
        }}
      />
    </>
  )
}

// ── Google Tag Manager ───────────────────────────────────────────────────────

interface GTMProps {
  containerId: string
}

export function GTM({ containerId }: GTMProps) {
  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}');`,
      }}
    />
  )
}

export function GTMNoscript({ containerId }: GTMProps) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}
