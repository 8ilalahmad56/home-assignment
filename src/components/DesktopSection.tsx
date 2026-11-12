import {useEffect, useRef, useState} from 'react';
import {Maximize2, Monitor, Printer, Eye} from 'lucide-react';
import {DigitalCV} from './DigitalCV';

type DesktopSectionProps = {
  onOpenModal: () => void;
};

export function DesktopSection({onOpenModal}: DesktopSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Carefully bounded scale so the monitor NEVER exceeds viewport or hits navbar
  // Starts compact at 0.75, scales up smoothly to 1.0 (never over 1.0)
  const isFullScreen = scrollProgress > 0.72;
  const scale = 0.72 + Math.min(scrollProgress / 0.72, 1) * 0.28; // exactly 0.72 -> 1.00
  const tiltX = Math.max(6 * (1 - scrollProgress / 0.5), 0);
  const standOpacity = Math.max(1 - (scrollProgress - 0.2) / 0.45, 0);
  const bezelOpacity = isFullScreen ? Math.max(1 - (scrollProgress - 0.72) / 0.2, 0.25) : 1;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="desktop-presentation"
      ref={containerRef}
      className="relative min-h-[220vh] bg-page text-cocoa-main transition-colors duration-300"
    >
      {/* Sticky container positioned STRICTLY below the navbar (top-16 = 64px) with height calc(100vh - 64px) */}
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-3 sm:px-6">
        {/* Subtle section pill indicator (fades out as monitor scales up) */}
        <div
          className={`absolute top-2 left-0 right-0 z-30 mx-auto flex max-w-4xl items-center justify-between px-6 transition-all duration-300 ${
            scrollProgress > 0.5 ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-cherry-main text-[11px] font-bold text-oat-base">
              02
            </span>
            <span className="font-digitalt text-xs font-bold uppercase tracking-widest text-cherry-main">
              Section 2 · Desktop Presentation
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-line bg-oat-card/90 px-3 py-1 shadow-2xs backdrop-blur-sm text-xs font-semibold text-mute">
            <Monitor className="size-3.5 text-cherry-main" />
            <span>Scroll to enlarge monitor ·</span>
            <span className="font-mono text-xs font-bold text-cherry-main">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* 3D Perspective Stage containing the Realistic Desktop Monitor */}
        <div
          className="relative flex items-center justify-center w-full max-w-5xl transition-transform duration-100 ease-out"
          style={{
            perspective: '1400px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Entire Monitor Body */}
          <div
            className="relative flex flex-col items-center transition-all duration-200"
            style={{
              transform: `rotateX(${tiltX}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Monitor Housing / Screen Case */}
            <div
              className="desktop-chassis relative z-20 flex flex-col items-center overflow-hidden rounded-[22px] border-[5px] border-[#38261C] p-2 sm:p-3 transition-all duration-300"
              style={{
                width: 'min(92vw, 980px)',
                height: 'min(64vh, 520px)',
                borderColor: isFullScreen ? 'rgba(56, 38, 28, 0.35)' : '#362318'
              }}
            >
              {/* Top Bezel with Webcam & LED */}
              <div
                className="relative z-30 mb-1.5 flex w-full items-center justify-between px-3 transition-opacity duration-300"
                style={{opacity: bezelOpacity}}
              >
                {/* Left decorative window dots */}
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="size-2 rounded-full bg-[#E85C50]" />
                  <span className="size-2 rounded-full bg-[#E5B53D]" />
                  <span className="size-2 rounded-full bg-[#46C455]" />
                </div>

                {/* Center Webcam Array */}
                <div className="flex items-center gap-1.5">
                  <div className="relative flex size-2.5 items-center justify-center rounded-full bg-[#0D0907] ring-1 ring-white/20">
                    <div className="size-1 rounded-full bg-[#18283E]" />
                    <div className="absolute top-0.5 right-0.5 size-0.5 rounded-full bg-white/70" />
                  </div>
                  <span className="size-1 rounded-full bg-[#46C455] opacity-75 animate-pulse" />
                </div>

                {/* Right Quick Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenModal}
                    className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-oat-base transition-colors hover:bg-cherry-main hover:text-white cursor-pointer"
                    title="Open Fullscreen Inspector"
                  >
                    <Maximize2 className="size-2.5" />
                    <span>Expand</span>
                  </button>
                </div>
              </div>

              {/* Inner Screen Display Surface: starting data is 100% visible at the top */}
              <div className="desktop-screen-inner relative flex-1 w-full overflow-hidden rounded-[12px] bg-[#FAF7F0] shadow-inner flex flex-col justify-start">
                {/* Screen diagonal light reflection sweep */}
                <div className="screen-glass-sheen absolute inset-0 z-20 pointer-events-none" />

                {/* Customized Digital CV Component - 100% Fit & No Photo */}
                <div className="relative z-10 h-full w-full overflow-y-auto">
                  <DigitalCV variant="desktop" />
                </div>

                {/* Floating overlay action badge */}
                <div className="absolute bottom-2.5 right-3 z-30 flex items-center gap-2 rounded-lg bg-black/70 px-2.5 py-1 backdrop-blur-md border border-white/10 text-white">
                  <span className="flex size-1.5 rounded-full bg-[#46C455]" />
                  <span className="text-[10px] font-medium">
                    Digital CV · Fully Responsive
                  </span>
                  <button
                    onClick={onOpenModal}
                    className="ml-1 text-cherry-light hover:text-white transition-colors cursor-pointer"
                    title="Expand View"
                  >
                    <Eye className="size-3" />
                  </button>
                </div>
              </div>

              {/* Bottom Chin Bezel */}
              <div
                className="mt-1.5 flex w-full items-center justify-center transition-opacity duration-300"
                style={{opacity: bezelOpacity}}
              >
                <div className="flex items-center gap-1.5 opacity-40">
                  <span className="font-digitalt text-[8.5px] tracking-[0.2em] uppercase text-oat-base font-bold">
                    BILAL AHMAD · WORKSTATION 4K
                  </span>
                </div>
              </div>
            </div>

            {/* Monitor Stand Neck */}
            <div
              className="desktop-stand-neck z-10 -mt-1.5 h-12 w-14 transition-opacity duration-300 sm:h-16 sm:w-18"
              style={{
                opacity: standOpacity,
                clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
              }}
            />

            {/* Monitor Stand Base */}
            <div
              className="desktop-stand-base z-10 -mt-1 h-2.5 w-44 rounded-full transition-opacity duration-300 sm:h-3 sm:w-60"
              style={{opacity: standOpacity}}
            />

            {/* Desk Surface Shadow */}
            <div
              className="z-0 -mt-1.5 h-3 w-52 rounded-full bg-cocoa-dark/60 blur-md transition-opacity duration-300 sm:w-68"
              style={{opacity: standOpacity}}
            />
          </div>
        </div>

        {/* Floating Quick Action Footer Controls */}
        <div className="absolute bottom-3 z-40 flex items-center gap-3 rounded-full border border-line bg-oat-card/95 px-4 py-1.5 shadow-md backdrop-blur-md">
          <button
            onClick={onOpenModal}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:text-cherry-main cursor-pointer"
          >
            <Maximize2 className="size-3 text-cherry-main" />
            <span>Full-Screen Inspect</span>
          </button>
          <span className="h-3 w-px bg-line" />
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cherry-main transition-colors hover:text-cherry-vibrant cursor-pointer"
          >
            <Printer className="size-3" />
            <span>Print / Save CV</span>
          </button>
        </div>
      </div>
    </section>
  );
}
