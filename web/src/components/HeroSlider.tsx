"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./Button";

/**
 * Each slide carries a desktop (cinematic landscape) image AND a
 * mobile image where Keerthi is centered — so tall phones never crop
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
    text: "Chairman & CEO of Jendo Innovations and Effective Solutions — advancing AI-enabled preventive healthcare and digital transformation.",
  },
  {
    src: "/media/hero/business-best-hq.jpg",
    mobileSrc: "/media/hero/business-mobile-v4.jpg",
    desktopPosition: "object-[74%_26%]",
    mobilePosition: "object-[55%_20%]",
    eyebrow: "MedTech Founder & Technopreneur",
    title: "Recognised leadership in business and innovation",
    text: "From national awards to global fellowships — building ventures that turn research into real clinical and commercial impact.",
  },
  {
    src: "/media/hero/speaking-stage-hq.jpg",
    mobileSrc: "/media/hero/speaking-mobile-v2.jpg",
    desktopPosition: "object-[58%_32%]",
    mobilePosition: "object-[48%_16%]",
    eyebrow: "Speaker & Innovation Strategist",
    title: "Sharing the innovation journey on global stages",
    text: "Leading deep-tech ventures with measurable clinical and commercial impact — from research to breakthrough products.",
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
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(t);
  }, [reduce]);

  const slide = slides[index];
  const marqueeRow = [...marqueeItems, ...marqueeItems];
  // Ken Burns zooms and crops more — keep it desktop-only
  const kenBurns = !reduce && !isMobile;

  return (
    <section className="relative flex h-[100svh] max-h-[100svh] min-h-[480px] flex-col overflow-hidden bg-[#0c0e0a] supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:max-h-[100dvh] max-[500px]:min-h-0">
      <div className="absolute inset-0 bg-[#0c0e0a]" aria-hidden />

      {slides.map((s, i) => {
        return (
          <motion.div
            key={s.eyebrow}
            className={`absolute inset-0 ${
              i === index ? "z-[1]" : "z-0 pointer-events-none"
            }`}
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index && kenBurns ? 1.035 : 1,
            }}
            transition={{
              opacity: { duration: 1.05, ease: "easeInOut" },
              scale: { duration: SLIDE_MS / 1000, ease: "linear" },
            }}
            aria-hidden={i !== index}
          >
            {/* Mobile-first asset — correct crop on first paint, no hydration flash */}
            <Image
              src={s.mobileSrc}
              alt=""
              fill
              priority={i === 0}
              className={`object-cover md:hidden ${s.mobilePosition}`}
              sizes="(max-width: 767px) 200vw, 100vw"
              quality={100}
            />
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              className={`object-cover hidden md:block ${s.desktopPosition}`}
              sizes="100vw"
              quality={95}
            />
          </motion.div>
        );
      })}

      {/* Lighter overlays on mobile so the hero photo stays sharp and readable */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/72 via-black/18 to-black/10 md:from-black/75 md:via-black/30 md:to-black/25" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/40 via-black/10 to-transparent md:from-black/60 md:via-black/25" />

      <div className="relative z-[3] flex h-full min-h-0 flex-col">
        {/* Content sits higher with clearer vertical rhythm — not stacked at the bottom */}
        <div className="container-kk flex min-h-0 flex-1 flex-col justify-end pb-5 pt-[5.25rem] sm:pb-7 sm:pt-28 md:justify-center md:pb-20 md:pt-28 lg:pb-24">
          <motion.div
            key={slide.title}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-kk-accent drop-shadow sm:mb-3.5 sm:text-[0.68rem] md:mb-4 md:text-sm">
              {slide.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(1.55rem,6.2vw,4.1rem)] leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-xl text-[0.84rem] leading-relaxed text-white/92 drop-shadow line-clamp-3 sm:mt-5 sm:line-clamp-none sm:text-[0.95rem] md:mt-6 md:text-lg md:leading-relaxed">
              {slide.text}
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex w-full flex-col gap-2.5 sm:mt-7 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3 md:mt-9"
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

          <div className="mt-6 flex items-center gap-2 sm:mt-7 md:mt-9">
            {slides.map((s, i) => (
              <button
                key={s.src + s.eyebrow}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
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
            {/* Fixed label — stays while achievements scroll */}
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
