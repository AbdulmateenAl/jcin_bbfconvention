export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-accent">About</div>
            <h2 className="font-display text-4xl md:text-5xl mt-3">The 2025 Convention</h2>
          </div>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
            <p>
              The JCIN UNILORIN Annual Convention & Investiture is our highest celebration of
              leadership — a gathering where members, alumni, partners, and friends converge to
              honour service, install new leaders, and shape the year ahead.
            </p>
            <p>
              In 2025, we converge under the theme <span className="text-foreground font-medium">Timeless Impact</span> —
              a tribute to the legacies we inherit and the futures we are bold enough to build. From
              the gratitude cocktail to the investiture and the recovery picnic, every moment is
              designed for connection, recognition, and momentum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
