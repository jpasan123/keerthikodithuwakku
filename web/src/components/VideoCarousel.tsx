"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Video = { id: string; title: string };

function thumbPath(id: string) {
  return `/media/video-thumbs/${id.replace(/^-/, "")}.jpg`;
}

export function VideoCarousel({
  videos,
  autoMs = 12000,
}: {
  videos: readonly Video[];
  autoMs?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "80px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setLoaded(false);
  }, [index]);

  useEffect(() => {
    if (!inView || reduce || paused || videos.length < 2) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % videos.length);
    }, autoMs);
    return () => window.clearInterval(t);
  }, [inView, reduce, paused, videos.length, autoMs]);

  if (!videos.length) return null;

  const current = videos[index];
  const prev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);
  const next = () => setIndex((i) => (i + 1) % videos.length);
  const embedSrc = `https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${current.id}`;

  return (
    <div
      ref={rootRef}
      className="mx-auto w-full max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-kk-border bg-kk-ink shadow-[0_16px_40px_rgba(12,14,10,0.1)]">
        {/* Poster stays visible until iframe paints — avoids black flash */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbPath(current.id)}
          alt=""
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
            inView && loaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {inView ? (
          <iframe
            key={current.id}
            title={current.title}
            src={embedSrc}
            className={`absolute inset-0 size-full transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setLoaded(true)}
          />
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-sm font-medium text-white line-clamp-2">{current.title}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {videos.map((v, i) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative aspect-video overflow-hidden rounded-xl border text-left transition ${
              i === index
                ? "border-kk-accent ring-2 ring-kk-accent/25"
                : "border-kk-border hover:border-kk-accent/40"
            }`}
            aria-label={v.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbPath(v.id)}
              alt=""
              className="size-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
              <span className="block text-[10px] font-medium text-white line-clamp-2 leading-tight">
                {v.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-kk-muted">
          {index + 1} / {videos.length} · hover to pause autoplay
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous video"
            className="inline-flex size-9 items-center justify-center rounded-full border border-kk-border bg-white hover:border-kk-accent hover:text-kk-accent transition"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next video"
            className="inline-flex size-9 items-center justify-center rounded-full border border-kk-border bg-white hover:border-kk-accent hover:text-kk-accent transition"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
