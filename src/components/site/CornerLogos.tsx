import jciLogo from "@/assets/logos/jci.png";
import amplifyLogo from "@/assets/logos/amplify.jpg";

// Brand logo placeholders, locked to the 4 corners of the viewport.
// Top logos use images from `src/assets/logos`.

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
      <div className="absolute top-4 left-4">
        <img src={jciLogo} alt="JCIN UNILORIN" className="pointer-events-auto h-28 w-auto" />
      </div>
      <div className="absolute top-4 right-4">
        <img src={amplifyLogo} alt="Amplify" className="pointer-events-auto h-20 w-auto" />
      </div>
    </div>
  );
}
