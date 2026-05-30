import * as React from "react";

const momentImages = Object.entries(
  import.meta.glob("/src/assets/moments/*.{jpeg,jpg,png}", { eager: true, as: "url" }) as Record<string, string>
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

function normalizeAlt(src: string) {
  const fileName = src.split("/").pop()?.replace(/\.(jpe?g|png)$/i, "") ?? "Convention moment";

  return fileName.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function Gallery() {
  const images = React.useMemo(() => momentImages, []);

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#231F20] text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">Gallery</div>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-white">Moments from past conventions</h2>
          </div>
          <p className="text-sm text-white/80 max-w-sm">
            Investitures, awards, red carpets and the in-between — a glimpse of what awaits.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((src, index) => (
            <figure key={src} className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 aspect-4/3">
              <img
                src={src}
                alt={normalizeAlt(src)}
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition duration-700 ease-out hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
