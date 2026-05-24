import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const items = [
  { src: g1, alt: "Members at past convention session", cls: "md:col-span-2 md:row-span-2" },
  { src: g2, alt: "Investiture moment" },
  { src: g3, alt: "Red carpet arrival" },
  { src: g4, alt: "Keynote speaker on stage" },
  { src: g5, alt: "Cocktail night reception" },
  { src: g6, alt: "Recovery picnic gathering" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-accent">Gallery</div>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Moments from past conventions</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Investitures, awards, red carpets and the in-between — a glimpse of what awaits.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {items.map((it, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden rounded-2xl border border-border bg-muted group ${it.cls ?? ""}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
