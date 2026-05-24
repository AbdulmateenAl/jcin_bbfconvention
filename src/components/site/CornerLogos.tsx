// Brand logo placeholders, locked to the 4 corners of the viewport.
// Replace text labels with actual <img> tags once logo assets are uploaded.

function Badge({ label }: { label: string }) {
  return (
    <div className="pointer-events-auto select-none rounded-full border border-border bg-card/85 backdrop-blur px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/80 shadow-soft">
      {label}
    </div>
  );
}

export function CornerLogos() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      <div className="absolute top-4 left-4"><Badge label="JCIN UNILORIN" /></div>
      <div className="absolute top-4 right-4"><Badge label="Amplify" /></div>
      <div className="absolute bottom-4 left-4"><Badge label="Spark" /></div>
      <div className="absolute bottom-4 right-4"><Badge label="TIME" /></div>
    </div>
  );
}
