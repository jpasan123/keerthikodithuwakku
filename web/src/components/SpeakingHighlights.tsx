"use client";

import { OrbitCardStack, type OrbitStackItem } from "@/components/OrbitCardStack";

type Highlight = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

const highlightRoles = [
  "Engineers’ session",
  "Global summit",
  "Medical congress",
  "IP workshop",
] as const;

export function SpeakingHighlights({ items }: { items: readonly Highlight[] }) {
  const stackItems: OrbitStackItem[] = items.map((item, index) => ({
    name: item.title,
    role: highlightRoles[index] ?? "Speaking highlight",
    description: item.excerpt,
    image: item.image,
    href: item.href,
    stat: "View archive",
    accent: "#f18200",
  }));

  return (
    <div className="relative z-0 overflow-visible">
      <OrbitCardStack
        items={stackItems}
        defaultActiveIndex={0}
      />
    </div>
  );
}
