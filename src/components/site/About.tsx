export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#6CB33F] text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-white/80">About</div>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-white">The 2025 Convention</h2>
          </div>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-white/90">
            <p>
              The 2025 Convention & Investiture is designed to celebrate a remarkable year of achievements, 
chart a new course for the organisation, and empower the next generation of leaders in an 
increasingly digital world. 
            </p>
            <p>
              The convention goes beyond celebration by creating an experience focused on leadership 
transition, empowerment, innovation, networking, and sustainable impact. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
