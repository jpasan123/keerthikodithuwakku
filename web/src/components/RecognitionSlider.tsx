"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export type RecognitionItem = {
  id: string;
  kicker: string;
  title: string;
  paragraphs: readonly string[];
  tags?: readonly string[];
  images: readonly { src: string; alt: string; width: number; height: number }[];
  href: string;
  cta: string;
  /** When true, primary CTA opens externalHref instead of href */
  ctaExternal?: boolean;
  externalHref?: string;
  externalLabel?: string;
};

const STORY_MS = 9000;
const IMAGE_MS = 5000;

export function RecognitionSlider({
  items,
}: {
  items: readonly RecognitionItem[];
}) {
  const [storyIndex, setStoryIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const reduce = useReducedMotion();
  const story = items[storyIndex];
  const image = story?.images[imageIndex] ?? story?.images[0];

  useEffect(() => {
    setImageIndex(0);
  }, [storyIndex]);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = window.setInterval(() => {
      setStoryIndex((i) => (i + 1) % items.length);
    }, STORY_MS);
    return () => window.clearInterval(t);
  }, [reduce, items.length]);

  useEffect(() => {
    if (!story || reduce || story.images.length < 2) return;
    const t = window.setInterval(() => {
      setImageIndex((i) => (i + 1) % story.images.length);
    }, IMAGE_MS);
    return () => window.clearInterval(t);
  }, [reduce, story]);

  if (!story || !image) return null;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={`${story.id}-kicker`}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto mb-6 max-w-3xl text-center text-sm leading-relaxed text-kk-muted sm:mb-8 sm:text-base md:text-lg"
        >
          {story.kicker}
        </motion.p>
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={story.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid w-full items-start gap-5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-7"
          >
            {/* Image — capped height, full photo visible, vertically centered vs content */}
            <div className="relative flex w-full items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={image.src}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative inline-block max-w-full leading-none"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="block h-auto max-h-[260px] w-auto max-w-full rounded-[22px] shadow-sm sm:max-h-[300px] sm:rounded-[28px] md:max-h-[340px] lg:max-h-[360px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 52vw"
                    quality={95}
                    priority={storyIndex === 0 && imageIndex === 0}
                  />

                  {story.images.length > 1 ? (
                    <div
                      className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm sm:bottom-4"
                      role="tablist"
                      aria-label={`${story.title} images`}
                    >
                      {story.images.map((img, i) => (
                        <button
                          key={img.src}
                          type="button"
                          role="tab"
                          aria-selected={i === imageIndex}
                          aria-label={`Image ${i + 1}`}
                          onClick={() => setImageIndex(i)}
                          className={`h-2 rounded-full transition-all ${
                            i === imageIndex
                              ? "w-6 bg-kk-accent"
                              : "w-2 bg-white/55 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description — its own frame; height from content only */}
            <article className="flex flex-col rounded-[22px] border border-kk-border bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6 md:p-7 lg:p-8 xl:p-10">
              <h3 className="font-display text-xl leading-snug text-kk-ink sm:text-2xl md:text-[1.65rem] lg:text-[1.85rem]">
                {story.title}
              </h3>

              <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3 md:space-y-3.5">
                {story.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="text-sm leading-relaxed text-kk-muted md:text-[0.95rem] lg:text-[0.98rem]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {story.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-kk-border bg-kk-surface px-3 py-1 text-xs font-semibold tracking-wide text-kk-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-8">
                {story.ctaExternal && story.externalHref ? (
                  <a
                    href={story.externalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-kk-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(241,130,0,0.28)] transition hover:bg-kk-accent-hover sm:w-auto"
                  >
                    {story.cta}
                    <ArrowUpRight className="size-4" />
                  </a>
                ) : (
                  <Link
                    href={story.href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-kk-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(241,130,0,0.28)] transition hover:bg-kk-accent-hover sm:w-auto"
                  >
                    {story.cta}
                    <ArrowUpRight className="size-4" />
                  </Link>
                )}

                {story.externalHref && story.externalLabel ? (
                  story.ctaExternal ? (
                    <Link
                      href={story.href}
                      className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-kk-ink underline decoration-kk-accent/40 underline-offset-4 hover:text-kk-accent hover:decoration-kk-accent sm:justify-start"
                    >
                      {story.externalLabel}
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={story.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-kk-ink underline decoration-kk-accent/40 underline-offset-4 hover:text-kk-accent hover:decoration-kk-accent sm:justify-start"
                    >
                      {story.externalLabel}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )
                ) : null}
              </div>
            </article>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Story navigation */}
      <div className="mt-6 flex items-center justify-center gap-3 sm:mt-7">
        <button
          type="button"
          aria-label="Previous recognition"
          onClick={() =>
            setStoryIndex((i) => (i - 1 + items.length) % items.length)
          }
          className="inline-flex size-10 items-center justify-center rounded-full border border-kk-border bg-white text-kk-ink transition hover:border-kk-accent hover:text-kk-accent"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => setStoryIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === storyIndex
                  ? "w-8 bg-kk-accent"
                  : "w-2 bg-kk-border hover:bg-kk-muted/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next recognition"
          onClick={() => setStoryIndex((i) => (i + 1) % items.length)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-kk-border bg-white text-kk-ink transition hover:border-kk-accent hover:text-kk-accent"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
