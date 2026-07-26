"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  LinkedInIcon,
  PlayMediaIcon,
  XIcon,
} from "@/components/SocialIcons";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";
import { site } from "@/lib/site";

const STORAGE_KEY = "kk_social_popup_seen_v7";

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
      tone: "bg-[#0A66C2] text-white hover:bg-[#0958a8]",
      external: true,
    },
    {
      href: site.social.facebook,
      label: "Facebook",
      icon: FacebookIcon,
      tone: "bg-[#1877F2] text-white hover:bg-[#1464cf]",
      external: true,
    },
    {
      href: site.social.x,
      label: "X",
      icon: XIcon,
      tone: "bg-kk-ink text-white hover:bg-black",
      external: true,
    },
    {
      href: "/achievements#media",
      label: "Watch media",
      icon: PlayMediaIcon,
      tone: "bg-[#FF0033] text-white hover:bg-[#e0002d]",
      external: false,
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
        className="absolute inset-0 bg-kk-ink/55 backdrop-blur-md"
        onClick={dismiss}
      />
      <div className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[28px] bg-white shadow-[0_32px_90px_rgba(15,23,42,0.32)] ring-1 ring-kk-ink/8 animate-[kk-popup-in_0.4s_cubic-bezier(0.22,1,0.36,1)]">
        <div className="relative h-28 bg-gradient-to-br from-kk-ink via-[#1c2118] to-kk-accent/80">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(241,130,0,0.55),transparent_55%)]" />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close popup"
            className="absolute top-3.5 right-3.5 inline-flex size-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="relative px-7 pb-7 pt-0 text-center -mt-14">
          <div className="mx-auto relative size-[112px] overflow-hidden rounded-full ring-4 ring-white shadow-lg">
            <Image
              src="/media/portraits/social-avatar.jpg"
              alt="Keerthi Kodithuwakku"
              fill
              className="object-cover object-[50%_20%]"
              sizes="(max-width: 768px) 224px, 224px"
              quality={95}
              priority
            />
          </div>

          <p className="mt-4 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-kk-accent">
            Stay connected
          </p>
          <h2 id="kk-social-title" className="mt-1 font-display text-[1.85rem] leading-tight text-kk-ink">
            Follow Keerthi
          </h2>
          <p className="mt-2.5 text-sm text-kk-muted leading-relaxed">
            MedTech leadership, patents, and global collaborations — join the network.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {links.map((item) => {
              const Icon = item.icon;
              const className = `inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-3.5 text-sm font-semibold shadow-sm transition-colors ${item.tone}`;
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={dismiss}
                  className={className}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-full bg-kk-accent px-5 py-3 text-sm font-semibold text-white hover:bg-kk-accent-hover transition-colors"
            >
              Get Appointment
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="text-sm font-medium text-kk-muted hover:text-kk-ink transition-colors py-2"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
