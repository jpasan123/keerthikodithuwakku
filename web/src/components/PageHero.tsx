import Image from "next/image";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  mobileImage,
  position = "object-center",
  mobilePosition,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  /** Optional mobile-specific asset so the focal person stays in frame */
  mobileImage?: string;
  position?: string;
  mobilePosition?: string;
}) {
  const mobileSrc = mobileImage ?? image;
  const mobilePos = mobilePosition ?? position;

  return (
    <section className="relative flex min-h-[48vh] items-end overflow-hidden bg-kk-ink md:min-h-[52vh]">
      {/* CSS-switched sources, no hydration flash, correct crop on first paint */}
      <Image
        src={mobileSrc}
        alt=""
        fill
        priority
        className={`!h-full !w-full object-cover md:hidden ${mobilePos}`}
        sizes="100vw"
        quality={90}
      />
      <Image
        src={image}
        alt=""
        fill
        priority
        className={`!h-full !w-full object-cover hidden md:block ${position}`}
        sizes="100vw"
        quality={90}
      />
      {/* Soft overlays, keep the landscape photo visible and sharp */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
      <div className="relative container-kk pb-16 pt-28 md:pb-24 md:pt-32">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-kk-accent mb-3">
            {eyebrow}
          </p>
          <h1 className="font-display max-w-3xl text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-white/90 leading-relaxed">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
