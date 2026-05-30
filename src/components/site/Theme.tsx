import { CONVENTION } from "@/lib/convention";
import { Clock, Sparkles } from "lucide-react";

export function Theme() {
  return (
    <section id="theme" className="relative py-24 md:py-32 bg-[#F4B400] text-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-950/80">Theme</div>
          <h2 className="font-display text-4xl md:text-5xl mt-3 text-slate-950">
            Where <span className="font-semibold text-slate-950">{CONVENTION.localTheme}</span> meets{" "}
            <span className="font-semibold text-slate-950">{CONVENTION.nationalTheme}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <article className="rounded-3xl border border-white/20 bg-white/90 p-8 shadow-soft">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/10 text-slate-950">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl mt-5 text-slate-950">TIME · Local Theme</h3>
            <p className="mt-3 text-slate-950/90 leading-relaxed">
              Time is the only currency none of us can earn back. This year we honour the moments
              that have shaped us, the people who invested theirs in us, and the urgency to leave
              a deliberate mark before the clock turns again.
            </p>
          </article>

          <article className="rounded-3xl border border-white/20 bg-white/90 p-8 shadow-soft">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/10 text-slate-950">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl mt-5 text-slate-950">Amplify · National Direction</h3>
            <p className="mt-3 text-slate-950/90 leading-relaxed">
              JCI Nigeria calls us to Amplify — to take what is working and make it louder, bolder,
              and more accessible. Together with TIME, we commit to impact that is both
              intentional and unmistakable.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
