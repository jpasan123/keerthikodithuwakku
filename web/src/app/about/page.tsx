import type { Metadata } from "next";
import Image from "next/image";
import { ConnectCTA } from "@/components/ConnectCTA";
import { MediaSlider } from "@/components/MediaSlider";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { VenturesShowcase } from "@/components/VenturesShowcase";
import { about, productShowcase, ventures } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: about.lead,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.lead}
        image="/media/hero/leadership-hq.jpg"
        position="object-[62%_18%]"
        mobileImage="/media/hero/about-keerthi-mobile.jpg"
        mobilePosition="object-[50%_12%]"
      />

      <Section>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <Reveal>
            <p className="text-lg text-kk-muted leading-relaxed">{about.lead2}</p>
            <p className="mt-5 text-kk-muted leading-relaxed">{about.oxford}</p>
            <ul className="mt-8 space-y-3">
              {about.education.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-kk-ink">
                  <span className="mt-1.5 size-1.5 rounded-full bg-kk-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-kk-border bg-kk-surface">
              <Image
                src="/media/hero/boardroom-hq.jpg"
                alt="Keerthi Kodithuwakku"
                fill
                className="object-cover object-[24%_32%]"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
                quality={88}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface>
        <SectionHeading
          eyebrow="Ventures"
          title="Companies building the next chapter"
          description="Jendo and Effective Solutions — MedTech and IoT platforms advancing Sri Lankan innovation globally."
        />
        <VenturesShowcase items={ventures} />
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <SectionHeading eyebrow="Mission" title="Dedicated to global innovation" />
            <p className="mt-4 text-kk-muted leading-relaxed">{about.mission}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading eyebrow="Values" title="Principles that shape the culture" />
            <p className="mt-4 text-kk-muted leading-relaxed">{about.values}</p>
          </Reveal>
        </div>
      </Section>

      <Section surface>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <MediaSlider items={productShowcase} />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading
              eyebrow="Journey"
              title="From vision to reality"
              description={about.journey}
            />
            <p className="mt-4 mb-6 text-sm text-kk-muted leading-relaxed">
              {about.journey2}
            </p>
            <ul className="space-y-3 text-sm text-kk-muted">
              {about.roles.map((role) => (
                <li key={role} className="flex gap-3">
                  <span className="mt-1 size-2 rounded-full bg-kk-accent shrink-0" />
                  {role}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <SectionHeading
              eyebrow="The origin story"
              title="Winning John Keells X — where Jendo began"
              description={about.jkxStory}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-kk-border">
              <Image
                src="/media/awards/jkx-victory.jpg"
                alt="Jendo team winning John Keells X 2016"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-kk-border">
              <Image
                src="/media/about/collaboration.jpg"
                alt="Strategic collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading
              eyebrow="Collaboration"
              title="Strengthening partnerships for innovation and growth"
              description={about.collaboration}
            />
          </Reveal>
        </div>
      </Section>

      <ConnectCTA />
    </>
  );
}
