"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showName = !scrolled;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <motion.div
          layout={!reduce}
          className={`pointer-events-auto mx-auto flex w-full items-center justify-between rounded-full border shadow-[0_10px_40px_rgba(12,14,10,0.18)] backdrop-blur-2xl transition-[max-width,padding,background-color,gap] duration-500 lg:w-fit ${
            scrolled
              ? "max-w-[calc(100%-1.5rem)] gap-2 border-white/25 bg-[rgba(18,21,15,0.7)] px-2 py-1.5 sm:gap-2.5 sm:px-2.5 sm:py-2 lg:max-w-none"
              : "max-w-none gap-2 border-white/20 bg-[rgba(18,21,15,0.5)] px-2.5 py-2 sm:gap-3 sm:px-4 sm:py-2.5 lg:max-w-5xl"
          }`}
        >
          <Link
            href="/"
            aria-label={site.name}
            className={`group flex min-w-0 shrink items-center ${
              scrolled ? "gap-0" : "gap-2.5 sm:gap-3"
            }`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/media/brand/logo.png"
              alt=""
              width={40}
              height={40}
              className={`shrink-0 rounded-xl object-cover ring-1 ring-white/20 transition-all duration-300 ${
                scrolled ? "size-8 sm:size-9" : "size-9 sm:size-10"
              }`}
              priority
            />
            {showName ? (
              <span className="hidden truncate font-semibold text-white/95 transition-colors group-hover:text-kk-accent lg:inline lg:text-[0.95rem] 2xl:text-base">
                {site.name}
              </span>
            ) : null}
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-kk-accent text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={`flex shrink-0 items-center ${scrolled ? "gap-1.5" : "gap-2"}`}>
            <Link
              href="/contact"
              className="hidden items-center gap-1.5 rounded-full bg-kk-accent px-3.5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(241,130,0,0.35)] transition hover:bg-kk-accent-hover md:inline-flex lg:px-4"
            >
              Get Appointment
              <ArrowUpRight className="size-3.5" />
            </Link>

            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:border-kk-accent/50 hover:bg-kk-accent hover:text-white lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="size-5" strokeWidth={2.25} />
              ) : (
                <Menu className="size-5" strokeWidth={2.25} />
              )}
            </button>
          </div>
        </motion.div>

        {/* Mobile menu, slides down from the header bar */}
        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-nav"
              className="pointer-events-auto mx-auto mt-2 w-full overflow-hidden rounded-3xl border border-white/15 bg-[#12150f]/95 shadow-2xl backdrop-blur-2xl lg:hidden"
              initial={reduce ? false : { opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={reduce ? undefined : { opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <nav className="flex flex-col gap-1 px-3 py-3" aria-label="Mobile">
                {nav.map((item, i) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 + i * 0.04, duration: 0.24 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors ${
                          active
                            ? "bg-kk-accent text-white"
                            : "text-white/85 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {item.label}
                        <ArrowUpRight
                          className={`size-4 ${active ? "opacity-90" : "opacity-35"}`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="border-t border-white/10 px-3 py-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-kk-accent px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(241,130,0,0.32)] transition hover:bg-kk-accent-hover"
                >
                  Get Appointment
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Dim overlay when mobile menu is open */}
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
