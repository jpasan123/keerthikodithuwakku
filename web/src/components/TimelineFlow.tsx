"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

type Group = {
  year: string;
  items: readonly string[];
};

export function TimelineFlow({ groups }: { groups: readonly Group[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="pointer-events-none absolute bottom-2 left-[1.15rem] top-2 w-px bg-gradient-to-b from-kk-accent via-kk-accent/40 to-kk-border md:left-8" />

      <div className="space-y-10 md:space-y-14">
        {groups.map((group, gi) => (
          <div key={group.year} className="relative pl-12 md:pl-20">
            <motion.span
              className="absolute left-2.5 top-3 size-3.5 rounded-full bg-kk-accent shadow-sm ring-[5px] ring-kk-bg md:left-6"
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="rounded-2xl border border-kk-border bg-white p-5 shadow-sm md:p-7"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <p className="font-display text-2xl text-kk-accent md:text-3xl">
                  {group.year}
                </p>
                <span className="h-px min-w-[40px] flex-1 bg-kk-border" />
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-kk-muted">
                  {group.items.length} milestones
                </p>
              </div>

              <ol className="space-y-0">
                {group.items.map((item, ii) => (
                  <motion.li
                    key={`${group.year}-${item}`}
                    className="relative flex gap-3 pb-4 last:pb-0"
                    initial={reduce ? false : { opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.7, margin: "-40px 0px -10% 0px" }}
                    transition={{
                      duration: 0.45,
                      delay: reduce ? 0 : Math.min(ii * 0.05, 0.35),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ii < group.items.length - 1 ? (
                      <span className="absolute bottom-0 left-[13px] top-7 w-px bg-kk-border" />
                    ) : null}
                    <span className="relative z-[1] mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-kk-accent/30 bg-kk-accent/5 text-[11px] font-bold text-kk-accent">
                      {ii + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-kk-muted md:text-base">
                      {item}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            {gi < groups.length - 1 ? (
              <motion.div
                className="mt-5 flex items-center gap-2 pl-1 text-kk-accent"
                initial={reduce ? false : { opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <motion.span
                  animate={reduce ? undefined : { y: [0, 5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="size-4" />
                </motion.span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-kk-muted">
                  Next year
                </span>
              </motion.div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
