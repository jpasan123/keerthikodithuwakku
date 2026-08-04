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
    <section className="relative flex min-h-[48vh] items-end overflow-hidden bg-[#0c0e0a] md:min-h-[54vh]">
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

      {/* Deep scrims so copy always reads on busy event photos */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/25 md:from-black/90 md:via-black/50 md:to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(241,130,0,0.14),transparent_55%)]" />

      <div className="relative container-kk pb-16 pt-28 md:pb-24 md:pt-36">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">
            <span className="inline-block h-px w-7 shrink-0 bg-kk-accent sm:w-9" aria-hidden />
            <span className="text-kk-accent">{eyebrow}</span>
          </p>
          <h1 className="font-display max-w-3xl text-[2rem] leading-[1.18] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-[1.65] text-white/88 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
