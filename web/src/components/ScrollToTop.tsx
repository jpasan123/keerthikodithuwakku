"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="scroll-top"
          type="button"
          aria-label="Scroll to top"
          onClick={scrollUp}
          initial={reduce ? false : { opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-3 z-[85] flex size-11 items-center justify-center rounded-full border border-kk-border bg-white/95 text-kk-ink shadow-lg shadow-kk-ink/10 backdrop-blur transition hover:border-kk-accent hover:bg-kk-accent hover:text-white sm:left-6 sm:size-12"
        >
          <ArrowUp className="size-5" strokeWidth={2.25} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
