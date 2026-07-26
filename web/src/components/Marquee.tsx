const items = [
  "Eisenhower Fellow 2026",
  "Chevening CRISP · Oxford",
  "US & Japan Patents",
  "ICT Leader of the Year 2025",
  "CEO of the Year 2022 · AI",
  "Young Innovator 2024",
  "JKX Winner 2016",
  "WIPO Global Case Study",
  "Commonwealth Digital Health",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-kk-border bg-kk-soft py-4 select-none">
      <div className="flex w-max animate-kk-marquee gap-10">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap text-sm font-semibold tracking-wide text-kk-muted"
          >
            {item}
            <span className="size-1.5 rounded-full bg-kk-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
