import { Wine, Crown, Sun } from "lucide-react";

const days = [
  {
    n: "01",
    title: "Gratitude Cocktail Night",
    date: "Friday",
    dress: "Cocktail / Smart Casual",
    desc: "An invitation-only evening for sponsors, alumni and the executive — a quiet toast before the main stage opens.",
    Icon: Wine,
    accent: "wine",
  },
  {
    n: "02",
    title: "Main Convention, Investiture & After Party",
    date: "Saturday",
    dress: "Aso-Oke & Formal",
    desc: "Plenary, awards, the formal investiture of incoming leadership, and a celebration that runs into the night.",
    Icon: Crown,
    accent: "accent",
  },
  {
    n: "03",
    title: "Recovery Picnic",
    date: "Sunday",
    dress: "Comfort & Colour",
    desc: "A relaxed daytime picnic to close the convention — connection, conversation and a soft landing.",
    Icon: Sun,
    accent: "primary",
  },
];

export function Programs() {
  return (
    <section id="program" className="relative py-24 md:py-32 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.22em] text-wine">Three days</div>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Program structure</h2>
          <p className="mt-4 text-muted-foreground">
            A deliberate arc from gratitude, to ceremony, to celebration, to rest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {days.map((d) => (
            <article
              key={d.n}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-6xl text-gradient leading-none">{d.n}</span>
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-${d.accent}/10 text-${d.accent}`}>
                  <d.Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">{d.date}</div>
              <h3 className="font-display text-2xl mt-2">{d.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              <div className="mt-6 pt-4 border-t border-border text-xs">
                <span className="text-muted-foreground">Dress code · </span>
                <span className="font-medium">{d.dress}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
