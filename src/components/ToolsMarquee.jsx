export default function ToolsMarquee({ items }) {
  // Duplicate list to create seamless loop
  const loop = [...items, ...items];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur overflow-hidden">
      <div className="flex whitespace-nowrap gap-3 py-4 px-4 animate-marquee">
        {loop.map((t, idx) => (
          <span
            key={`${t}-${idx}`}
            className="inline-flex items-center rounded-full border border-white/10 bg-black/10 dark:bg-black/10 bg-white/55 px-4 py-2 text-sm font-semibold dark:text-white text-slate-900"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
