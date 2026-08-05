"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";

type Video = {
  id: string;
  title: string;
  label?: string;
  blurb?: string;
};

function thumbPath(id: string) {
  return `/media/video-thumbs/${id.replace(/^-/, "")}.jpg`;
}

function embedSrc(
  id: string,
  { mute, controls }: { mute: boolean; controls: boolean },
) {
  // Leading "-" ids must stay intact for YouTube.
  const params = new URLSearchParams({
    autoplay: "1",
    mute: mute ? "1" : "0",
    controls: controls ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
  });
  // Loop requires playlist=same id
  params.set("loop", "1");
  params.set("playlist", id);
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function VideoCarousel({ videos }: { videos: readonly Video[] }) {
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return videos.filter((v) => {
      if (seen.has(v.id)) return false;
      seen.add(v.id);
      return true;
    });
  }, [videos]);

  const loop = useMemo(() => [...unique, ...unique, ...unique], [unique]);
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [inView, setInView] = useState(false);

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

  const close = useCallback(() => {
    setActive(null);
    setHovered(null);
    setPlayerReady(false);
  }, []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + unique.length) % unique.length)),
    [unique.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % unique.length)),
    [unique.length],
  );

  useEffect(() => {
    setPlayerReady(false);
  }, [active]);

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

  if (!unique.length) return null;

  const activeVideo = active === null ? null : unique[active];
  const lightboxOpen = active !== null;
  const animPaused = paused || reduce || lightboxOpen || !inView;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="kk-video-track relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden py-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          if (!lightboxOpen) {
            setPaused(false);
            setHovered(null);
          }
        }}
      >
        <div
          className={`flex w-max items-stretch gap-5 px-4 sm:gap-6 sm:px-6 ${
            animPaused ? "[animation-play-state:paused]" : ""
          } animate-kk-video-scroll`}
        >
          {loop.map((video, i) => {
            const sourceIndex = i % unique.length;
            const isHovered = !lightboxOpen && hovered === i;
            return (
              <button
                key={`${video.id}-${i}`}
                type="button"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((h) => (h === i ? null : h))}
                onClick={() => setActive(sourceIndex)}
                className="group flex w-[340px] shrink-0 flex-col overflow-hidden rounded-[26px] border border-kk-border bg-white text-left shadow-[0_14px_40px_rgba(12,14,10,0.08)] transition duration-500 hover:-translate-y-1.5 hover:border-kk-accent/35 hover:shadow-[0_24px_54px_rgba(12,14,10,0.14)] sm:w-[380px] md:w-[420px]"
                aria-label={`Play video: ${video.title}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-kk-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbPath(video.id)}
                    alt=""
                    className={`absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.04] ${
                      isHovered ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {isHovered && !reduce ? (
                    <iframe
                      title={video.title}
                      src={embedSrc(video.id, { mute: true, controls: false })}
                      className="pointer-events-none absolute inset-0 size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      tabIndex={-1}
                    />
                  ) : null}

                  {!isHovered ? (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-kk-ink/10 transition group-hover:bg-kk-ink/20">
                      <span className="inline-flex size-12 items-center justify-center rounded-full bg-white/95 text-kk-accent shadow-lg transition group-hover:scale-105">
                        <Play className="size-5 fill-current" />
                      </span>
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col px-5 py-5 text-center sm:px-6 sm:py-6 md:px-7 md:py-7">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-kk-accent">
                    {video.label ?? "On camera"}
                  </p>
                  <h3 className="mt-2 font-display text-[1.25rem] leading-snug tracking-[-0.02em] text-kk-ink sm:text-[1.35rem] md:text-[1.4rem]">
                    {video.title}
                  </h3>
                  {video.blurb ? (
                    <p className="mt-2.5 text-sm leading-relaxed text-kk-muted line-clamp-3">
                      {video.blurb}
                    </p>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && active !== null ? (
          <motion.div
            className="fixed inset-0 z-[120] flex flex-col bg-[#070807]/97 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kk-video-lightbox-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="relative z-20 flex shrink-0 items-start justify-between gap-4 px-4 pt-[max(0.85rem,env(safe-area-inset-top))] pb-3 sm:px-6 sm:pt-5 sm:pb-4">
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-kk-accent">
                  {activeVideo.label ?? "On camera"}
                </p>
                <h3
                  id="kk-video-lightbox-title"
                  className="mt-1 max-w-3xl font-display text-base leading-snug text-white sm:text-xl md:text-2xl"
                >
                  {activeVideo.title}
                </h3>
                <p className="mt-1 text-xs text-white/45 sm:text-sm">
                  {active + 1} / {unique.length}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close video"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:border-kk-accent/50 hover:bg-kk-accent hover:text-white sm:size-12"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-10 md:px-16">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous video"
                className="absolute left-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition hover:border-kk-accent/50 hover:bg-kk-accent sm:left-4 sm:size-12 md:left-6"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next video"
                className="absolute right-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition hover:border-kk-accent/50 hover:bg-kk-accent sm:right-4 sm:size-12 md:right-6"
              >
                <ChevronRight className="size-5" />
              </button>

              <motion.div
                key={activeVideo.id}
                className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:rounded-2xl"
                initial={{ opacity: 0, scale: 0.985, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                  {/* Poster while player boots — avoids black flash */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbPath(activeVideo.id)}
                    alt=""
                    className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
                      playerReady ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <iframe
                    key={activeVideo.id}
                    title={activeVideo.title}
                    // Browsers block unmuted autoplay → black screen. Start muted; controls let users unmute.
                    src={embedSrc(activeVideo.id, { mute: true, controls: true })}
                    className={`absolute inset-0 size-full transition-opacity duration-500 ${
                      playerReady ? "opacity-100" : "opacity-0"
                    }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => setPlayerReady(true)}
                  />
                </div>
                {activeVideo.blurb ? (
                  <div className="border-t border-white/10 bg-[#0c0e0a] px-5 py-4 sm:px-6">
                    <p className="text-sm leading-relaxed text-white/70">
                      {activeVideo.blurb}
                    </p>
                  </div>
                ) : null}
              </motion.div>
            </div>

            <div className="relative z-20 shrink-0 border-t border-white/8 bg-black/30 px-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:px-6 sm:pt-4">
              <div className="mx-auto flex max-w-6xl gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {unique.map((video, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={video.title}
                      aria-current={selected ? "true" : undefined}
                      className={`relative h-[58px] w-[104px] shrink-0 overflow-hidden rounded-lg transition sm:h-[68px] sm:w-[120px] sm:rounded-xl ${
                        selected
                          ? "ring-2 ring-kk-accent ring-offset-2 ring-offset-[#070807]"
                          : "opacity-55 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbPath(video.id)}
                        alt=""
                        className="size-full object-cover"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
