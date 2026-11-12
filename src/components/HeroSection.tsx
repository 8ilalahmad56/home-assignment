import {useCallback, useRef, useState} from 'react';
import {faces, heroIntro, person} from '../content';
import {FaceCanvas, type Mood} from '../face/FaceCanvas';
import {ChevronDown, Sparkles, BookOpen, Layers} from 'lucide-react';

const CHERRY_DISC = '#731e23';

function MoodMeter({mood}: {mood: Mood}) {
  const p = mood.patience;
  return (
    <div className="w-full max-w-[340px] rounded-2xl border border-line/80 bg-oat-card/80 p-4 shadow-sm backdrop-blur-sm" aria-live="polite">
      <div className="flex items-center justify-between text-micro uppercase tracking-wider text-mute mb-2">
        <span className="flex items-center gap-1.5 font-bold">
          <Sparkles className="size-3 text-cherry-main" /> Interactive Expression
        </span>
        <span className="font-digitalt text-xs font-bold capitalize text-cherry-main">
          {faces[mood.face]?.mood ?? 'chill'}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-micro uppercase tracking-wider text-mute">
          <span>Taffy Patience</span>
          <span className="font-mono font-bold text-ink">{p}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-oat-border/70 p-0.5">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${p}%`,
              backgroundColor: p > 50 ? 'var(--color-cherry-main)' : p > 25 ? 'var(--color-cherry-glow)' : '#a92828'
            }}
          />
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2 text-[11px] text-mute">
        <span>Stretches & Pokes: <strong className="text-ink">{mood.pulls}</strong></span>
        <span className="text-[10px] uppercase font-bold text-cherry-main/90">Grab & drag anywhere</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<Mood>({face: 'base', patience: 100, pulls: 0});
  const onMood = useCallback((m: Mood) => setMood(m), []);

  return (
    <section id="hero" className="relative isolate flex min-h-[92svh] flex-col overflow-hidden px-4 sm:px-8 pt-6 pb-12">
      {/* Background ambient luxury glow rings */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-cherry-main/5 blur-[120px]" />
        <div className="absolute top-2/3 right-10 size-[380px] rounded-full bg-cocoa-main/5 blur-[100px]" />
      </div>

      {/* Top category pill */}
      <div className="mx-auto mb-4 flex items-center gap-2 rounded-full border border-line bg-oat-card/90 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-mute shadow-xs backdrop-blur-sm">
        <span className="size-2 rounded-full bg-cherry-main animate-pulse" />
        <span>{heroIntro.tag}</span>
      </div>

      {/* Hero Headline - Completely contained, guaranteed never out of screen on any device */}
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center px-2 sm:px-6">
        <h1 className="font-digitalt font-black uppercase tracking-tight text-cocoa-main leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl select-none">
          <span className="opacity-95">{heroIntro.headlinePrefix} </span>
          <span className="marker text-cocoa-dark">{heroIntro.name}</span>
        </h1>
      </div>

      {/* Center Grid: Stage with Otis Animation + Bio Panels */}
      <div className="relative mt-4 grid flex-1 grid-cols-1 items-center gap-8 text-left md:grid-cols-[1fr_auto_1fr] lg:gap-12">
        {/* Left column: Professional Bio */}
        <div className="relative z-10 max-w-[380px] space-y-4 md:order-1">
          <div className="rounded-2xl border border-line bg-oat-card/70 p-5 shadow-sm backdrop-blur-sm">
            <span className="font-digitalt text-xs font-bold uppercase tracking-widest text-cherry-main">
              Professional Identity
            </span>
            <p className="mt-1 font-presilla text-xl font-bold text-ink leading-snug">
              {person.role}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mute">
              {heroIntro.subtitle}
            </p>

            <div className="mt-4 space-y-2 border-t border-line/60 pt-3 text-xs text-mute">
              <div className="flex items-center gap-2 text-ink">
                <BookOpen className="size-3.5 text-cherry-main shrink-0" />
                <span>Qarshi University · CGPA 3.25</span>
              </div>
              <div className="flex items-center gap-2 text-ink">
                <Layers className="size-3.5 text-cherry-main shrink-0" />
                <span>Java (OOP), C++, Algorithms & Web</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center column: The Otis Face Animation Stage */}
        <div
          ref={stageRef}
          className="stage relative mx-auto aspect-square w-[min(90vw,440px)] md:order-2 md:w-[min(40vw,65svh)]"
        >
          {/* Handwritten directional pointer hint */}
          <div
            className={`hint pointer-events-none absolute -top-1 right-[-2%] z-40 rotate-6 font-brusher text-2xl font-bold text-cherry-main drop-shadow-sm md:right-[-8%] ${
              mood.pulls ? 'translate-y-3 opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex flex-col items-center">
              <span>pull my face!</span>
              <svg viewBox="0 0 60 40" className="mt-1 h-7 w-12 -scale-x-100 text-cherry-main" fill="none" aria-hidden>
                <path d="M4 4c18 2 34 12 44 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M40 31l8 4 1-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right column: MoodMeter + Scroll Invitation */}
        <div className="relative z-10 flex flex-col gap-4 md:order-3 md:items-end">
          <MoodMeter mood={mood} />

          <a
            href="#desktop-presentation"
            className="group flex w-full max-w-[340px] items-center justify-between rounded-xl border border-cherry-main/30 bg-cherry-main/10 p-3.5 text-xs font-bold uppercase tracking-wider text-cherry-main transition-all hover:bg-cherry-main hover:text-oat-base active:scale-95"
          >
            <span className="flex items-center gap-2">
              <ChevronDown className="size-4 animate-bounce text-cherry-main group-hover:text-oat-base" />
              Scroll to explore Desktop CV
            </span>
            <span className="text-[11px] font-mono">02 / 05</span>
          </a>
        </div>
      </div>

      {/* Otis WebGL Face Renderer */}
      <FaceCanvas stageRef={stageRef} discColor={CHERRY_DISC} onMood={onMood} />

      {/* Bottom Scroll Cue */}
      <div className="mt-4 flex flex-col items-center justify-center text-center">
        <a
          href="#desktop-presentation"
          aria-label="Scroll to Section 2: Desktop CV Presentation"
          className="group flex flex-col items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-mute transition-colors hover:text-cherry-main"
        >
          <span>Scroll into Physical Device Presentation</span>
          <div className="flex size-7 items-center justify-center rounded-full border border-line bg-oat-card shadow-xs group-hover:border-cherry-main">
            <ChevronDown className="size-4 text-mute transition-transform group-hover:translate-y-0.5 group-hover:text-cherry-main" />
          </div>
        </a>
      </div>
    </section>
  );
}
