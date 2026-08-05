"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  LinkedInIcon,
} from "@/components/SocialIcons";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";
import { site } from "@/lib/site";

const STORAGE_KEY = "kk_social_popup_seen_v8";

export function SocialPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    setOpen(true);
  }, [pathname]);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    lockPageScroll();
    window.addEventListener("keydown", onKey);
    return () => {
      unlockPageScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const links = [
    {
      href: site.social.linkedin,
      label: "LinkedIn",
      icon: LinkedInIcon,
    },
    {
      href: site.social.facebook,
      label: "Facebook",
      icon: FacebookIcon,
    },
  ] as const;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kk-social-title"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#0c0e0a]/60 backdrop-blur-[10px]"
        onClick={dismiss}
      />

      <div className="relative z-10 w-full max-w-[400px] overflow-hidden rounded-[26px] bg-white shadow-[0_40px_100px_rgba(12,14,10,0.28)] ring-1 ring-kk-ink/8 animate-[kk-popup-in_0.42s_cubic-bezier(0.22,1,0.36,1)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(ellipse_at_top,rgba(241,130,0,0.14),transparent_70%)]" />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close popup"
          className="absolute top-4 right-4 z-20 inline-flex size-9 items-center justify-center rounded-full border border-kk-border/80 bg-white/90 text-kk-muted shadow-sm backdrop-blur transition hover:border-kk-ink/20 hover:text-kk-ink"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative px-8 pb-8 pt-10 text-center">
          <div className="mx-auto relative size-[104px] overflow-hidden rounded-full bg-kk-surface ring-[3px] ring-kk-accent/35 shadow-[0_12px_36px_rgba(12,14,10,0.16)]">
            <Image
              src="/media/portraits/social-avatar.jpg"
              alt="Keerthi Kodithuwakku"
              fill
              className="object-cover object-[50%_18%]"
              sizes="208px"
              quality={95}
              priority
            />
          </div>

          <p className="mt-5 text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-kk-accent">
            Connect
          </p>
          <h2
            id="kk-social-title"
            className="mt-2 font-display text-[1.7rem] leading-[1.15] tracking-[-0.02em] text-kk-ink"
          >
            {site.name}
          </h2>
          <p className="mx-auto mt-3 max-w-[280px] text-[0.95rem] leading-relaxed text-kk-muted">
            MedTech leadership, patents, and global collaborations.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex size-12 items-center justify-center rounded-full border border-kk-border bg-kk-surface text-kk-ink transition hover:border-kk-accent/50 hover:bg-kk-accent hover:text-white"
                >
                  <Icon className="size-[1.15rem]" />
                </a>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-full bg-kk-accent px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(241,130,0,0.28)] transition hover:bg-kk-accent-hover"
            >
              Get Appointment
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="text-sm font-medium text-kk-muted transition-colors hover:text-kk-ink py-1"
            >
              Continue to site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
