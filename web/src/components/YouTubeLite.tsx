"use client";

import { Play } from "lucide-react";
import { useState } from "react";

export function YouTubeLite({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const thumbFallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-kk-border bg-kk-surface">
      {active ? (
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 size-full text-left"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = thumbFallback;
            }}
          />
          <span className="absolute inset-0 bg-kk-ink/25 transition group-hover:bg-kk-ink/35" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-white text-kk-accent shadow-lg transition group-hover:scale-105">
              <Play className="size-6 fill-current" />
            </span>
          </span>
          <span className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-kk-ink/70 to-transparent">
            <span className="text-sm font-medium text-white line-clamp-2">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
