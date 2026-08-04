"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export type FeaturedStory = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
  external?: boolean;
  cta?: string;
};

export function FeaturedStories({ items }: { items: readonly FeaturedStory[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const story = items[index];

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(t);
  }, [reduce, items.length]);

  if (!story) return null;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.article
          key={story.slug}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group grid overflow-hidden rounded-[22px] border border-kk-border bg-white shadow-sm sm:rounded-[28px] md:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-kk-ink sm:aspect-[16/11] md:aspect-auto md:min-h-[420px]">
            <Image
              src={story.image}
              alt=""
              fill
              className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={95}
              priority={index === 0}
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
            <time className="text-xs font-bold uppercase tracking-[0.14em] text-kk-accent">
              {new Date(story.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <h3 className="mt-3 font-display text-2xl leading-snug text-kk-ink md:text-3xl">
              {story.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-kk-muted md:text-base">
              {story.excerpt}
            </p>

            {story.external ? (
              <a
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-kk-accent px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(241,130,0,0.28)] transition hover:bg-kk-accent-hover sm:w-auto"
              >
                {story.cta || "Read this article"}
                <ArrowUpRight className="size-4" />
              </a>
            ) : (
              <Link
                href={story.href}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-kk-accent px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(241,130,0,0.28)] transition hover:bg-kk-accent-hover sm:w-auto"
              >
                {story.cta || "Read this article"}
                <ArrowUpRight className="size-4" />
              </Link>
            )}
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous story"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-kk-border bg-white text-kk-ink transition hover:border-kk-accent hover:text-kk-accent"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Show story ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-kk-accent" : "w-2 bg-kk-border hover:bg-kk-muted/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next story"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-kk-border bg-white text-kk-ink transition hover:border-kk-accent hover:text-kk-accent"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
