import heroBg from "@/assets/hero-bg.jpg";
import { CONVENTION } from "@/lib/convention";
import { Countdown } from "./Countdown";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-wine" />
            {CONVENTION.org} · {CONVENTION.localTheme} × {CONVENTION.nationalTheme}
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
