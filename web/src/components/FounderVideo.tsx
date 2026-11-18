"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Lightbulb, Users, ShieldCheck, Target } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function FounderVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [userHasPaused, setUserHasPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("0:00");
  const [durationFormatted, setDurationFormatted] = useState("1:04");

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Scroll into view auto-play handler
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userHasPaused) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // Autoplay policy prevented playback
                  setIsPlaying(false);
                });
            }
          }
        } else {
          // Pause when out of view to conserve CPU & memory
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [userHasPaused]);

  // Video time update handler
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;
    const total = video.duration || 64.3;
    setProgress((current / total) * 100);
    setCurrentTimeFormatted(formatTime(current));
    if (video.duration) {
      setDurationFormatted(formatTime(video.duration));
    }
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setUserHasPaused(true);
    } else {
      video.play()
        .then(() => {
          setIsPlaying(true);
          setUserHasPaused(false);
        })
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    // If user unmutes while video is paused, start playback
    if (!nextMuted && video.paused) {
      video.play()
        .then(() => {
          setIsPlaying(true);
          setUserHasPaused(false);
        })
        .catch(() => {});
    }
  }, [isMuted]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = e.currentTarget;
    if (!video || !bar) return;

    const rect = bar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pos * (video.duration || 64.3);
  };

  const pillars = [
    {
      icon: Target,
      title: "Problem Definition & Scale",
      description: "A crystal-clear understanding of the exact pain point and total addressable market.",
    },
    {
      icon: Lightbulb,
      title: "Technological Uniqueness",
      description: "Genuinely defensible deep-tech innovation that creates a strong competitive moat.",
    },
    {
      icon: Users,
      title: "Team Execution & Delivery",
      description: "A dedicated founding team capable of executing, adapting, and delivering results.",
    },
    {
      icon: ShieldCheck,
      title: "Intellectual Property (IP)",
      description: "Patent protection that secures investor confidence and ensures enterprise valuation.",
    },
  ];

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-[28px] border border-kk-border bg-gradient-to-b from-kk-soft via-white to-kk-surface p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Founder Advice Narrative */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-kk-accent/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-kk-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kk-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-kk-accent"></span>
              </span>
              Founder&apos;s Perspective
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-kk-ink sm:text-3xl md:text-4xl">
              Three Keys for Startup Success &amp; Defensible Scale
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-kk-muted sm:text-base">
              Keerthi Kodithuwakku shares firsthand strategic principles for emerging entrepreneurs on problem clarity, tech defensibility, execution, and why intellectual property is essential for investor trust.
            </p>

            <div className="mt-6 space-y-3.5 sm:mt-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-kk-border/70 bg-white/70 p-3 backdrop-blur-xs transition hover:border-kk-accent/40 hover:bg-white"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-kk-accent/10 text-kk-accent">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-kk-ink">
                        {pillar.title}
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-kk-muted">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Right Column: High Performance Video Player */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="relative group overflow-hidden rounded-2xl border border-kk-border bg-black shadow-xl">
              {/* Responsive 16:9 Aspect Ratio Container */}
              <div className="relative aspect-[16/9] w-full cursor-pointer select-none" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src="/media/video/keerthi-startup-advice.mp4"
                  poster="/media/video/keerthi-startup-advice-poster.jpg"
                  preload="metadata"
                  playsInline
                  muted={isMuted}
                  loop
                  onTimeUpdate={handleTimeUpdate}
                  className="h-full w-full object-cover"
                />

                {/* Floating Sound Status / Quick Unmute Pill */}
                {isMuted && isPlaying && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-kk-accent hover:scale-105 active:scale-95 shadow-lg"
                    aria-label="Unmute audio"
                  >
                    <VolumeX className="size-3.5 text-amber-300" />
                    <span>Tap to unmute</span>
                  </button>
                )}

                {/* Big Play Overlay Button when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition group-hover:bg-black/25">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="flex size-16 items-center justify-center rounded-full bg-kk-accent text-white shadow-2xl transition hover:scale-110 active:scale-95 sm:size-20"
                      aria-label="Play video"
                    >
                      <Play className="ml-1 size-7 fill-white sm:size-9" />
                    </button>
                  </div>
                )}
              </div>

              {/* Integrated Bottom Control Bar */}
              <div className="relative z-20 flex flex-col gap-2 bg-gradient-to-t from-black/95 via-black/80 to-black/60 px-4 py-3 text-white backdrop-blur-sm">
                {/* Progress bar */}
                <div
                  className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition hover:h-2"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full rounded-full bg-kk-accent transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="flex items-center gap-1 text-white/90 transition hover:text-kk-accent"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="size-4 fill-current" />
                      ) : (
                        <Play className="size-4 fill-current" />
                      )}
                      <span>{isPlaying ? "Pause" : "Play"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="flex items-center gap-1 text-white/90 transition hover:text-kk-accent"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="size-4 text-amber-400" />
                      ) : (
                        <Volume2 className="size-4 text-emerald-400" />
                      )}
                      <span>{isMuted ? "Unmute" : "Muted"}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-white/70 font-mono text-[11px]">
                    <span>{currentTimeFormatted}</span>
                    <span>/</span>
                    <span>{durationFormatted}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
