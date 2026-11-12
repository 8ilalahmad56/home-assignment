import {useEffect, useRef, useState} from 'react';
import {Smartphone, RotateCw, Maximize2, Eye, ArrowRight, ArrowLeft} from 'lucide-react';
import {DigitalCV} from './DigitalCV';

type MobileSectionProps = {
  onOpenModal: () => void;
};

export function MobileSection({onOpenModal}: MobileSectionProps) {
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

  // 1. Move upward in viewport during early scroll (0.0 -> 0.35)
  const translateY = Math.max(70 * (1 - scrollProgress / 0.35), 0);
  
  // 2. Rotate smartphone from vertical portrait (0deg) to horizontal landscape (90deg) (0.28 -> 0.62)
  const rotationProgress = Math.min(Math.max((scrollProgress - 0.28) / 0.34, 0), 1);
  const rotation = rotationProgress * 90; // 0deg -> 90deg
  const isLandscape = rotationProgress > 0.5;

  // 3. Scale up to fill screen cleanly (bounded to 0.72 -> 1.05 so it stays inside screen)
  const scale = 0.72 + scrollProgress * 0.33; // 0.72 -> 1.05
  const isFullScreen = scrollProgress > 0.85;
  const bezelOpacity = isFullScreen ? Math.max(1 - (scrollProgress - 0.85) / 0.12, 0.2) : 1;

  // 4. CV inside mobile moves horizontally as user scrolls during landscape mode (0.60 -> 0.98)
  const horizontalCVProgress = Math.min(Math.max((scrollProgress - 0.60) / 0.36, 0), 1);

  return (
    <section
      id="mobile-presentation"
      ref={containerRef}
      className="relative min-h-[250vh] bg-page text-cocoa-main transition-colors duration-300"
    >
      {/* Sticky Viewport Track below navbar */}
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* Section Title & Dynamic Scroll Guidance */}
        <div
          className={`absolute top-2 left-0 right-0 z-30 mx-auto flex max-w-4xl items-center justify-between px-6 transition-all duration-300 ${
            scrollProgress > 0.6 ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-cherry-main text-[11px] font-bold text-oat-base">
                03
              </span>
              <span className="font-digitalt text-xs font-bold uppercase tracking-widest text-cherry-main">
                Section 3 · Mobile Transformation
              </span>
            </div>
            <h2 className="mt-0.5 font-presilla text-xl sm:text-2xl font-bold tracking-tight text-ink">
              Realistic Smartphone · Portrait to Landscape
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-line bg-oat-card/90 px-3 py-1 shadow-2xs backdrop-blur-sm text-xs font-semibold text-mute">
            <Smartphone className="size-3.5 text-cherry-main" />
            <RotateCw className="size-3 text-mute" />
            <span>
              {scrollProgress < 0.28
                ? 'Scroll to rotate phone'
                : scrollProgress < 0.62
                ? `Rotating to horizontal (${Math.round(rotation)}°)`
                : 'CV sliding horizontally...'}
            </span>
            <span className="font-mono text-xs font-bold text-cherry-main">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* 3D Smartphone Container */}
        <div
          className="relative flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: 'center center'
          }}
        >
          {/* Physical Phone Chassis */}
          <div
            className="phone-chassis relative flex flex-col items-center overflow-hidden rounded-[48px] border-[5px] border-[#3C281D] p-2.5 shadow-2xl transition-all duration-300"
            style={{
              width: '320px',
              height: '640px',
              borderColor: isFullScreen ? 'rgba(60, 40, 29, 0.35)' : '#362318'
            }}
          >
            {/* Left Hardware Side Buttons (Volume Rockers) */}
            <div className="absolute -left-[9px] top-24 h-9 w-1 rounded-l-sm bg-[#523A2C]" />
            <div className="absolute -left-[9px] top-36 h-9 w-1 rounded-l-sm bg-[#523A2C]" />

            {/* Right Hardware Side Button (Power) */}
            <div className="absolute -right-[9px] top-28 h-12 w-1 rounded-r-sm bg-[#523A2C]" />

            {/* Top Speaker Ear-piece & Dynamic Island */}
            <div
              className="relative z-30 mb-2 flex w-full flex-col items-center transition-opacity duration-300"
              style={{opacity: bezelOpacity}}
            >
              <div className="h-1 w-10 rounded-full bg-[#18110D] mb-1 opacity-70" />

              {/* Dynamic Island Pill Cutout */}
              <div className="flex h-4.5 w-22 items-center justify-between rounded-full bg-black px-2 shadow-xs">
                <div className="relative size-2 rounded-full bg-[#111925] ring-1 ring-white/20">
                  <div className="absolute top-0.5 right-0.5 size-0.5 rounded-full bg-white/60" />
                </div>
                <div className="size-1 rounded-full bg-[#1C1410]" />
              </div>
            </div>

            {/* Phone Display Screen */}
            <div className="relative flex-1 w-full overflow-hidden rounded-[36px] bg-[#FAF7F0] shadow-inner flex items-center justify-center">
              {/* Glass Reflection Sheen */}
              <div className="screen-glass-sheen absolute inset-0 z-20 pointer-events-none" />

              {/* Content Container: When phone rotates 90deg, screen auto-rotates so CV is horizontal and slides horizontally */}
              <div
                className="relative z-10 flex items-center justify-center transition-all duration-300"
                style={
                  isLandscape
                    ? {
                        // Counter-rotate by 90deg so the CV is horizontal to the viewer,
                        // and expand to 570px wide by 285px high to fill the landscape screen area
                        transform: 'rotate(-90deg)',
                        width: '570px',
                        height: '285px',
                      }
                    : {
                        transform: 'rotate(0deg)',
                        width: '100%',
                        height: '100%',
                      }
                }
              >
                <DigitalCV
                  variant="mobile"
                  isLandscape={isLandscape}
                  horizontalProgress={horizontalCVProgress}
                />
              </div>

              {/* Mobile Screen Status Bar Indicator */}
              <div
                className="absolute top-2 left-4 right-4 z-30 flex items-center justify-between text-[9px] font-semibold text-[#1E140F]/80 transition-opacity duration-300 pointer-events-none"
                style={{opacity: isLandscape ? 0 : bezelOpacity}}
              >
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span className="size-1 rounded-full bg-[#1E140F]" />
                  <span className="text-[8px]">5G</span>
                  <div className="h-2 w-3 rounded-[2px] border border-[#1E140F] p-0.5">
                    <div className="h-full w-full bg-[#1E140F]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div
              className="mt-2 flex w-full items-center justify-center transition-opacity duration-300"
              style={{opacity: bezelOpacity}}
            >
              <div className="h-1 w-24 rounded-full bg-[#1E140F]/35" />
            </div>
          </div>
        </div>

        {/* Bottom Floating Information Cue */}
        <div className="absolute bottom-3 z-40 flex items-center gap-3 rounded-full border border-line bg-oat-card/95 px-4 py-1.5 shadow-md backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink">
            <Smartphone className="size-3.5 text-cherry-main" />
            <span>
              {isLandscape
                ? `Horizontal CV Mode (Slide ${horizontalCVProgress < 0.33 ? '1' : horizontalCVProgress < 0.67 ? '2' : '3'} of 3)`
                : 'Vertical Portrait Mode (0°)'}
            </span>
          </span>
          <span className="h-3 w-px bg-line" />
          <button
            onClick={onOpenModal}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-cherry-main transition-colors hover:text-cherry-vibrant cursor-pointer"
          >
            <Eye className="size-3" />
            <span>Expand CV</span>
          </button>
        </div>
      </div>
    </section>
  );
}
