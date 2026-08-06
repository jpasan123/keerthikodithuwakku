"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";

type Item = { src: string; alt: string; focus?: string };

export function InfiniteGallery({ items }: { items: readonly Item[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
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
  const [inView, setInView] = useState(false);

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
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  const animPaused = !inView || active !== null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="kk-gallery-track relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
      >
        <div
          className={`flex w-max items-stretch gap-5 py-3 sm:gap-6 ${
            animPaused ? "[animation-play-state:paused]" : ""
          } animate-kk-gallery-scroll`}
        >
          {loop.map((item, i) => {
            const sourceIndex = i % unique.length;
            return (
              <button
                key={`${item.src}-${i}`}
                type="button"
                onClick={() => setActive(sourceIndex)}
                className="kk-gallery-card group relative h-[260px] w-[400px] shrink-0 overflow-hidden rounded-[20px] bg-[#0c0e0a] shadow-[0_12px_40px_rgba(12,14,10,0.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(12,14,10,0.18)] sm:h-[280px] sm:w-[420px] md:h-[286px] md:w-[440px]"
                aria-label={`Open image: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={`object-cover transition duration-700 group-hover:scale-[1.06] ${
                    item.focus ?? "object-[50%_28%]"
                  }`}
                  sizes="(max-width: 768px) 420px, 440px"
                  quality={95}
                  loading={i < 8 ? "eager" : "lazy"}
                />

                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kk-ink/90 via-kk-ink/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0 sm:p-5">
                  <span
                    className="mb-2 block h-0.5 w-8 rounded-full bg-kk-accent"
                    aria-hidden
                  />
                  <span className="block text-left text-sm font-semibold leading-snug text-kk-accent">
                    {item.alt}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 cursor-zoom-out"
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
            <p className="absolute bottom-5 left-1/2 max-w-xl -translate-x-1/2 px-4 text-center text-sm font-medium text-kk-accent">
              {unique[active].alt}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
