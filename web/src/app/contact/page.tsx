import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ConnectCTA } from "@/components/ConnectCTA";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { contactIntro, mapEmbedSrc } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Keerthi Kodithuwakku for appointments and collaborations.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start a conversation"
        description={contactIntro}
        image="/media/hero/speaking-stage.jpg"
        position="object-[70%_18%]"
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <Reveal>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-kk-surface text-kk-accent shrink-0">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-kk-ink">Phone</p>
                  <a
                    href={site.phoneHref}
                    className="text-kk-muted hover:text-kk-accent transition-colors"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-kk-surface text-kk-accent shrink-0">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-kk-ink">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-kk-muted hover:text-kk-accent transition-colors"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-kk-surface text-kk-accent shrink-0">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-kk-ink">Address</p>
                  <p className="text-kk-muted leading-relaxed">{site.address}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <p className="text-sm font-semibold text-kk-ink mb-3">Company sites</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href={site.ventures.jendo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-kk-muted hover:text-kk-accent transition-colors"
                  >
                    Jendo Innovations — jendo.health
                  </a>
                </li>
                <li>
                  <a
                    href={site.ventures.effectiveSolutions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-kk-muted hover:text-kk-accent transition-colors"
                  >
                    Effective Solutions — effectivesolutions.lk
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-kk-ink mb-3">Freelance & consulting</p>
              <a
                href={site.social.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#14A800]/35 bg-[#14A800]/5 px-4 py-2 text-sm font-semibold text-[#0f7a00] hover:bg-[#14A800]/10 transition-colors"
              >
                Find Keerthi on Upwork
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-kk-border bg-white p-6 md:p-8 shadow-sm">
              <h2 className="font-display text-2xl text-kk-ink mb-6">
                Send a message
              </h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section surface>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-kk-border shadow-sm">
            <iframe
              src={mapEmbedSrc}
              title="Location — Trace Expert City, Colombo"
              className="h-[420px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </Section>

      <ConnectCTA />
    </>
  );
}
