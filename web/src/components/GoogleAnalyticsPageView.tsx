"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { sendPageView } from "@/lib/gtag";

/**
 * Tracks page views on client-side navigations (Next.js App Router).
 * Without this, GA4 only records the first page load, not /about, /blog, etc.
 */
export function GoogleAnalyticsPageView({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    if (lastPath.current === path) return;
    lastPath.current = path;

    sendPageView(gaId, path);
  }, [gaId, pathname, searchParams]);

  return null;
}
