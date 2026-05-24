const events = [
  { time: "10:00", title: "Doors open & Registration" },
  { time: "11:00", title: "Opening session & National Anthem" },
  { time: "11:30", title: "Welcome address — Convention Chair" },
  { time: "12:00", title: "Keynote: Timeless Impact" },
  { time: "13:00", title: "Lunch & Networking" },
  { time: "14:30", title: "Panel: Amplifying Digital Innovation" },
  { time: "16:00", title: "Awards presentation" },
  { time: "17:30", title: "Investiture of incoming Executive" },
  { time: "19:00", title: "After Party" },
  { time: "22:00", title: "Closing remarks" },
];

export function Timeline() {
  return (
    <section id="timeline" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-xs uppercase tracking-[0.22em] text-accent">Order of events</div>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Convention day timeline</h2>

        <ol className="mt-12 relative border-l border-border pl-8 space-y-6">
          {events.map((e, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-gradient-rich ring-4 ring-background" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display text-2xl text-gradient w-20 shrink-0">{e.time}</div>
                <div className="font-medium">{e.title}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
