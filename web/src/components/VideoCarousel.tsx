"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";

type Video = { id: string; title: string };

function thumbPath(id: string) {
  return `/media/video-thumbs/${id.replace(/^-/, "")}.jpg`;
}

function embedSrc(id: string, { mute, controls }: { mute: boolean; controls: boolean }) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: mute ? "1" : "0",
    controls: controls ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    loop: "1",
    playlist: id,
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
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

  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => {
    setActive(null);
    setHovered(null);
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

  return (
    <div className="relative">
      <div
        className="kk-video-track relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          if (!lightboxOpen) {
            setPaused(false);
            setHovered(null);
          }
        }}
      >
        <div
          className={`flex w-max items-stretch gap-5 py-2 sm:gap-6 ${
            paused || reduce || lightboxOpen ? "[animation-play-state:paused]" : ""
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
                className="group relative h-[220px] w-[360px] shrink-0 overflow-hidden rounded-[22px] bg-[#0c0e0a] text-left shadow-[0_16px_44px_rgba(12,14,10,0.14)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(12,14,10,0.22)] sm:h-[240px] sm:w-[400px] md:h-[260px] md:w-[440px]"
                aria-label={`Play video: ${video.title}`}
              >
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

                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kk-ink/90 via-kk-ink/25 to-transparent opacity-80 transition duration-300 group-hover:opacity-95" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span
                    className="mb-2 block h-0.5 w-8 rounded-full bg-kk-accent"
                    aria-hidden
                  />
                  <span className="block text-left text-sm font-semibold leading-snug text-white line-clamp-2">
                    {video.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && active !== null ? (
          <motion.div
            className="fixed inset-0 z-[120] flex flex-col bg-[#070807]/96 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kk-video-lightbox-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Top chrome */}
            <div className="relative z-20 flex shrink-0 items-start justify-between gap-4 px-4 pt-[max(0.85rem,env(safe-area-inset-top))] pb-3 sm:px-6 sm:pt-5 sm:pb-4">
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-kk-accent">
                  On camera
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

            {/* Stage */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-8 md:px-16 lg:px-20">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous video"
                className="absolute left-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:border-kk-accent/50 hover:bg-kk-accent sm:left-4 sm:size-12 md:left-6"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next video"
                className="absolute right-2 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:border-kk-accent/50 hover:bg-kk-accent sm:right-4 sm:size-12 md:right-6"
              >
                <ChevronRight className="size-5" />
              </button>

              <motion.div
                key={activeVideo.id}
                className="relative w-full max-w-[min(100%,1100px)] overflow-hidden rounded-xl bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:rounded-2xl"
                style={{
                  // Keep player large but leave room for chrome + filmstrip on all devices
                  maxHeight: "min(72dvh, calc(100dvh - 11.5rem))",
                }}
                initial={{ opacity: 0, scale: 0.985, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-video w-full max-h-[inherit] bg-black">
                  <iframe
                    key={activeVideo.id}
                    title={activeVideo.title}
                    src={embedSrc(activeVideo.id, { mute: false, controls: true })}
                    className="absolute inset-0 size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </motion.div>
            </div>

            {/* Filmstrip / mobile nav */}
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
