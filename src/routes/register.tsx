import { createFileRoute } from "@tanstack/react-router";
import { CornerLogos } from "@/components/site/CornerLogos";
import { Registration } from "@/components/site/Registration";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";
import { CONVENTION } from "@/lib/convention";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: `Register - ${CONVENTION.title}` },
      {
        name: "description",
        content: `Register for ${CONVENTION.title}: ${CONVENTION.subtitle}`,
      },
      { property: "og:title", content: `Register - ${CONVENTION.title}` },
      { property: "og:description", content: `Join ${CONVENTION.org} for three days of leadership, legacy and impact.` },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="relative">
      <CornerLogos />
      <main>
        <section className="relative py-24 md:py-32 bg-gradient-soft min-h-screen">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8">
              <Link to="/" className="text-accent hover:text-accent/80 text-sm uppercase tracking-widest">
                ← Back to home
              </Link>
            </div>
            <Registration />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster richColors position="top-center" />
    </div>
  );
}
