"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  type CSSProperties,
  type FocusEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  accent?: string;
  initials?: string;
  stat?: string;
  image?: string;
  href?: string;
}

interface OrbitCardStackProps {
  items: OrbitStackItem[];
  className?: string;
  cardClassName?: string;
  defaultActiveIndex?: number;
  onActiveChange?: (item: OrbitStackItem, index: number) => void;
}

function inRange(index: number, length: number) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function initialsFor(item: OrbitStackItem) {
  return (
    item.initials ??
    item.name
      .split(/\s+/)
      .map((part) => part.at(0))
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );
}

function useViewport() {
  const [width, setWidth] = useState(1280);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

function CardImage({ item }: { item: OrbitStackItem }) {
  const initials = initialsFor(item);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.15rem] bg-kk-surface">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 360px"
          quality={72}
        />
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,#f18200,transparent_24%)] opacity-35"
          aria-hidden
        />
      )}
      <span className="absolute bottom-3 right-3 rounded-full bg-kk-ink/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.14em] text-white">
        {initials}
      </span>
    </div>
  );
}

function CardBody({ item }: { item: OrbitStackItem }) {
  return (
    <>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-kk-accent">
        {item.role}
      </p>
      <h3 className="mt-2 font-display text-[1.2rem] leading-[1.25] tracking-[-0.02em] text-kk-ink sm:text-[1.28rem] md:text-[1.35rem]">
        {item.name}
      </h3>
      <p className="mt-2.5 line-clamp-3 text-[0.9rem] leading-[1.5] text-kk-muted">
        {item.description}
      </p>
      {item.href ? (
        <Link
          href={item.href}
          className="mt-4 inline-flex items-center gap-1.5 border-t border-kk-border pt-3.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-kk-accent transition hover:text-kk-accent-hover"
          onClick={(event) => event.stopPropagation()}
        >
          {item.stat ?? "View archive"}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      ) : (
        <div className="mt-4 border-t border-kk-border pt-3.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-kk-muted">
          {item.stat ?? "Profile"}
        </div>
      )}
    </>
  );
}

function MobileCarousel({ items }: { items: OrbitStackItem[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto overscroll-x-contain pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
      {items.map((item) => (
        <article
          key={item.name}
          className="flex w-[min(86vw,22rem)] shrink-0 snap-center flex-col rounded-[1.6rem] border border-kk-border bg-white p-4 shadow-sm"
        >
          <div className="relative">
            <CardImage item={item} />
            {item.href ? (
              <Link
                href={item.href}
                aria-label={`View archive: ${item.name}`}
                className="absolute right-2.5 top-2.5 grid size-10 place-items-center rounded-full bg-kk-ink text-white shadow-md transition hover:bg-kk-accent"
              >
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            ) : null}
          </div>
          <div className="pt-4">
            <CardBody item={item} />
          </div>
        </article>
      ))}
    </div>
  );
}

function DesktopOrbit({
  items,
  className,
  cardClassName,
  defaultActiveIndex = 1,
  onActiveChange,
}: OrbitCardStackProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const restingIndex = inRange(defaultActiveIndex ?? 1, items.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [hovered, setHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const midpoint = (items.length - 1) / 2;
  const width = useViewport();

  const spread = width < 1280 ? 220 : 268;
  const lift = 22;
  const cardWidth = width < 1280 ? "min(40vw, 22rem)" : "24rem";
  const stageHeight = width < 1280 ? 460 : 478;

  const layouts = useMemo(
    () =>
      items.map((_, index) => {
        const orbit = index - midpoint;
        return {
          open: {
            x: orbit * spread,
            y: Math.abs(orbit) * 10,
            rotation: orbit * 4.5,
          },
        };
      }),
    [items, midpoint, spread],
  );

  const activate = (index: number) => {
    const next = inRange(index, items.length);
    setHovered(true);
    setActiveIndex(next);
    onActiveChange?.(items[next]!, next);
  };

  const close = () => {
    setHovered(false);
    setActiveIndex(restingIndex);
  };

  const leaveFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  return (
    <div
      className={cn("relative hidden w-full justify-center lg:flex", className)}
    >
      <div
        ref={stageRef}
        className="relative mx-auto w-full"
        style={{ height: stageHeight }}
        onMouseLeave={close}
        onBlur={leaveFocus}
        role="list"
        aria-label="Speaking highlights card stack"
      >
        {items.map((item, index) => {
          const position = layouts[index]!.open;
          const active = index === activeIndex && hovered;
          const style: CSSProperties = {
            zIndex: active ? 80 : 40 - Math.abs(index - restingIndex),
            width: cardWidth,
            transform: `translate(-50%, -50%) translate(${position.x}px, ${
              position.y - (active ? lift : 0)
            }px) rotate(${active ? 0 : position.rotation}deg) scale(${active ? 1.03 : 1})`,
            transitionDuration: reduceMotion ? "0ms" : "420ms",
          };

          return (
            <article
              key={`${item.name}-${index}`}
              role="listitem"
              tabIndex={0}
              aria-current={active ? "true" : undefined}
              className={cn(
                "absolute left-1/2 top-1/2 origin-center cursor-pointer rounded-[1.75rem] border border-kk-border bg-white p-4 text-kk-ink shadow-[0_12px_40px_rgba(12,14,10,0.08)] outline-none",
                "transition-[transform,box-shadow,border-color] ease-[cubic-bezier(.2,.8,.2,1)]",
                "hover:border-kk-accent/40 hover:shadow-[0_18px_48px_rgba(12,14,10,0.12)]",
                "focus-visible:ring-2 focus-visible:ring-kk-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-kk-surface",
                cardClassName,
              )}
              style={style}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % items.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + items.length) % items.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
              }}
            >
              <div className="relative">
                <CardImage item={item} />
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-label={`View archive: ${item.name}`}
                    className="absolute right-2.5 top-2.5 grid size-10 place-items-center rounded-full bg-kk-ink text-white shadow-md transition hover:bg-kk-accent"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                ) : null}
              </div>
              <div className="pt-4">
                <CardBody item={item} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function OrbitCardStack(props: OrbitCardStackProps) {
  if (!props.items.length) return null;

  return (
    <>
      <MobileCarousel items={props.items} />
      <DesktopOrbit {...props} />
    </>
  );
}
