"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";

type Item = { src: string; alt: string };

export function InfiniteGallery({ items }: { items: readonly Item[] }) {
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((item) => {
      if (seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    });
  }, [items]);

  const loop = useMemo(() => [...unique, ...unique, ...unique], [unique]);

  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + unique.length) % unique.length)),
    [unique.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % unique.length)),
    [unique.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    lockPageScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockPageScroll();
    };
  }, [active, close, prev, next]);

  if (unique.length === 0) return null;

  return (
    <div className="relative">
      {/* Full-bleed horizontal reel with soft edge fades */}
      <div
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className={`flex w-max gap-4 py-2 sm:gap-5 md:gap-6 ${paused ? "[animation-play-state:paused]" : ""} animate-kk-gallery-scroll`}
          aria-hidden={false}
        >
          {loop.map((item, i) => {
            const sourceIndex = i % unique.length;
            return (
              <button
                key={`${item.src}-${i}`}
                type="button"
                onClick={() => setActive(sourceIndex)}
                className="group relative h-[260px] w-[360px] shrink-0 cursor-zoom-in overflow-hidden rounded-[22px] border border-kk-border bg-kk-ink/5 shadow-[0_10px_36px_rgba(12,14,10,0.08)] transition duration-500 hover:-translate-y-1.5 hover:border-kk-accent/35 hover:shadow-[0_24px_52px_rgba(12,14,10,0.14)] sm:h-[300px] sm:w-[420px] md:h-[340px] md:w-[480px] lg:h-[380px] lg:w-[540px]"
                aria-label={`Open image: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 360px, 540px"
                  quality={88}
                  loading={i < 6 ? "eager" : "lazy"}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kk-ink/70 via-kk-ink/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium leading-snug text-white opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {item.alt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-kk-muted sm:text-sm">
        Auto-scrolling gallery — hover to pause, click any photo for full size.
      </p>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-3 md:left-6 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-3 md:right-6 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition"
            >
              <ChevronRight className="size-5" />
            </button>
            <motion.div
              key={unique[active].src}
              className="relative max-h-[86vh] w-full max-w-5xl aspect-[4/3]"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={unique[active].src}
                alt={unique[active].alt}
                fill
                className="object-contain"
                sizes="100vw"
                quality={95}
              />
            </motion.div>
            <p className="absolute bottom-5 left-1/2 max-w-xl -translate-x-1/2 px-4 text-center text-sm text-white/80">
              {unique[active].alt}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
