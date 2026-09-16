'use client';

import React, { useEffect, useState } from 'react';

interface Stage {
  num: string;
  label: string;
  targetId: string;
}

const STAGES: Stage[] = [
  { num: '01', label: 'CAFE', targetId: 'cafe-experience' },
  { num: '02', label: 'BRAND', targetId: 'brand-pillars' },
  { num: '03', label: 'BUSINESS', targetId: 'business-ecosystem' },
  { num: '04', label: 'FRANCHISE', targetId: 'opportunity' },
  { num: '05', label: 'APPLY', targetId: 'enquiry' },
];

export const ScrollProgress: React.FC = () => {
  const [activeStage, setActiveStage] = useState('01');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      const sectionPositions = STAGES.map((stage) => {
        const el = document.getElementById(stage.targetId);
        if (!el) return { num: stage.num, top: 0 };
        const rect = el.getBoundingClientRect();
        return { num: stage.num, top: rect.top };
      });

      // Find the current active stage where section is at or near the viewport center
      const current = sectionPositions.reduce((prev, curr) => {
        if (curr.top <= window.innerHeight * 0.45) {
          return curr;
        }
        return prev;
      }, sectionPositions[0]);

      if (current) {
        setActiveStage(current.num);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Story Progress"
      className="hidden md:flex fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Vertical background tracking line */}
      <div className="absolute right-[5px] top-2 bottom-2 w-[1.5px] bg-brand-border-subtle rounded-full overflow-hidden">
        <div
          className="w-full bg-brand-accent transition-all duration-200"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {STAGES.map((stage) => {
        const isActive = activeStage === stage.num;
        return (
          <button
            key={stage.num}
            onClick={() => scrollToSection(stage.targetId)}
            className="group flex items-center gap-3 py-1 text-right focus:outline-none"
            title={`Jump to stage ${stage.num}: ${stage.label}`}
          >
            {/* Label revealed on hover or active */}
            <span
              className={`text-[10px] font-display uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? 'opacity-100 font-bold text-brand-accent translate-x-0'
                  : 'opacity-0 group-hover:opacity-100 text-brand-text-muted translate-x-2'
              }`}
            >
              {stage.num} {stage.label}
            </span>

            {/* Indicator Dot */}
            <div
              className={`relative z-10 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-brand-accent ring-4 ring-brand-accent/25 shadow-glow'
                  : 'w-2 h-2 bg-brand-border group-hover:bg-brand-accent/70'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
};
