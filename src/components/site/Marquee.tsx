export function Marquee({
  items,
  className = "",
  separator = "·",
  duration = 34,
}: {
  items: string[];
  className?: string;
  separator?: string;
  duration?: number;
}) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        {row.map((item, i) => (
          <span key={item + i} className="flex items-center">
            <span className="px-6 md:px-10">{item}</span>
            <span aria-hidden className="text-foreground/25">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
