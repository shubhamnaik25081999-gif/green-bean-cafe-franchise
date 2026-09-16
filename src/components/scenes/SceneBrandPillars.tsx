'use client';

import React, { useState } from 'react';
import { BRAND_PILLARS, BrandPillar } from '@/lib/data';
import { Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const SceneBrandPillars: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<BrandPillar>(BRAND_PILLARS[0]);

  return (
    <section
      id="brand-pillars"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-bg border-t border-brand-border-subtle overflow-hidden"
    >
      {/* Decorative Ambient Crest Seal Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-5 pointer-events-none select-none">
        <img
          src="/products/green-bear-seal.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Scene 03 • Brand Pillars</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight">
              Crafted for Longevity.{' '}
              <span className="text-gradient-gold block sm:inline">Engineered for Scale.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted max-w-md leading-relaxed">
            The foundation of every successful Green Bean Cafe franchise rests upon six non-negotiable operational and sensory standards.
          </p>
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pillars Interactive Selector (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {BRAND_PILLARS.map((pillar, idx) => {
              const isSelected = selectedPillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 relative group flex items-center justify-between ${
                    isSelected
                      ? 'glass-medium border-brand-accent shadow-luxury'
                      : 'glass-light hover:border-brand-border text-brand-text-muted hover:text-brand-text'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-serif text-lg font-bold transition-colors ${
                        isSelected ? 'text-brand-accent' : 'text-brand-text-muted/50 group-hover:text-brand-text'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <h3
                        className={`font-serif text-base sm:text-lg font-semibold transition-colors ${
                          isSelected ? 'text-brand-text' : 'text-brand-text-muted group-hover:text-brand-text'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-brand-text-muted font-display block">
                        {pillar.tag}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      isSelected
                        ? 'text-brand-accent opacity-100 rotate-45'
                        : 'text-brand-text-muted opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  {isSelected && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 bg-brand-accent rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Apple Glass Deep-Dive Feature (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-medium p-8 sm:p-12 rounded-3xl border border-white/30 shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[460px] flex flex-col justify-between">
              {/* Watermark Pillar Number */}
              <div className="absolute right-6 top-6 text-8xl sm:text-9xl font-serif font-black text-brand-border-subtle select-none pointer-events-none opacity-25">
                0{BRAND_PILLARS.findIndex((p) => p.id === selectedPillar.id) + 1}
              </div>

              <div>
                <div className="inline-block px-3 py-1 rounded-full glass-light border border-white/20 text-brand-accent text-[11px] font-display uppercase tracking-widest mb-6">
                  {selectedPillar.tag}
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text mb-4 leading-snug">
                  {selectedPillar.title}
                </h3>

                <p className="font-sans text-base sm:text-lg text-brand-text mb-5 font-medium leading-relaxed">
                  {selectedPillar.shortDesc}
                </p>

                <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-8">
                  {selectedPillar.fullDesc}
                </p>
              </div>

              {/* Highlights */}
              <div className="pt-6 border-t border-brand-border-subtle">
                <span className="text-[11px] font-display uppercase tracking-wider text-brand-text-muted block mb-3">
                  Standardized Franchise Assurance:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedPillar.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-xl glass-light border border-white/20 text-xs font-medium text-brand-text"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
