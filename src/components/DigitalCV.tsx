import {Mail, Phone, MapPin, ExternalLink, GraduationCap, Award, Code, CheckCircle, Sparkles, BookOpen, Layers, ChevronRight, ChevronLeft} from 'lucide-react';
import {person, projects, skills} from '../content';

type DigitalCVProps = {
  variant?: 'desktop' | 'mobile' | 'modal';
  isLandscape?: boolean;
  horizontalProgress?: number; // 0 to 1 for horizontal slide movement
};

export function DigitalCV({variant = 'desktop', isLandscape = false, horizontalProgress = 0}: DigitalCVProps) {
  // -------------------------------------------------------------
  // MOBILE LANDSCAPE: HORIZONTAL MULTI-PANEL SLIDING PRESENTATION
  // When mobile rotates horizontally, CV displays horizontally and moves horizontally!
  // -------------------------------------------------------------
  if (variant === 'mobile' && isLandscape) {
    // 3 panels: 0% -> 0 to -66.66%
    const translateX = -horizontalProgress * (200 / 3) * 3; // translates from 0% to -200% of panel width
    const currentSlide = horizontalProgress < 0.33 ? 1 : horizontalProgress < 0.67 ? 2 : 3;

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#FAF7F0] text-[#2D1B12] select-none p-2.5">
        {/* Top Landscape Status & Slide Indicator */}
        <div className="flex items-center justify-between border-b border-[#E2DBD0] pb-1.5 mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#731E23] text-[10px] font-bold text-white">
              BA
            </span>
            <span className="font-digitalt text-xs font-bold uppercase tracking-tight text-[#1E140F]">
              {person.name}
            </span>
            <span className="text-[10px] font-medium text-[#731E23]">
              · Landscape CV Mode
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#731E23]">
              <span className={currentSlide === 1 ? 'underline' : 'opacity-40'}>Profile</span>
              <span>•</span>
              <span className={currentSlide === 2 ? 'underline' : 'opacity-40'}>Projects</span>
              <span>•</span>
              <span className={currentSlide === 3 ? 'underline' : 'opacity-40'}>Skills</span>
            </div>
            <span className="font-mono text-[9px] font-bold bg-[#EFECE3] px-1.5 py-0.5 rounded text-[#593E30]">
              {currentSlide}/3
            </span>
          </div>
        </div>

        {/* Horizontal Sliding Track: Moves horizontally across 3 panels as user scrolls */}
        <div className="relative h-[calc(100%-2rem)] w-full overflow-hidden">
          <div
            className="flex h-full w-[300%] transition-transform duration-100 ease-out"
            style={{transform: `translateX(-${horizontalProgress * 66.66}%)`}}
          >
            {/* Panel 1: Profile, Academic Background & Contact */}
            <div className="h-full w-1/3 shrink-0 px-2 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2.5 h-full">
                {/* Profile Card */}
                <div className="rounded-lg border border-[#E2DBD0] bg-white p-2.5 shadow-2xs">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#731E23] block mb-1">
                    Profile Summary
                  </span>
                  <p className="text-[10px] leading-relaxed text-[#593E30]">
                    Passionate Computer Science student with hands-on experience in Java, C++, and GUI applications, now building AI-powered & deployed web projects with strong backend logic.
                  </p>
                  <div className="mt-2 pt-1.5 border-t border-[#EFECE3] flex flex-col gap-0.5 text-[9.5px] text-[#593E30]">
                    <span className="font-semibold text-[#1E140F]">Qarshi University · CGPA 3.25</span>
                    <span>Currently in 5th Semester (Grad 2028)</span>
                  </div>
                </div>

                {/* Direct Contact Card */}
                <div className="rounded-lg border border-[#E2DBD0] bg-white p-2.5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#731E23] block mb-1">
                      Direct Contact Info
                    </span>
                    <div className="space-y-1 text-[9.5px] text-[#593E30]">
                      <div className="flex items-center gap-1 text-[#1E140F] font-semibold">
                        <Mail className="size-3 text-[#731E23]" />
                        <span>{person.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="size-3 text-[#731E23]" />
                        <span>{person.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3 text-[#731E23]" />
                        <span>{person.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-[#EFECE3] text-[9px] text-[#731E23] font-bold">
                    Scroll down to slide into Projects →
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: Featured Projects & Engineering Work */}
            <div className="h-full w-1/3 shrink-0 px-2 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 h-full">
                {projects.slice(0, 4).map((p) => (
                  <div key={p.title} className="rounded-lg border border-[#E2DBD0] bg-white p-2 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-[10px] text-[#1E140F] leading-tight">{p.title}</h3>
                        <span className="text-[8px] font-bold text-[#731E23] shrink-0">{p.semester}</span>
                      </div>
                      <p className="mt-1 text-[9px] text-[#593E30] leading-tight line-clamp-2">{p.desc}</p>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {p.tags.slice(0, 2).map(t => (
                        <span key={t} className="rounded bg-[#FAF7F0] px-1 py-0.2 text-[8px] font-medium text-[#7E6556] border border-[#E2DBD0]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 3: Technical Skills & Key Achievements */}
            <div className="h-full w-1/3 shrink-0 px-2 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2.5 h-full">
                {/* Tech Stack */}
                <div className="rounded-lg border border-[#E2DBD0] bg-white p-2.5 shadow-2xs">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#731E23] block mb-1">
                    Technical Stack
                  </span>
                  <div className="space-y-1.5 text-[9px]">
                    <div>
                      <strong className="text-[#1E140F]">Languages:</strong> Java (OOP), C++, JavaScript, TypeScript, Python
                    </div>
                    <div>
                      <strong className="text-[#1E140F]">Core CS:</strong> Data Structures, Algorithms, CPU Scheduling
                    </div>
                    <div>
                      <strong className="text-[#1E140F]">Web & Tools:</strong> React, Tailwind, Git/GitHub, Vercel
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="rounded-lg border border-[#E2DBD0] bg-white p-2.5 shadow-2xs">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#731E23] block mb-1">
                    Key Achievements
                  </span>
                  <ul className="space-y-1 text-[8.5px] text-[#593E30]">
                    <li>• Developed full Hospital Management System in Java (2nd sem).</li>
                    <li>• Deployed clothing store live on Vercel.</li>
                    <li>• Implemented OS CPU scheduling simulator.</li>
                    <li>• Consistent 3.25 CGPA at Qarshi University.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MOBILE PORTRAIT VARIANT
  // -------------------------------------------------------------
  if (variant === 'mobile') {
    return (
      <div className="h-full w-full overflow-y-auto bg-[#FAF7F0] text-[#2D1B12] selection:bg-[#731E23] selection:text-white p-3.5 text-xs">
        {/* Mobile Header without Photo */}
        <div className="border-b border-[#E2DBD0] pb-2.5 mb-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-digitalt text-base font-extrabold uppercase tracking-tight text-[#1E140F]">
                {person.name}
              </h1>
              <p className="font-digitalt text-[10px] font-bold uppercase tracking-wider text-[#731E23]">
                Computer Science Student
              </p>
            </div>
            {/* Elegant Monogram Badge instead of Photo */}
            <div className="flex size-7 items-center justify-center rounded-full bg-[#731E23] text-white font-berkshire text-xs shadow-xs">
              BA
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="mt-2 flex flex-wrap gap-1 text-[9.5px]">
            <span className="rounded bg-[#EFECE3] px-1.5 py-0.5 font-medium text-[#442B1E]">
              Qarshi University · CGPA 3.25
            </span>
            <span className="rounded bg-[#F3DFE1] px-1.5 py-0.5 font-bold text-[#731E23]">
              5th Semester
            </span>
            <span className="rounded bg-[#EFECE3] px-1.5 py-0.5 font-medium text-[#442B1E]">
              Lahore, PK
            </span>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="mb-3">
          <h2 className="font-digitalt text-[10px] font-extrabold uppercase tracking-wider text-[#731E23] mb-1">
            Profile Summary
          </h2>
          <p className="text-[10.5px] leading-relaxed text-[#593E30]">
            Passionate CS student with hands-on experience in Java, C++, and GUI applications, now building AI-powered & deployed web projects with strong backend logic.
          </p>
        </div>

        {/* Projects */}
        <div className="mb-3">
          <h2 className="font-digitalt text-[10px] font-extrabold uppercase tracking-wider text-[#731E23] mb-1.5">
            Key Projects
          </h2>
          <div className="space-y-1.5">
            {projects.slice(0, 3).map((p) => (
              <div key={p.title} className="rounded-lg border border-[#E2DBD0] bg-white p-2 shadow-2xs">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-bold text-[10.5px] text-[#1E140F]">{p.title}</h3>
                  <span className="text-[8.5px] font-semibold text-[#731E23] shrink-0">{p.semester}</span>
                </div>
                <p className="mt-0.5 text-[9.5px] text-[#593E30] leading-tight">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-3">
          <h2 className="font-digitalt text-[10px] font-extrabold uppercase tracking-wider text-[#731E23] mb-1">
            Technical Stack
          </h2>
          <div className="flex flex-wrap gap-1">
            {['Java (OOP)', 'C++', 'Data Structures', 'Algorithms', 'React', 'Tailwind', 'Git', 'Vercel'].map((s) => (
              <span key={s} className="rounded bg-[#EFECE3] px-1.5 py-0.5 text-[9px] font-semibold text-[#362217]">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Links */}
        <div className="border-t border-[#E2DBD0] pt-2 text-[9.5px] text-[#593E30] flex flex-wrap justify-between gap-1">
          <span>{person.email}</span>
          <span>{person.phone}</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DESKTOP & MODAL VARIANT (Guaranteed Starting CV Data is Top-Visible)
  // -------------------------------------------------------------
  return (
    <div className="h-full w-full overflow-y-auto bg-[#FAF7F0] text-[#2D1B12] selection:bg-[#731E23] selection:text-white px-5 sm:px-8 pt-4 pb-10">
      <div className="mx-auto max-w-4xl">
        {/* Prominent Starting CV Header: Completely Clear and Visible at the very top */}
        <div className="border-b-2 border-[#731E23]/25 pb-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-digitalt text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1E140F]">
                  {person.name}
                </h1>
                <span className="rounded-full bg-[#731E23] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs">
                  5th Semester BS CS
                </span>
              </div>
              <p className="mt-1 font-presilla text-sm sm:text-base font-bold text-[#731E23]">
                Computer Science Student & Full Stack Software Developer
              </p>
            </div>

            {/* Contact Pills with Updated Email */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#593E30]">
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-1.5 rounded-md bg-[#EFECE3] px-2.5 py-1.5 font-semibold text-[#1E140F] hover:text-[#731E23] transition-colors shadow-2xs"
              >
                <Mail className="size-3.5 text-[#731E23]" />
                <span>{person.email}</span>
              </a>
              <a
                href="tel:03176801802"
                className="flex items-center gap-1.5 rounded-md bg-[#EFECE3] px-2.5 py-1.5 font-semibold text-[#1E140F] hover:text-[#731E23] transition-colors shadow-2xs"
              >
                <Phone className="size-3.5 text-[#731E23]" />
                <span>{person.phone}</span>
              </a>
              <span className="flex items-center gap-1.5 rounded-md bg-[#EFECE3] px-2.5 py-1.5 font-semibold text-[#1E140F] shadow-2xs">
                <MapPin className="size-3.5 text-[#731E23]" />
                <span>Lahore, Punjab</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Left Column (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            {/* Profile */}
            <div className="rounded-xl border border-[#E2DBD0] bg-white p-4 shadow-2xs">
              <h2 className="flex items-center gap-2 font-digitalt text-xs font-bold uppercase tracking-wider text-[#731E23] mb-2">
                <Sparkles className="size-3.5" />
                Profile & Mission
              </h2>
              <p className="text-xs leading-relaxed text-[#593E30]">
                Passionate Computer Science student with hands-on experience in Java, C++, and GUI-based applications, now building AI-powered and deployed web projects. Interested in software engineering, data structures, algorithms, and backend logic building. Strong communicator with a growth mindset.
              </p>
            </div>

            {/* Education */}
            <div className="rounded-xl border border-[#E2DBD0] bg-white p-4 shadow-2xs">
              <h2 className="flex items-center gap-2 font-digitalt text-xs font-bold uppercase tracking-wider text-[#731E23] mb-2">
                <GraduationCap className="size-3.5" />
                Education
              </h2>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[#1E140F]">BS Computer Science</h3>
                  <span className="font-mono font-bold text-[#731E23]">CGPA 3.25</span>
                </div>
                <p className="text-[#593E30] font-medium">Qarshi University</p>
                <p className="text-[11px] text-[#7E6556]">Currently in 5th Semester · Expected 2028</p>
                
                <div className="mt-2.5 pt-2 border-t border-[#EFECE3]">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#731E23] block mb-1">
                    Relevant Courses:
                  </span>
                  <p className="text-[11px] text-[#593E30] leading-snug">
                    OOP (Java), Data Structures, Design & Analysis of Algorithms, Web Development
                  </p>
                </div>
              </div>
            </div>

            {/* Skills & Stack */}
            <div className="rounded-xl border border-[#E2DBD0] bg-white p-4 shadow-2xs">
              <h2 className="flex items-center gap-2 font-digitalt text-xs font-bold uppercase tracking-wider text-[#731E23] mb-2">
                <Code className="size-3.5" />
                Technical Stack & Skills
              </h2>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-[#1E140F] block mb-1">Languages:</span>
                  <div className="flex flex-wrap gap-1">
                    {['Java (OOP)', 'C++', 'JavaScript', 'TypeScript', 'Python', 'SQL'].map(s => (
                      <span key={s} className="rounded bg-[#EFECE3] px-2 py-0.5 text-[10px] font-semibold text-[#362217]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#1E140F] block mb-1">Core CS & Frameworks:</span>
                  <div className="flex flex-wrap gap-1">
                    {['Data Structures', 'Algorithms', 'CPU Scheduling', 'Java Swing', 'React', 'Tailwind'].map(s => (
                      <span key={s} className="rounded bg-[#F3DFE1] px-2 py-0.5 text-[10px] font-semibold text-[#731E23]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#1E140F] block mb-1">Tools & Platforms:</span>
                  <div className="flex flex-wrap gap-1">
                    {['Git / GitHub', 'VS Code', 'Vercel', 'MySQL'].map(s => (
                      <span key={s} className="rounded bg-[#EFECE3] px-2 py-0.5 text-[10px] font-semibold text-[#362217]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Languages */}
            <div className="rounded-xl border border-[#E2DBD0] bg-white p-4 shadow-2xs">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10.5px] font-bold text-[#731E23] uppercase block mb-1">Strengths</span>
                  <ul className="space-y-0.5 text-[11px] text-[#593E30]">
                    <li>• Problem-Solving</li>
                    <li>• Communication</li>
                    <li>• Time Management</li>
                  </ul>
                </div>
                <div>
                  <span className="text-[10.5px] font-bold text-[#731E23] uppercase block mb-1">Languages</span>
                  <ul className="space-y-0.5 text-[11px] text-[#593E30]">
                    <li>• English (Fluent)</li>
                    <li>• Urdu (Native)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            {/* Featured Projects */}
            <div className="rounded-xl border border-[#E2DBD0] bg-white p-5 shadow-2xs">
              <h2 className="flex items-center gap-2 font-digitalt text-xs font-bold uppercase tracking-wider text-[#731E23] mb-3">
                <Layers className="size-3.5" />
                Featured Projects & Engineering Work
              </h2>

              <div className="space-y-3.5">
                {projects.map((p) => (
                  <div key={p.title} className="relative pl-3.5 border-l-2 border-[#731E23]/30">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="font-bold text-xs sm:text-sm text-[#1E140F]">{p.title}</h3>
                      <span className="text-[10px] font-semibold text-[#731E23]">{p.semester}</span>
                    </div>
                    <p className="mt-1 text-[11.5px] text-[#593E30] leading-relaxed">{p.desc}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {p.tags.map(t => (
                        <span key={t} className="rounded bg-[#FAF7F0] px-1.5 py-0.5 text-[9.5px] font-medium text-[#7E6556] border border-[#E2DBD0]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-xl border border-[#E2DBD0] bg-white p-4 shadow-2xs">
              <h2 className="flex items-center gap-2 font-digitalt text-xs font-bold uppercase tracking-wider text-[#731E23] mb-2.5">
                <Award className="size-3.5" />
                Key Achievements
              </h2>
              <ul className="space-y-1.5 text-xs text-[#593E30]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="size-3 text-[#731E23] shrink-0 mt-0.5" />
                  <span>Designed & built Hospital Management System in Java with GUI and file handling (2nd sem).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="size-3 text-[#731E23] shrink-0 mt-0.5" />
                  <span>Built and deployed a modern clothing store e-commerce platform live on Vercel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="size-3 text-[#731E23] shrink-0 mt-0.5" />
                  <span>Implemented core OS CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority) in simulator.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="size-3 text-[#731E23] shrink-0 mt-0.5" />
                  <span>Consistently maintaining a strong academic record with CGPA 3.25 in BS Computer Science.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
