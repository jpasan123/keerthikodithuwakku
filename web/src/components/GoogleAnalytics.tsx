import Script from "next/script";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
  process.env.GA_MEASUREMENT_ID?.trim();

/**
 * Google Analytics 4 — loads when a Measurement ID env var is set in Vercel.
 * Preferred key: NEXT_PUBLIC_GA_MEASUREMENT_ID (also accepts GA_MEASUREMENT_ID).
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
