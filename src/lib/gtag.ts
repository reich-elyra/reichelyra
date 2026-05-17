/**
 * Google Analytics 4 — type-safe utilities.
 *
 * Usage:
 *   import { event, pageView, GA_MEASUREMENT_ID } from '@/lib/gtag'
 *
 *   event({ action: 'contact_form_submit', category: 'engagement' })
 *   pageView('/privacy')
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

/** Whether GA is configured (non-empty measurement ID). */
export function isGAEnabled(): boolean {
  return GA_MEASUREMENT_ID.length > 0
}

// ---------------------------------------------------------------------------
// Window augmentation — gtag is injected by the <Script> tag in layout.
// ---------------------------------------------------------------------------

type GtagCommand = 'config' | 'event' | 'set' | 'consent' | 'js'

interface GtagFn {
  (command: 'js', date: Date): void
  (command: 'config', targetId: string, config?: Record<string, unknown>): void
  (command: 'event', action: string, params?: Record<string, unknown>): void
  (command: 'set', params: Record<string, unknown>): void
  (command: 'consent', consentArg: string, params: Record<string, unknown>): void
  (...args: [GtagCommand, ...unknown[]]): void
}

declare global {
  interface Window {
    gtag: GtagFn
    dataLayer: unknown[]
  }
}

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------

/** Send a page_view event. */
export function pageView(url: string): void {
  if (!isGAEnabled()) return
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

interface EventParams {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: unknown
}

/** Send a custom GA4 event. */
export function event({ action, category, label, value, ...rest }: EventParams): void {
  if (!isGAEnabled()) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  })
}

// ---------------------------------------------------------------------------
// Consent helpers (GDPR / cookie banner integration)
// ---------------------------------------------------------------------------

/** Grant analytics consent — call after the user accepts cookies. */
export function grantConsent(): void {
  if (!isGAEnabled()) return
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  })
}

/** Deny analytics consent — call if the user declines cookies. */
export function denyConsent(): void {
  if (!isGAEnabled()) return
  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
  })
}
