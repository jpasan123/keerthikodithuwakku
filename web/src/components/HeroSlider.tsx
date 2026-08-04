"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./Button";

/**
 * Each slide carries a desktop (cinematic landscape) image AND a
 * mobile image where Keerthi is centered, so tall phones never crop
 * to a logo or another person. Positions are tuned per orientation.
 */
const slides = [
  {
    src: "/media/hero/ict-leader-stage-hq.jpg",
    mobileSrc: "/media/hero/ict-leader-stage-hq.jpg",
    desktopPosition: "object-[50%_38%]",
    mobilePosition: "object-[41%_54%]",
    eyebrow: "ICT Leader of the Year 2025",
    title: "Building global MedTech innovation from Sri Lanka",
    text: "Chairman & CEO of Jendo Innovations and Effective Solutions: advancing AI-enabled preventive healthcare and digital transformation.",
  },
  {
    src: "/media/hero/speaking-stage-hq.jpg",
    mobileSrc: "/media/hero/speaking-mobile-v2.jpg",
    desktopPosition: "object-[58%_30%]",
    mobilePosition: "object-[48%_18%]",
    eyebrow: "MedTech Founder & Technopreneur",
    title: "Recognised leadership in business and innovation",
    text: "From national awards to global fellowships: building ventures that turn research into real clinical and commercial impact.",
  },
  {
    src: "/media/gallery/speaking-hq.jpg",
    mobileSrc: "/media/publications/pub-mindfulness-a.jpg",
    desktopPosition: "object-[45%_28%]",
    mobilePosition: "object-[50%_16%]",
    eyebrow: "Speaker & Innovation Strategist",
    title: "Sharing the innovation journey on global stages",
    text: "Leading deep-tech ventures with measurable clinical and commercial impact: from research to breakthrough products.",
  },
  {
    src: "/media/hero/network-hq.jpg",
    mobileSrc: "/media/hero/network-hq.jpg",
    desktopPosition: "object-[50%_38%]",
    mobilePosition: "object-[48%_35%]",
    eyebrow: "Global network",
    title: "Partnerships that scale innovation",
    text: "Collaborating with institutions, investors, and industry leaders worldwide.",
  },
] as const;

const marqueeItems = [
  "Eisenhower Fellow 2026",
  "Chevening CRISP · Oxford",
  "US & Japan Patents",
  "ICT Leader of the Year 2025",
  "CEO of the Year 2022 · AI",
  "Young Innovator 2024",
  "JKX Winner 2016",
  "WIPO Global Case Study",
  "Commonwealth Digital Health",
];

const SLIDE_MS = 5500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(t);
  }, [reduce, paused]);

  const slide = slides[index];
  const marqueeRow = [...marqueeItems, ...marqueeItems];

  function goToSlide(next: number) {
    setPaused(true);
    setIndex(next);
  }

  return (
    <section className="relative flex h-[100svh] max-h-[100svh] min-h-[480px] flex-col overflow-hidden bg-[#0c0e0a] supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:max-h-[100dvh] max-[500px]:min-h-0">
      <div className="absolute inset-0 bg-[#0c0e0a]" aria-hidden />

      {slides.map((s, i) => {
        return (
          <motion.div
            key={s.eyebrow}
            className={`absolute inset-0 overflow-hidden ${
              i === index ? "z-[1]" : "z-0 pointer-events-none"
            }`}
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: 1,
            }}
            transition={{
              opacity: { duration: 1.05, ease: "easeInOut" },
            }}
            aria-hidden={i !== index}
          >
            {/* Full-bleed cover on every breakpoint, never letterbox */}
            <Image
              src={s.mobileSrc}
              alt=""
              fill
              priority={i === 0 || i === 1}
              className={`!h-full !w-full object-cover object-center md:hidden ${s.mobilePosition}`}
              sizes="100vw"
              quality={90}
            />
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0 || i === 1}
              className={`!h-full !w-full object-cover object-center hidden md:block ${s.desktopPosition}`}
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        );
      })}

      {/* Readable text without crushing the photo into black bars */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-black/20 to-black/15 md:from-black/68 md:via-black/22 md:to-black/20" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/45 via-black/12 to-transparent md:from-black/50 md:via-black/15" />

      <div className="relative z-[3] flex h-full min-h-0 flex-col">
        {/* Lower-third placement, balanced above the recognition bar, not floating mid-screen */}
        <div className="container-kk flex min-h-0 flex-1 flex-col justify-end pb-5 pt-[5rem] sm:pb-6 sm:pt-28 md:pb-9 md:pt-32 lg:pb-11">
          <motion.div
            key={slide.title}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-kk-accent drop-shadow sm:mb-3 sm:text-[0.68rem] md:mb-3.5 md:text-sm">
              {slide.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(1.5rem,5.6vw,3.55rem)] leading-[1.15] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
              {slide.title}
            </h1>
            <p className="mt-3.5 max-w-xl text-[0.84rem] font-normal leading-relaxed text-white/90 drop-shadow line-clamp-3 sm:mt-4 sm:line-clamp-none sm:text-[0.95rem] md:mt-5 md:text-lg md:leading-[1.65]">
              {slide.text}
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 flex w-full flex-col gap-2.5 sm:mt-6 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3 md:mt-7"
          >
            <Button href="/contact" showArrow className="w-full justify-center sm:w-auto">
              Get Appointment
            </Button>
            <Button
              href="/achievements"
              variant="secondary"
              className="w-full justify-center !border-white/40 !bg-white/15 !text-white backdrop-blur hover:!border-kk-accent hover:!text-kk-accent sm:w-auto"
            >
              View achievements
            </Button>
          </motion.div>

          <div className="mt-5 flex items-center gap-2 sm:mt-6 md:mt-7">
            {slides.map((s, i) => (
              <button
                key={s.src + s.eyebrow}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => goToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-9 bg-kk-accent sm:w-10" : "w-3.5 bg-white/50 hover:bg-white/80 sm:w-4"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative shrink-0 overflow-hidden border-t border-white/12 bg-black/45 backdrop-blur-xl"
        >
          {/* Soft top accent line */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kk-accent/70 to-transparent"
            aria-hidden
          />

          <div className="relative flex items-stretch">
            {/* Fixed label, stays while achievements scroll */}
            <div className="relative z-[2] hidden shrink-0 items-center border-r border-white/12 bg-white/6 px-5 sm:flex md:px-6">
              <p className="whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.22em] text-kk-accent">
                Recognition
              </p>
            </div>

            <div className="relative min-w-0 flex-1 overflow-hidden py-3.5 select-none sm:py-4">
              {/* Edge fades */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-black/55 to-transparent sm:w-16"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-black/55 to-transparent sm:w-16"
                aria-hidden
              />

              <div className="flex w-max animate-kk-marquee items-center gap-0 will-change-transform">
                {marqueeRow.map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="flex items-center gap-5 whitespace-nowrap px-5 sm:gap-7 sm:px-7"
                  >
                    <span className="text-[0.72rem] font-semibold tracking-[0.04em] text-white/78 sm:text-[0.84rem]">
                      {item}
                    </span>
                    <span
                      className="size-1.5 rotate-45 shrink-0 bg-kk-accent/90 shadow-[0_0_10px_rgba(241,130,0,0.45)]"
                      aria-hidden
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
