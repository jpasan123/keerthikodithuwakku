"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type MediaSlide = {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
  /** Logos and brand marks need "contain" so nothing is cropped. */
  fit?: "cover" | "contain";
  position?: string;
};

export function MediaSlider({
  items,
  aspect = "aspect-[4/3]",
  interval = 5200,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  items: readonly MediaSlide[];
  aspect?: string;
  interval?: number;
  sizes?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduce || items.length < 2) return;
    const t = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(t);
  }, [inView, paused, reduce, items.length, interval, go]);

  const slide = items[index];
  if (!slide) return null;

  const contain = slide.fit === "contain";

  return (
    <div
      ref={rootRef}
      className="group relative overflow-hidden rounded-3xl border border-kk-border bg-kk-surface shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Product gallery"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
    >
      <div className={`relative ${aspect}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            className={`absolute inset-0 ${
              contain
                ? `flex items-center justify-center bg-[#f4f5f2] p-10 sm:p-12 ${
                    slide.label || slide.caption ? "pb-24 sm:pb-28" : ""
                  }`
                : ""
            }`}
            initial={reduce ? false : { opacity: 0, scale: contain ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {contain ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                width={420}
                height={420}
                className="max-h-full w-auto object-contain"
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className={`object-cover ${slide.position ?? "object-center"}`}
                sizes={sizes}
                quality={90}
                priority={index === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {slide.label || slide.caption ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-5 pb-16 pt-12 sm:px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${slide.src}-copy`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {slide.label ? (
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-kk-accent">
                    {slide.label}
                  </p>
                ) : null}
                {slide.caption ? (
                  <p className="mt-1 text-sm font-medium leading-snug text-white sm:text-[0.95rem]">
                    {slide.caption}
                  </p>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : null}
      </div>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:border-kk-accent hover:bg-kk-accent focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:border-kk-accent hover:bg-kk-accent focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="size-4" />
          </button>

          <div
            className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Product images"
          >
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={item.caption || item.alt}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === index ? "w-7 bg-kk-accent" : "w-2 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
