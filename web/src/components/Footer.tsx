import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.4-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.91h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M17.5 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.5L6.1 21H3.3l6.5-7.5L3 3h5.8l4 5.9L17.5 3zm-1 16.1h1.5L7.6 4.8H6L16.5 19.1z" />
    </svg>
  );
}

const socialBtn =
  "inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition hover:border-kk-accent/60 hover:bg-kk-accent/15 hover:text-kk-accent";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0c0e0a] text-white">
      {/* Atmosphere — soft depth, not flat white */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#151911] via-[#0c0e0a] to-[#0a0c08]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_15%_0%,rgba(241,130,0,0.18),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(255,255,255,0.04),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kk-accent/50 to-transparent"
        aria-hidden
      />

      <div className="container-kk relative py-14 md:py-16">
        <div className="grid gap-6 md:grid-cols-[1.35fr_1fr_1fr] md:gap-5">
          {/* Brand glass panel */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-7">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/media/brand/logo.png"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-xl object-cover ring-1 ring-white/15"
              />
              <span className="font-semibold text-white">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Biomedical innovator and MedTech founder building preventive healthcare
              solutions from Sri Lanka to the world.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { href: site.ventures.jendo, label: "Jendo" },
                { href: site.ventures.effectiveSolutions, label: "Effective Solutions" },
                { href: site.ventures.koding, label: "Koding" },
              ].map((v) => (
                <a
                  key={v.label}
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/75 backdrop-blur transition hover:border-kk-accent/50 hover:text-kk-accent"
                >
                  {v.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore glass panel */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-7">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-kk-accent">
              Explore
            </p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-kk-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact glass panel */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-7">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-kk-accent">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-kk-accent"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-kk-accent"
                >
                  {site.email}
                </a>
              </li>
              <li className="leading-relaxed text-white/60">{site.address}</li>
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialBtn}
              >
                <LinkedInIcon className="size-4" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={socialBtn}
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={site.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className={socialBtn}
              >
                <XIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/25 backdrop-blur-md">
        <div className="container-kk flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} {site.name}
          </p>
          <p className="tracking-wide">MedTech · Innovation · Leadership</p>
        </div>
      </div>
    </footer>
  );
}
