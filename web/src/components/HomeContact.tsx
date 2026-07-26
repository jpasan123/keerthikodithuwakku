"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./Section";
import { mapEmbedSrc } from "@/lib/content";
import { site } from "@/lib/site";

export function HomeContact() {
  return (
    <Section surface id="contact-home">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contact, appointments & collaborations"
        description="Send a message or visit us at Trace Expert City — we respond to partnership, speaking, and venture inquiries."
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <div className="flex h-full flex-col rounded-[28px] border border-kk-border bg-white p-6 shadow-sm md:p-8">
            <h3 className="font-display text-2xl text-kk-ink md:text-[1.75rem]">
              Send a message
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-kk-muted">
              Send your details securely — the inquiry goes directly to Keerthi&apos;s office.
            </p>
            <div className="mt-6 flex-1">
              <ContactForm />
            </div>

            <ul className="mt-8 grid gap-4 border-t border-kk-border pt-6 sm:grid-cols-1">
              <li className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-kk-surface text-kk-accent">
                  <Phone className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-kk-muted">
                    Phone
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-0.5 block text-sm font-semibold text-kk-ink hover:text-kk-accent"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-kk-surface text-kk-accent">
                  <Mail className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-kk-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-0.5 block text-sm font-semibold text-kk-ink hover:text-kk-accent break-all"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-kk-surface text-kk-accent">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-kk-muted">
                    Address
                  </p>
                  <p className="mt-0.5 text-sm font-semibold leading-relaxed text-kk-ink">
                    {site.address}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-kk-border bg-white shadow-sm">
            <div className="border-b border-kk-border px-6 py-5 md:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-kk-accent">
                Location
              </p>
              <h3 className="mt-1 font-display text-2xl text-kk-ink">
                Trace Expert City, Colombo
              </h3>
              <p className="mt-1.5 text-sm text-kk-muted">
                Bay X · AC19 — open for meetings by appointment.
              </p>
            </div>
            <div className="relative min-h-[320px] flex-1 md:min-h-[420px]">
              <iframe
                src={mapEmbedSrc}
                title="Location — Trace Expert City, Colombo"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
