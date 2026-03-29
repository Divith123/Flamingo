import { env } from "@flamingo/env/server";
import * as Sentry from "@sentry/node";
import { logger } from "./logger.js";

export function initSentry(): void {
  if (!env.SENTRY_DSN) {
    logger.warn("[Sentry] DSN not configured, skipping initialization");
    return;
  }

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.SENTRY_ENVIRONMENT,
    /* nodeProfilingIntegration is currently unsupported in Bun (uv_default_loop panic) */
    integrations: [],
    tracesSampleRate: env.SENTRY_TRACES_SAMPLE_RATE,
  });

  logger.info(`[Sentry] Initialized for ${env.SENTRY_ENVIRONMENT}`);
}

export async function closeSentry(): Promise<void> {
  try {
    await Sentry.close(2000);
    logger.info("[Sentry] Closed successfully");
  } catch (error) {
    logger.error({ err: error }, "[Sentry] Error closing");
  }
}

export function captureException(error: Error | unknown): string {
  return Sentry.captureException(error);
}

export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
): string {
  return Sentry.captureMessage(message, level);
}

export function setUser(user: Sentry.User | null): void {
  Sentry.setUser(user);
}

export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb): void {
  Sentry.addBreadcrumb(breadcrumb);
}

export async function withSpan<T>(
  context: Parameters<typeof Sentry.startSpan>[0],
  callback: () => Promise<T>,
): Promise<T> {
  return Sentry.startSpan(context, callback);
}

export { Sentry };
