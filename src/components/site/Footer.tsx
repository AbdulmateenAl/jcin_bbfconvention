import { CONVENTION } from "@/lib/convention";
import { Mail, Phone, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

function normalizeExternalUrl(url: string) {
  if (!url) return url;
  return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
}

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-display text-2xl text-gradient">{CONVENTION.org}</div>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              {CONVENTION.shortName} · TIMELESS IMPACT: {CONVENTION.subtitle}.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                [Instagram, CONVENTION.socials.instagram, "Instagram"],
                [Twitter, CONVENTION.socials.twitter, "Twitter"],
                [Facebook, CONVENTION.socials.facebook, "Facebook"],
                [Linkedin, CONVENTION.socials.linkedin, "LinkedIn"],
              ].map(([Icon, href, label]: any) => (
                <a
                  key={label}
                  href={normalizeExternalUrl(href)}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-accent/10 hover:border-accent transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-[0.22em] text-accent">Chairpersons</div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {CONVENTION.chairpersons.map((c) => (
                <div key={c.name} className="rounded-2xl border border-border p-5">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.role}</div>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 hover:text-accent">
                      <Phone className="h-3.5 w-3.5" /> {c.phone}
                    </a>
                    <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-accent">
                      <Mail className="h-3.5 w-3.5" /> {c.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} {CONVENTION.org}. All rights reserved.</div>
          <div>Built for {CONVENTION.title} · {CONVENTION.subtitle}</div>
        </div>
      </div>
    </footer>
  );
}
