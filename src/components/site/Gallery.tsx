import * as React from "react";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

type GalleryPair = {
  name: string;
  main: string;
  family: string;
};

function normalizeAlt(baseName: string, label: "Main" | "Family") {
  const name = baseName.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  return `${label} event photo for ${name}`;
}

function buildGalleryPairs() {
  const images = import.meta.glob("/src/assets/*.{jpeg,jpg,png}", { eager: true, as: "url" }) as Record<string, string>;

  const pairs = new Map<string, { name: string; main?: string; family?: string }>();

  Object.entries(images).forEach(([path, src]) => {
    const fileName = path.split("/").pop()?.toLowerCase() ?? "";
    const baseName = fileName.replace(/-(main|family)\.(jpeg|jpg|png)$/, "");

    if (!baseName) {
      return;
    }

    const existing = pairs.get(baseName) ?? { name: baseName };

    if (fileName.includes("-main.")) {
      existing.main = src;
    } else if (fileName.includes("-family.")) {
      existing.family = src;
    }

    pairs.set(baseName, existing);
  });

  return Array.from(pairs.values())
    .filter((pair): pair is { name: string; main: string; family: string } => Boolean(pair.main && pair.family))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function Gallery() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const pairs = React.useMemo(() => buildGalleryPairs(), []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!api) {
        return;
      }

      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);

    return () => window.clearInterval(interval);
  }, [api]);

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

        <div className="relative">
          <Carousel
            className="overflow-hidden touch-pan-x"
            opts={{
              align: "start",
              containScroll: "trimSnaps",
              dragFree: false,
              skipSnaps: false,
            }}
            setApi={setApi}
          >
            <CarouselContent className="flex gap-2">
              {pairs.map((pair) => (
                <CarouselItem key={pair.name} className="px-4">
                  <div className="grid grid-cols-[0.95fr_1.05fr] gap-3">
                    <figure className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-muted">
                      <img
                        src={pair.main}
                        alt={normalizeAlt(pair.name, "Main")}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="h-full w-full object-contain object-center transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-transparent px-4 py-3 text-white">
                        <p className="text-xs uppercase tracking-[0.22em]">Main Highlight</p>
                      </div>
                    </figure>

                    <figure className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-muted">
                      <img
                        src={pair.family}
                        alt={normalizeAlt(pair.name, "Family")}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="h-full w-full object-contain object-center transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-transparent px-4 py-3 text-white">
                        <p className="text-xs uppercase tracking-[0.22em]">Family Moment</p>
                      </div>
                    </figure>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
