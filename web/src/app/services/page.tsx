import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConnectCTA } from "@/components/ConnectCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { ServiceIcon } from "@/components/ServiceIcon";
import { products, services, ventures } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Biomedical innovations, IoT technologies, research & development, and mentorship from Keerthi Kodithuwakku.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Transforming futures through technology"
        description="Four pillars of work: from medical devices and connected systems to research leadership and teaching the next generation."
        image="/media/gallery/kk-hq-01.jpg"
        position="object-[68%_28%]"
      />

      <Section>
        <div className="space-y-16 md:space-y-24">
          {services.map((service, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                <Reveal className={reverse ? "lg:order-2" : ""}>
                  <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-kk-border">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className={`object-cover ${
                        "imagePosition" in service && service.imagePosition
                          ? service.imagePosition
                          : "object-center"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.08} className={reverse ? "lg:order-1" : ""}>
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-kk-surface text-kk-accent mb-5">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <SectionHeading
                    eyebrow={`0${i + 1}`}
                    title={service.title}
                    description={service.body}
                  />
                  <p className="mt-4 text-sm font-medium text-kk-muted">{service.summary}</p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Section>

      <Section surface>
        <SectionHeading
          eyebrow="Products & innovations"
          title="Devices and systems built from the ground up"
          description="Two flagship innovations: patented MedTech hardware and Sri Lanka’s first mind-controlled drone."
        />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          {products.map((product, i) => {
            const external = "external" in product && product.external;
            return (
              <Reveal key={product.name} delay={i * 0.06}>
                <Link
                  href={product.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-kk-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-kk-accent/40 hover:shadow-xl hover:shadow-kk-ink/5"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden ${
                      "logo" in product && product.logo
                        ? "flex items-center justify-center bg-[#f4f5f2] p-10"
                        : "bg-kk-surface"
                    }`}
                  >
                    {"image" in product && product.image ? (
                      "logo" in product && product.logo ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={240}
                          height={240}
                          className="max-h-[9.5rem] w-auto object-contain transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-[1.05]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={90}
                        />
                      )
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-kk-accent">
                      {product.tagline}
                    </p>
                    <h3 className="mt-2 font-display text-[1.85rem] leading-tight text-kk-ink transition-colors group-hover:text-kk-accent">
                      {product.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-kk-muted md:text-[0.95rem]">
                      {product.body}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-kk-border bg-kk-surface px-3 py-1 text-xs font-semibold text-kk-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-kk-ink group-hover:text-kk-accent">
                      {external ? "Visit product site" : "Read the story"}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Platforms"
          title="Where the work ships"
          description="Explore the company sites powering MedTech and IoT delivery."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {ventures.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.05}>
              <Link
                href={v.href}
                target={v.href.startsWith("http") ? "_blank" : undefined}
                rel={v.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block rounded-3xl border border-kk-border bg-white p-6 hover:border-kk-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-kk-ink/5 transition-all duration-300"
              >
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-kk-accent">
                  {v.role}
                </p>
                <h3 className="mt-2 font-display text-2xl text-kk-ink group-hover:text-kk-accent transition-colors">
                  {v.name}
                </h3>
                <p className="mt-3 text-sm text-kk-muted leading-relaxed">
                  {v.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-kk-ink">
                  Visit <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <ConnectCTA />
    </>
  );
}
