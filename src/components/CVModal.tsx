import {useEffect} from 'react';
import {X, Printer, Download, Sparkles} from 'lucide-react';
import {DigitalCV} from './DigitalCV';
import {person} from '../content';

type CVModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CVModal({isOpen, onClose}: CVModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full-Screen Executive CV Viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative flex h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#E2DBD0] bg-[#FAF7F0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E2DBD0] bg-[#FAF7F0] px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-cherry-main" />
            <span className="font-digitalt text-xs font-bold uppercase tracking-wider text-cocoa-main">
              {person.name} · Official Executive CV
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Print / Save PDF Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-cherry-main px-3 py-1.5 text-xs font-bold uppercase text-white hover:bg-cherry-vibrant transition-colors shadow-xs"
            >
              <Printer className="size-3.5" />
              <span>Print / Save PDF</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-cocoa-main/10 p-1.5 text-cocoa-main hover:bg-red-600 hover:text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Viewport with Digital CV */}
        <div className="flex-1 overflow-auto">
          <DigitalCV variant="desktop" />
        </div>
      </div>
    </div>
  );
}
