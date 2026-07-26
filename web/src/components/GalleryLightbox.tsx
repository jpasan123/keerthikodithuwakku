"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";

type Item = { src: string; alt: string };

export function GalleryLightbox({ items }: { items: readonly Item[] }) {
  // Drop accidental duplicate src entries (same photo listed twice)
  const unique = (() => {
    const seen = new Set<string>();
    return items.filter((item) => {
      if (seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    });
  })();

  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(12);

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

  const shown = unique.slice(0, visible);

  return (
    <div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {shown.map((item, i) => (
          <motion.button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-kk-border cursor-zoom-in"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
            aria-label={`Open image: ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={1200}
              height={900}
              className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={92}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-kk-ink/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-0 left-0 right-0 p-3 text-left text-sm font-medium text-white opacity-0 translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0">
              {item.alt}
            </span>
          </motion.button>
        ))}
      </div>

      {visible < unique.length ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(unique.length, v + 8))}
            className="inline-flex items-center justify-center rounded-full border border-kk-border bg-white px-6 py-2.5 text-sm font-semibold text-kk-ink hover:border-kk-accent hover:text-kk-accent transition"
          >
            Show more photos ({unique.length - visible} left)
          </button>
        </div>
      ) : null}

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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
