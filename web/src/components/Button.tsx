import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-kk-accent text-white hover:bg-kk-accent-hover shadow-[0_10px_24px_rgba(241,130,0,0.28)]",
  secondary:
    "bg-white text-kk-ink border border-kk-border hover:border-kk-accent hover:text-kk-accent",
  ghost: "bg-transparent text-kk-ink hover:text-kk-accent",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  showArrow = false,
  external = false,
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        {showArrow ? <ArrowRight className="size-4" aria-hidden /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {showArrow ? <ArrowRight className="size-4" aria-hidden /> : null}
    </Link>
  );
}
