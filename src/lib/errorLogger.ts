/**
 * Centralized error logger.
 *
 * Today: forwards to console.error in dev, no-ops in production.
 * Future: drop in a Sentry/PostHog/Logflare client by replacing `report()`.
 *
 * Usage:
 *   import { logError } from "@/lib/errorLogger";
 *   try { ... } catch (err) { logError(err, { area: "contact-form" }); }
 *
 * Set NEXT_PUBLIC_SENTRY_DSN later to enable remote reporting (see
 * .env.example for the env var contract).
 */

interface ErrorContext {
  area?: string;
  user?: { id?: string; email?: string };
  extra?: Record<string, unknown>;
}

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN ?? "";

function safeMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

function report(err: unknown, context: ErrorContext): void {
  // In dev, surface to the console so developers can spot regressions.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("[errorLogger]", safeMessage(err), context, err);
    return;
  }

  // In production without a remote sink, do nothing — never leak errors to
  // user-facing console. Once a DSN is configured, route to that provider.
  if (!SENTRY_DSN) return;

  // TODO: when adding Sentry, replace this block with
  //   Sentry.captureException(err, { tags: { area: context.area }, extra: context.extra });
}

export function logError(err: unknown, context: ErrorContext = {}): void {
  report(err, context);
}

/** Convert unknown errors into a safe, user-displayable string. */
export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Something went wrong. Please try again.";
}
