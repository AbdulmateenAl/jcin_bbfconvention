import { useEffect, useState } from "react";

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export function Countdown({ targetISO }: { targetISO: string }) {
  const target = new Date(targetISO).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "Days", value: t.d },
    { label: "Hours", value: t.h },
    { label: "Minutes", value: t.m },
    { label: "Seconds", value: t.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-xl">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-2xl border border-border bg-card/80 backdrop-blur p-3 sm:p-4 text-center shadow-soft"
        >
          <div className="font-display text-3xl sm:text-5xl text-gradient leading-none">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
