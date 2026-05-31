import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlidePair = {
  main: string;
  family: string;
  altMain: string;
  altFamily: string;
};

const SLIDE_PAIRS: SlidePair[] = (() => {
  type PairSource = {
    main?: string;
    family?: string;
    altMain?: string;
    altFamily?: string;
  };

  const source = Object.entries(
    import.meta.glob("/src/assets/families/*.{jpeg,jpg,png}", { eager: true, as: "url" }) as Record<string, string>
  );

  const pairs = source.reduce<Record<string, PairSource>>((acc, [path, url]) => {
    const fileName = path.split("/").pop() ?? path;
    const match = fileName.match(/^(.+)-(main|family)\.(jpe?g|png)$/i);
    if (!match) return acc;

    const [, key, kind] = match;
    const normalizedKey = key.toLowerCase();
    const pair = acc[normalizedKey] ??= {};

    if (kind.toLowerCase() === "main") {
      pair.main = url;
      pair.altMain = `${key.replace(/-/g, " ")} main image`;
    } else {
      pair.family = url;
      pair.altFamily = `${key.replace(/-/g, " ")} family image`;
    }

    return acc;
  }, {});

  return Object.entries(pairs)
    .filter(([, pair]) => pair.main && pair.family)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, pair]) => ({
      main: pair.main!,
      family: pair.family!,
      altMain: pair.altMain ?? "Main slide image",
      altFamily: pair.altFamily ?? "Family slide image",
    }));
})();

const slideVariants = {
  hidden: (direction: number) => ({
    x: direction >= 0 ? 120 : -120,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -120 : 120,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const clampIndex = (index: number, length: number) => (index + length) % length;

export function HeroBackgroundSlider() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const timerRef = React.useRef<number | null>(null);
  const slideCount = SLIDE_PAIRS.length;

  if (slideCount === 0) {
    return null;
  }

  const resetAutoPlay = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = clampIndex(current + 1, slideCount);
        setDirection(1);
        return next;
      });
    }, 5000);
  }, [slideCount]);

  React.useEffect(() => {
    resetAutoPlay();
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [resetAutoPlay]);

  const handleNext = () => {
    setActiveIndex((current) => clampIndex(current + 1, slideCount));
    setDirection(1);
    resetAutoPlay();
  };

  const handlePrev = () => {
    setActiveIndex((current) => clampIndex(current - 1, slideCount));
    setDirection(-1);
    resetAutoPlay();
  };

  const handleSelect = (index: number) => {
    if (index === activeIndex) {
      return;
    }
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    resetAutoPlay();
  };

  const activeSlide = SLIDE_PAIRS[activeIndex];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 grid w-full min-h-full grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1"
        >
          <div
            className="relative h-full min-h-full overflow-hidden bg-cover bg-center bg-slate-950"
            style={{ backgroundImage: `url(${activeSlide.main})`, backgroundPosition: "center 30%" }}
            aria-label={activeSlide.altMain}
          >
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          <div
            className="relative h-full min-h-full overflow-hidden bg-cover bg-center bg-slate-950"
            style={{ backgroundImage: `url(${activeSlide.family})`, backgroundPosition: "center 30%" }}
            aria-label={activeSlide.altFamily}
          >
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-wrap items-center justify-center gap-3 px-4 sm:justify-between">
        <div className="items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-2 py-1 backdrop-blur-sm flex">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white transition hover:bg-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white transition hover:bg-white/10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {SLIDE_PAIRS.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => handleSelect(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
