import {FileText, Moon, Sun} from 'lucide-react';
import {navLinks, person} from '../content';

type HeaderProps = {
  dark: boolean;
  onToggle: () => void;
  onOpenCV: () => void;
};

export function Header({dark, onToggle, onOpenCV}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/60 bg-page/85 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-3 font-digitalt text-base font-extrabold tracking-tight text-cocoa-main transition-transform hover:scale-[1.02]"
        >
          <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full border border-cherry-main/30 bg-cherry-main text-oat-base shadow-sm">
            <span className="font-berkshire text-lg font-bold">B</span>
          </span>
          <div className="flex flex-col text-left">
            <span className="leading-tight text-ink font-bold group-hover:text-cherry-main transition-colors">
              {person.name}
            </span>
            <span className="text-[10.5px] font-medium tracking-wide text-mute uppercase">
              Interactive CV
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-mute transition-all hover:bg-oat-card hover:text-ink active:scale-95"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick CV Modal Trigger */}
          <button
            type="button"
            onClick={onOpenCV}
            className="flex items-center gap-1.5 rounded-full border border-cherry-main/40 bg-cherry-main px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-oat-light shadow-sm transition-all hover:bg-cherry-vibrant hover:shadow-md active:scale-95 cursor-pointer"
            title="View Executive CV"
          >
            <FileText className="size-3.5" />
            <span className="hidden sm:inline">Executive CV</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={dark}
            aria-label="Toggle dark mode"
            className="flex size-9 items-center justify-center rounded-full border border-line bg-oat-card text-ink transition-all hover:border-cherry-main/40 hover:text-cherry-main active:scale-90 cursor-pointer"
            title={dark ? 'Switch to Oat Light Theme' : 'Switch to Cocoa Dark Theme'}
          >
            {dark ? <Sun className="size-4 text-cherry-glow" /> : <Moon className="size-4 text-cocoa-main" />}
          </button>
        </div>
      </div>
    </header>
  );
}
