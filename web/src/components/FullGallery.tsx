"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";

type Item = { src: string; alt: string; focus?: string };

/** Every gallery photo in a responsive grid, with a full-screen viewer (arrows, keyboard, swipe-friendly buttons). */
export function FullGallery({ items }: { items: readonly Item[] }) {
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((item) => {
      if (seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    });
  }, [items]);

  const [active, setActive] = useState<number | null>(null);
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
    <>
      <p className="mb-6 text-sm text-kk-muted">{unique.length} photos</p>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {unique.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#0c0e0a] shadow-[0_12px_40px_rgba(12,14,10,0.12)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(12,14,10,0.18)]"
              aria-label={`Open image: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={`object-cover transition duration-700 group-hover:scale-[1.05] ${item.focus ?? "object-[50%_28%]"}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={78}
                loading={i < 6 ? "eager" : "lazy"}
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kk-ink/85 via-kk-ink/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold leading-snug text-kk-accent opacity-0 translate-y-2 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:left-6"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 md:right-6"
            >
              <ChevronRight className="size-5" />
            </button>
            <motion.div
              key={unique[active].src}
              className="relative aspect-[4/3] max-h-[86vh] w-full max-w-5xl cursor-default"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={unique[active].src} alt={unique[active].alt} fill className="object-contain" sizes="100vw" quality={80} priority />
            </motion.div>
            <p className="absolute bottom-5 left-1/2 max-w-xl -translate-x-1/2 px-4 text-center text-sm font-medium text-kk-accent">
              {unique[active].alt}
              <span className="ml-2 text-white/60">
                {active + 1} / {unique.length}
              </span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
