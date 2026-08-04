import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConnectCTA } from "@/components/ConnectCTA";
import { Counter } from "@/components/Counter";
import { FeaturedStories } from "@/components/FeaturedStories";
import { InfiniteGallery } from "@/components/InfiniteGallery";
import { HeroSlider } from "@/components/HeroSlider";
import { HomeContact } from "@/components/HomeContact";
import { RecognitionSlider } from "@/components/RecognitionSlider";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { ServiceIcon } from "@/components/ServiceIcon";
import { VenturesShowcase } from "@/components/VenturesShowcase";
import { VideoCarousel } from "@/components/VideoCarousel";
import { getPostBySlug } from "@/lib/blog";
import {
  about,
  achievements,
  featuredStorySlugs,
  gallery,
  recognition,
  heroStats,
  highlights,
  services,
  uvp,
  ventures,
} from "@/lib/content";

/**
 * Founder-site information architecture (no repeated stories):
 * Hero → Proof stats → Latest recognition → About → Ventures →
 * Value → Expertise → Partnerships → Media → Insights (once) → Contact
 */
export default function HomePage() {
  const featuredStories = featuredStorySlugs
    .map((item) => {
      const post = getPostBySlug(item.slug);
      if (!post) return null;
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        image: item.image || post.image,
        href: `/blog/${post.slug}`,
        cta: item.cta,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <HeroSlider />

      <Section>
        <div className="grid grid-cols-2 gap-6 border-y border-kk-border py-10 md:grid-cols-4 md:gap-8">
          {heroStats.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <p className="font-display text-3xl text-kk-ink md:text-4xl">
                <Counter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-1.5 text-sm leading-snug text-kk-muted">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 1) Latest recognition, featured slider (one story at a time) */}
      <Section surface>
        <SectionHeading
          eyebrow="Recognition"
          title="Latest recognitions shaping the next chapter"
        />
        <RecognitionSlider items={recognition} />
      </Section>

      {/* 2) About teaser */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] rounded-t-[45%] border border-kk-border bg-kk-border shadow-lg md:max-w-none">
              <Image
                src="/media/about/pioneers.png"
                alt="Keerthi Kodithuwakku: biomedical innovation leadership"
                fill
                className="object-cover object-[50%_20%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-kk-accent">
              About
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-kk-ink md:text-4xl lg:text-[2.6rem]">
              Pioneers in biomedical innovation
            </h2>
            <span className="mt-4 block h-1 w-14 rounded-full bg-kk-accent" />
            <p className="mt-5 text-base leading-relaxed text-kk-muted md:text-lg">
              {about.lead}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-kk-accent px-6 py-2.5 text-sm font-semibold text-kk-accent transition hover:bg-kk-accent hover:text-white"
            >
              Learn more
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 3) Ventures */}
      <Section surface>
        <SectionHeading
          eyebrow="Ventures"
          title="Jendo · Effective Solutions"
          description="Two companies spanning AI MedTech and IoT digital transformation."
        />
        <VenturesShowcase items={ventures} />
      </Section>

      {/* 4) Value props */}
      <Section>
        <SectionHeading
          eyebrow="Why work with us"
          title={
            <>
              What the <em className="italic font-normal">complete</em> engagement
              offers.
            </>
          }
          description="Strategy, technology, and leadership support: built the way high-growth founders expect to work."
        />
        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {uvp.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-kk-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-kk-accent/35 hover:shadow-xl hover:shadow-kk-ink/8"
              >
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-[5/4]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={92}
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-kk-accent">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2.5 text-xl font-semibold text-kk-ink md:text-[1.35rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-kk-muted">
                    {item.body}
                  </p>
                  <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-kk-border bg-kk-surface px-4 py-2 text-sm font-semibold text-kk-ink transition-colors group-hover:border-kk-accent group-hover:bg-kk-accent group-hover:text-white">
                    View details
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5) Expertise, numbered services once */}
      <Section surface>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Expertise"
              title="Comprehensive solutions in biomedical and IoT technology"
              description="From AI-enabled screening to IoT platforms for clinics, enterprises, and public programmes."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group block h-full rounded-2xl border border-kk-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-kk-accent/45 hover:shadow-lg hover:shadow-kk-ink/5"
                >
                  <p className="font-display text-2xl text-kk-accent">
                    {String(i + 1).padStart(2, "0")}.
                  </p>
                  <h3 className="mt-2 flex items-center gap-2 font-semibold text-kk-ink">
                    <ServiceIcon name={service.icon} className="size-4 text-kk-accent" />
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-kk-muted">
                    {service.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-kk-accent">
                    Learn more
                    <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 6) Partnerships */}
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-kk-border">
              <Image
                src="/media/gallery/event-hq-01.jpg"
                alt="Strategic collaborations for national development"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-kk-accent">
              Partnerships
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-kk-ink md:text-4xl">
              Strategic collaborations for national development
            </h2>
            <p className="mt-5 text-base leading-relaxed text-kk-muted md:text-lg">
              {about.collaboration}
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-kk-accent px-6 py-2.5 text-sm font-semibold text-kk-accent transition hover:bg-kk-accent hover:text-white"
            >
              Learn more
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 7) Media proof, gallery + video (different formats, not blog repeats) */}
      <Section surface>
        <SectionHeading
          eyebrow="Gallery"
          title="Leadership and collaboration in focus"
          description="A continuous reel of selected moments — hover to pause, click to view full size."
        />
        <InfiniteGallery items={gallery} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="On camera"
          title="Television, interviews & programme features"
          description="Muted autoplay on arrival, then advances. Hover to pause."
        />
        <VideoCarousel videos={achievements.videos} />
      </Section>

      {/* 8) Speaking highlights, no fellowship/alumni overlap */}
      <Section surface>
        <SectionHeading
          eyebrow="Impact"
          title="Selected speaking & programme moments"
          description="Distinct from fellowships and blog stories: conference and workshop highlights."
        />
        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-kk-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-kk-accent/35 hover:shadow-xl hover:shadow-kk-ink/8"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={90}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-snug text-kk-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-kk-muted">
                    {item.excerpt}
                  </p>
                  <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-kk-accent">
                    View archive
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9) Blog once, excludes Recognition stories */}
      <Section>
        <SectionHeading
          eyebrow="Insights"
          title="Latest from the blog"
          description="Awards, alumni leadership, regulatory journeys, and venture milestones: shown once here."
        />
        <FeaturedStories items={featuredStories} />
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-kk-ink transition hover:text-kk-accent"
          >
            View all posts
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Section>

      <HomeContact />
      <ConnectCTA />
    </>
  );
}
