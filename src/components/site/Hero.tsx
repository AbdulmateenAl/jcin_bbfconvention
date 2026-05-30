import * as React from "react";
import { CONVENTION } from "@/lib/convention";
import { Countdown } from "./Countdown";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowDown } from "lucide-react";
import { HeroBackgroundSlider } from "./HeroBackgroundSlider";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.65))]" />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/30" />

      <HeroBackgroundSlider />

      {/* Foreground content overlay: place text, CTA buttons, and interactive content here */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 md:pt-10 md:pb-32 pointer-events-auto">
          <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F4B400]" />
            {CONVENTION.org}
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] text-white">
            <span className="block">TIMELESS IMPACT: </span>
            <span className="block bg-gradient-to-r from-[#F4B400] via-[#0077C8] to-[#6CB33F] bg-clip-text text-transparent">
              {CONVENTION.subtitle}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
            Three days of leadership, legacy, and amplified impact. Join the {CONVENTION.org} family
            for our 2025 Convention & Investiture.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90">
            <div className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#0077C8]" />
              <span>{CONVENTION.dateLabel}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#6CB33F]" />
              <span>{CONVENTION.venue}</span>
            </div>
          </div>

          <Countdown targetISO={CONVENTION.startDate} />

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="bg-[#0077C8] text-white hover:bg-[#005ea6] shadow-lg shadow-[#0077C8]/20">
              <a href="/register">Register Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-black hover:border-white hover:bg-white/10">
              <a href="#program">View Program</a>
            </Button>
          </div>
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
