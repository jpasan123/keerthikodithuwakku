import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ConnectCTA } from "@/components/ConnectCTA";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { TimelineFlow } from "@/components/TimelineFlow";
import { VideoCarousel } from "@/components/VideoCarousel";
import { achievements, featuredAwards, fellowships } from "@/lib/content";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Fellowships, awards, media, and milestones from Keerthi Kodithuwakku’s MedTech journey.",
};

export default function AchievementsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-kk-ink min-h-[46vh] flex items-end">
        <Image
          src="/media/hero/award-stage.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[45%_30%]"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/8" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        <div className="relative container-kk pb-20 pt-28 md:pb-28 md:pt-32">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-kk-accent mb-3">
              Achievements
            </p>
            <h1 className="font-display max-w-3xl text-4xl md:text-6xl leading-[1.08] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
              Recognition built on research, patents, and impact
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 leading-relaxed">
              From national ICT awards to global fellowships — a timeline of
              milestones that reflect sustained innovation leadership.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-kk-border bg-white p-5 hover:border-kk-accent/40 transition-colors">
                <p className="font-display text-3xl md:text-4xl text-kk-ink">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 text-sm text-kk-muted leading-snug">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <SectionHeading
          eyebrow="Fellowships"
          title="Featured global programmes"
        />
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          {fellowships.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="group h-full overflow-hidden rounded-3xl border border-kk-border bg-white hover:shadow-xl hover:shadow-kk-ink/5 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-kk-accent">
                    {item.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-kk-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-kk-muted leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section surface>
        <SectionHeading
          eyebrow="Featured awards"
          title="National and global honors"
          description="Landmark recognitions across intellectual property, ICT leadership, and MedTech innovation."
        />
        <div className="space-y-6">
          {featuredAwards.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.04}>
              <article className="grid md:grid-cols-[minmax(0,380px)_1fr] overflow-hidden rounded-3xl border border-kk-border bg-white">
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[240px]">
                  <Image
                    src={award.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-kk-accent">
                    {award.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl text-kk-ink">
                    {award.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-kk-muted leading-relaxed">
                    {award.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Timeline"
          title="Awards and milestones by year"
          description="A numbered path through fellowships, awards, and global programmes."
        />
        <TimelineFlow groups={achievements.timeline} />
      </Section>

      <Section surface id="media">
        <SectionHeading
          eyebrow="Media"
          title="Television and interview features"
          description="Compact player — muted autoplay on arrival, then advances. Hover to pause; unmute with YouTube controls."
        />
        <VideoCarousel videos={achievements.videos} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Publications"
          title="Peer-reviewed research and global case studies"
          description="Published work spanning IEEE, PubMed, ResearchGate, and WIPO."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.publications.map((pub, i) => (
            <Reveal key={pub.href} delay={(i % 3) * 0.05}>
              <a
                href={pub.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-kk-border bg-white hover:border-kk-accent/50 hover:shadow-lg hover:shadow-kk-ink/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-kk-surface">
                  <Image
                    src={pub.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-kk-accent">
                    {pub.source}
                  </p>
                  <h3 className="mt-2 font-semibold text-kk-ink leading-snug group-hover:text-kk-accent transition-colors">
                    {pub.title}
                  </h3>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-kk-ink">
                    View publication{" "}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <ConnectCTA />
    </>
  );
}
