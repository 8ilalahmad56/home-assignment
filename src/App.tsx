import {useState} from 'react';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {DesktopSection} from './components/DesktopSection';
import {MobileSection} from './components/MobileSection';
import {ContactSection} from './components/ContactSection';
import {ClosingSection} from './components/ClosingSection';
import {CVModal} from './components/CVModal';
import {useTheme} from './hooks';

export default function App() {
  const [dark, toggleTheme] = useTheme();
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="flex min-h-[100svh] flex-col bg-page text-ink selection:bg-cherry-main selection:text-oat-base">
      {/* Top Navigation */}
      <Header
        dark={dark}
        onToggle={toggleTheme}
        onOpenCV={() => setCvModalOpen(true)}
      />

      {/* Main Sequential Storyline */}
      <main className="flex-1">
        {/* Section 1: Animated Hero / Identity with Otis Face Engine */}
        <HeroSection />

        {/* Section 2: Photorealistic Desktop Monitor with Digital CV */}
        <DesktopSection onOpenModal={() => setCvModalOpen(true)} />

        {/* Section 3: Photorealistic Smartphone with Digital CV */}
        <MobileSection onOpenModal={() => setCvModalOpen(true)} />

        {/* Section 4: Contact Us Form */}
        <ContactSection />

        {/* Section 5: Thank You / Final Section */}
        <ClosingSection />
      </main>

      {/* Full-Screen Executive CV Inspector Modal */}
      <CVModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}
