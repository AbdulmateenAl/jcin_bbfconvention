const events = [
  { time: "11:00 AM", title: "Arrival of Guests" },
  { time: "11:45 AM", title: "Arrival of Special Guests, National Officers" },
  { time: "12:00 PM", title: "Grand Opening" },
  { time: "12:10 PM", title: "National Anthem, Opening Prayer & JCI Creed" },
  { time: "12:20 PM", title: "Welcome Address" },
  { time: "12:30 PM", title: "President's Address" },
  { time: "12:45 PM", title: "Entertainment Interlude" },
  { time: "1:00 PM", title: "Theme Speaker Session" },
  { time: "1:20 PM", title: "Administration Documentary – The TIME Legacy" },
  { time: "1:35 PM", title: "Awards & Recognition Ceremony" },
  { time: "2:15 PM", title: "Lunch & Networking Break" },
  { time: "2:30 PM", title: "Goodwill Messages" },
  { time: "3:15 PM", title: "Presentation of Awards" },
  { time: "3:40 PM", title: "Investiture Ceremony" },
  { time: "4:50 PM", title: "Acceptance Speech by the 42nd President" },
  { time: "5:05 PM", title: "Unveiling of the New Administration's Theme & Strategic Direction" },
  { time: "5:20 PM", title: "Cake Cutting & Group Photographs" },
  { time: "5:35 PM", title: "Vote of Thanks" },
  { time: "5:45 PM", title: "Closing Prayer" },
  { time: "5:50 PM", title: "Closing Formalities & Networking" },
];

export function Timeline() {
  return (
    <section id="timeline" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-xs uppercase tracking-[0.22em] text-accent">Order of events</div>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Convention Day Timeline</h2>
        <p className="mt-3 text-muted-foreground">11:00 AM – 6:00 PM</p>

        <ol className="mt-12 relative border-l border-border pl-8 space-y-6">
          {events.map((e, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-gradient-rich ring-4 ring-background" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="font-display text-2xl text-gradient w-28 shrink-0">{e.time}</div>
                <div className="font-medium">{e.title}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
