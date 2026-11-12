import {ArrowUp, Mail, ExternalLink, Sparkles} from 'lucide-react';
import {person} from '../content';

function LinkedInIcon({className}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({className}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function ClosingSection() {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <footer id="closing" className="relative isolate overflow-hidden border-t border-line bg-page pt-20 pb-14 text-cocoa-main">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="size-[500px] rounded-full bg-cherry-main/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Closing Animation Emblem */}
        <div className="relative mx-auto mb-8 flex size-24 items-center justify-center">
          {/* Outer Pulsing Rings */}
          <div className="absolute inset-0 rounded-full border border-cherry-main/30 animate-ping opacity-30" />
          <div className="absolute -inset-3 rounded-full border border-cherry-main/20 animate-pulse" />
          
          {/* Inner Badge */}
          <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-cherry-main bg-cherry-main text-oat-base shadow-xl">
            <Sparkles className="size-9 text-oat-base animate-pulse" />
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="font-digitalt text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-ink">
          THANK YOU FOR VISITING!
        </h2>

        {/* Supporting Text */}
        <p className="mx-auto mt-4 max-w-xl font-presilla text-lg sm:text-2xl text-mute italic leading-relaxed">
          "Thank you for taking the time to explore my professional journey. I hope you enjoyed the experience."
        </p>

        {/* Name Signature */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <span className="font-brusher text-4xl sm:text-5xl text-cherry-main tracking-wide">
            Bilal ahmad
          </span>
          <span className="mt-1 text-micro font-bold uppercase tracking-[0.2em] text-mute">
            Computer Science Student · Qarshi University
          </span>
        </div>

        {/* Social Media & Project Links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-line bg-oat-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-cherry-main hover:text-cherry-main hover:shadow-xs active:scale-95"
          >
            <LinkedInIcon className="size-3.5 text-cherry-main" />
            <span>LinkedIn Profile</span>
          </a>

          <a
            href={`mailto:${person.email}`}
            className="flex items-center gap-2 rounded-full border border-line bg-oat-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-cherry-main hover:text-cherry-main hover:shadow-xs active:scale-95"
          >
            <Mail className="size-3.5 text-cherry-main" />
            <span>{person.email}</span>
          </a>

          <a
            href={person.liveProject}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-line bg-oat-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-cherry-main hover:text-cherry-main hover:shadow-xs active:scale-95"
          >
            <ExternalLink className="size-3.5 text-cherry-main" />
            <span>Live Project Store</span>
          </a>
        </div>

        {/* Back-to-Top Interaction */}
        <div className="mt-12">
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-cherry-main/40 bg-cherry-main/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-cherry-main transition-all hover:bg-cherry-main hover:text-oat-base active:scale-95 shadow-xs"
          >
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-1" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Sub-footer copyright */}
        <div className="mt-14 border-t border-line/60 pt-6 text-xs text-mute flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 Bilal Ahmad · All Rights Reserved.</span>
          <span className="flex items-center gap-1">
            Built with 40% Oat, 30% Cocoa Brown, 30% Cherry Brown
          </span>
        </div>
      </div>
    </footer>
  );
}
