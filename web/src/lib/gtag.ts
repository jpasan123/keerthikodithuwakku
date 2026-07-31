/** Resolve GA4 Measurement ID from Vercel / local env (server or build time). */
export function getGaMeasurementId(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    process.env.GA_MEASUREMENT_ID?.trim() ||
    undefined
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Send a GA4 page_view, used on every App Router navigation. */
export function sendPageView(gaId: string, path: string, title?: string) {
  if (!gaId || typeof window.gtag !== "function") return;

  const pagePath = path.startsWith("/") ? path : `/${path}`;

  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_title: title ?? document.title,
    page_location: `${window.location.origin}${pagePath}`,
  });
}
