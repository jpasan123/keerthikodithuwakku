import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  surface?: boolean;
};

export function Section({
  children,
  className = "",
  id,
  surface = false,
}: Props) {
  return (
    <section
      id={id}
      className={`py-12 sm:py-16 md:py-24 ${surface ? "bg-kk-surface" : "bg-kk-bg"} ${className}`}
    >
      <div className="container-kk">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-8 max-w-2xl sm:mb-10 md:mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="mb-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-kk-accent sm:mb-3 sm:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[1.55rem] leading-[1.2] text-kk-ink sm:text-[1.85rem] md:text-[2.35rem] lg:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base md:text-lg text-kk-muted leading-[1.65]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
