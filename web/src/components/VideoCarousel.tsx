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

  if (!unique.length) return null;

  const activeVideo = active === null ? null : unique[active];

  return (
    <div className="relative">
      <div
        className="kk-video-track relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHovered(null);
        }}
      >
        <div
          className={`flex w-max items-stretch gap-5 py-2 sm:gap-6 ${
            paused || reduce ? "[animation-play-state:paused]" : ""
          } animate-kk-video-scroll`}
        >
          {loop.map((video, i) => {
            const sourceIndex = i % unique.length;
            const isHovered = hovered === i;
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
        {activeVideo ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous video"
              className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 sm:inline-flex md:left-6"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next video"
              className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 sm:inline-flex md:right-6"
            >
              <ChevronRight className="size-5" />
            </button>

            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
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
              <div className="border-t border-white/10 bg-[#0c0e0a] px-5 py-4">
                <p className="text-sm font-medium text-white/90 sm:text-base">
                  {activeVideo.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
