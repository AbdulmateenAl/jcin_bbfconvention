import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CornerLogos } from "@/components/site/CornerLogos";
import { Timeline } from "@/components/site/Timeline";
import { Footer } from "@/components/site/Footer";
import { CONVENTION } from "@/lib/convention";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: `Program of Events — ${CONVENTION.title}` },
      {
        name: "description",
        content: `Full program of events for ${CONVENTION.shortName}, ${CONVENTION.dateLabel} at ${CONVENTION.venue}.`,
      },
      { property: "og:title", content: `Program of Events — ${CONVENTION.title}` },
      { property: "og:description", content: `Convention day timeline: 11:00 AM – 6:00 PM.` },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProgramPage,
});

function ProgramPage() {
  return (
    <div className="relative min-h-screen">
      <CornerLogos />
      <main>
        <section className="pt-28 md:pt-32 pb-4">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <div className="mt-8">
              <div className="text-xs uppercase tracking-[0.22em] text-accent">{CONVENTION.dateLabel}</div>
              <h1 className="font-display text-5xl md:text-6xl mt-3">Program of Events</h1>
              <p className="mt-4 text-muted-foreground max-w-2xl">
                {CONVENTION.venue}. Doors open at 11:00 AM.
              </p>
            </div>
          </div>
        </section>
        <Timeline />
      </main>
      <Footer />
    </div>
  );
}
