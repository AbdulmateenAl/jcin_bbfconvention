import * as React from "react";
import { CONVENTION } from "@/lib/convention";
import { Countdown } from "./Countdown";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowDown } from "lucide-react";

const familyImages = Object.entries(
  import.meta.glob("/src/assets/families/*.{jpeg,jpg,png}", { eager: true, as: "url" }) as Record<string, string>
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

export function Hero() {
  const [scrollRatio, setScrollRatio] = React.useState(0);
   const mainImage = familyImages[1] ?? familyImages[0];
   const familyImage = familyImages[0] ?? familyImages[1];

  React.useEffect(() => {
    const handleScroll = () => {
      const ratio = Math.min(1, window.scrollY / window.innerHeight);
      setScrollRatio(ratio);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.65))]" />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/30" />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-[15%] h-[60vh] w-[55vw] max-w-208 -translate-x-1/2 overflow-hidden rounded-[2.5rem] border border-border bg-slate-950/30 shadow-2xl"
          style={{ transform: `translateX(-50%) translateY(${scrollRatio * 18}px)` }}
        >
          {mainImage ? (
            <img
              src={mainImage}
              alt="Main convention moment background"
              className="h-full w-full object-cover object-center opacity-90"
            />
          ) : null}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent" />
        </div>

        <div
          className="absolute right-6 top-[55%] hidden h-[35vh] w-[28vw] max-w-88 -translate-y-1/2 overflow-hidden rounded-4xl border border-border bg-slate-950/30 shadow-2xl lg:block"
          style={{ transform: `translateY(-${scrollRatio * 24}px)` }}
        >
          {familyImage ? (
            <img
              src={familyImage}
              alt="Family convention moment background"
              className="h-full w-full object-cover object-center opacity-90"
            />
          ) : null}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-wine" />
            {CONVENTION.org}
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95]">
            <span className="block">{CONVENTION.title}</span>
            <span className="block text-gradient">{CONVENTION.subtitle}</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Three days of leadership, legacy, and amplified impact. Join the {CONVENTION.org} family
            for our 2025 Convention & Investiture.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <div className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span>{CONVENTION.dateLabel}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-wine" />
              <span>{CONVENTION.venue}</span>
            </div>
          </div>

          <Countdown targetISO={CONVENTION.startDate} />

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="bg-gradient-rich text-primary-foreground hover:opacity-95 shadow-elegant">
              <a href="#register">Register Now</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#program">View Program</a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
