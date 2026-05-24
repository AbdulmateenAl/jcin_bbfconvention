import { createFileRoute, Link } from "@tanstack/react-router";
import { CornerLogos } from "@/components/site/CornerLogos";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Theme } from "@/components/site/Theme";
import { Gallery } from "@/components/site/Gallery";
import { Programs } from "@/components/site/Programs";
import { Timeline } from "@/components/site/Timeline";
import { Registration } from "@/components/site/Registration";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";
import { CONVENTION } from "@/lib/convention";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${CONVENTION.title}: ${CONVENTION.subtitle} — ${CONVENTION.shortName}` },
      {
        name: "description",
        content: `${CONVENTION.shortName}. ${CONVENTION.dateLabel} at ${CONVENTION.venue}. Register now and join the WhatsApp group.`,
      },
      { property: "og:title", content: `${CONVENTION.title}: ${CONVENTION.subtitle}` },
      { property: "og:description", content: `Join ${CONVENTION.org} for three days of leadership, legacy and impact.` },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <CornerLogos />
      <main>
        <Hero />
        <About />
        <Theme />
        <Gallery />
        <Programs />
        <Timeline />
        <Registration />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster richColors position="top-center" />
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <Link to="/login" className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin</Link>
      </div>
      <Link to="/login" className="hidden md:block fixed top-1/2 right-2 z-30 -rotate-90 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent">
        Admin
      </Link>
    </div>
  );
}
