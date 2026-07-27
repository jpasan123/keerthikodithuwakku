import Script from "next/script";
import { Suspense } from "react";
import { GoogleAnalyticsPageView } from "@/components/GoogleAnalyticsPageView";
import { getGaMeasurementId } from "@/lib/gtag";

/**
 * Google Analytics 4 — full page tracking for a Next.js App Router site.
 *
 * - Initial gtag load (Vercel env: GA_MEASUREMENT_ID or NEXT_PUBLIC_GA_MEASUREMENT_ID)
 * - page_view on every route change (home, about, blog posts, contact, …)
 *
 * In GA4: Reports → Engagement → Pages and screens (views per page).
 */
export function GoogleAnalytics() {
  const gaId = getGaMeasurementId();
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            send_page_view: false
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView gaId={gaId} />
      </Suspense>
    </>
  );
}
