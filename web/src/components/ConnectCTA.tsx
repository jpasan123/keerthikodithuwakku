"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { site } from "@/lib/site";

/** Wide, clean landscapes only, no close-up faces / cutout stage composites */
const backgrounds = [
  {
    src: "/media/gallery/boardroom-hq.jpg",
    position: "object-center",
    label: "Leadership",
  },
  {
    src: "/media/hero/network-hq.jpg",
    position: "object-[50%_40%]",
    label: "Network",
  },
  {
    src: "/media/gallery/team-hq-02.jpg",
    position: "object-[50%_35%]",
    label: "Team",
  },
  {
    src: "/media/hero/leadership-hq2.jpg",
    position: "object-[55%_30%]",
    label: "Ventures",
  },
] as const;

export function ConnectCTA() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const bg = backgrounds[index];

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % backgrounds.length);
    }, 5200);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <section className="relative bg-kk-ink">
      {/* Soft blend into dark glass footer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-gradient-to-b from-transparent to-[#0c0e0a]/80"
        aria-hidden
      />
      <div className="grid lg:grid-cols-2 min-h-0 lg:min-h-[420px]">
        {/* Copy panel, always readable, never fighting a cropped face */}
        <div className="relative order-2 lg:order-1 flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#12150f] via-[#1a1f16] to-[#2a2418]" />
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_20%,rgba(241,130,0,0.22),transparent_55%)]" />

          <div className="relative w-full px-5 py-12 sm:px-8 sm:py-14 md:px-12 lg:py-16">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-kk-accent mb-3">
              Connect with us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-white leading-[1.12] max-w-lg">
              Ready to innovate your business?
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/88 leading-relaxed max-w-md">
              Reach out for partnerships, speaking engagements, research
              collaborations, or an introduction to Jendo and Effective Solutions.
            </p>
            <div className="mt-7 sm:mt-8 flex flex-wrap gap-3">
              <Button href="/contact" showArrow>
                Get Appointment
              </Button>
              <Button
                href={site.social.linkedin}
                external
                variant="secondary"
                className="!bg-white/12 !text-white !border-white/30 hover:!border-kk-accent hover:!text-kk-accent backdrop-blur"
              >
                LinkedIn
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-2">
              {backgrounds.map((b, i) => (
                <button
                  key={b.src}
                  type="button"
                  aria-label={`Show ${b.label} image`}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? "w-8 bg-kk-accent" : "w-3 bg-white/35 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Image panel, fixed aspect so subjects are not sliced by a short banner */}
        <div className="relative order-1 lg:order-2 aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:min-h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={bg.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={bg.src}
                alt=""
                fill
                className={`object-cover ${bg.position}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/20" />
        </div>
      </div>
    </section>
  );
}
