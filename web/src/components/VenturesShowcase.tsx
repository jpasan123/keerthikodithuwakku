"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Venture = {
  name: string;
  role: string;
  summary: string;
  href: string;
  image: string;
  position?: string;
  highlights: readonly string[];
};

export function VenturesShowcase({ items }: { items: readonly Venture[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduce || items.length < 2) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 5200);
    return () => window.clearInterval(t);
  }, [inView, reduce, items.length]);

  const item = items[index];
  const external = item.href.startsWith("http");

  return (
    <div ref={rootRef}>
      <div className="relative overflow-hidden rounded-[28px] border border-kk-border bg-kk-soft min-h-[400px] sm:min-h-[420px] md:min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.name}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              className={`object-cover ${item.position ?? "object-center"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              quality={92}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex h-full min-h-[400px] sm:min-h-[420px] md:min-h-[460px] flex-col justify-end p-6 sm:p-8 md:p-11">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${item.name}-copy`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="max-w-xl"
            >
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-kk-accent mb-3">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")} · {item.role}
              </p>
              <h3 className="font-display text-3xl md:text-5xl text-white leading-[1.08]">
                {item.name}
              </h3>
              <p className="mt-4 text-sm md:text-base text-white/92 leading-relaxed">
                {item.summary}
              </p>
              <p className="mt-4 text-xs md:text-sm font-medium tracking-wide text-white/80">
                {item.highlights.join(" · ")}
              </p>
              <Link
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-kk-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-kk-accent-hover transition-colors"
              >
                Explore venture <ArrowUpRight className="size-4" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-2">
            {items.map((v, i) => (
              <button
                key={v.name}
                type="button"
                aria-label={`Show ${v.name}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-kk-accent" : "w-4 bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 md:gap-3">
        {items.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => setIndex(i)}
            className={`rounded-2xl border px-3 py-3.5 text-left transition-all duration-300 ${
              i === index
                ? "border-kk-accent bg-kk-accent/5"
                : "border-kk-border bg-white hover:border-kk-accent/40"
            }`}
          >
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-kk-accent">
              {v.role}
            </p>
            <p className="mt-1 text-sm font-semibold text-kk-ink leading-snug">{v.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
