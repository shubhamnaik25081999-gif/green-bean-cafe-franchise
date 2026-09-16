'use client';

import React from 'react';
import { PARTNER_STORIES } from '@/lib/data';
import { Sparkles, Quote, Building2, MapPin } from 'lucide-react';

export const FranchiseStories: React.FC = () => {
  return (
    <section
      id="stories"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-bg border-t border-brand-border-subtle"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Franchise Voices</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            From Discovering the Brand{' '}
            <span className="text-gradient-gold block sm:inline">to Building a Local Cafe.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
            Illustrative perspectives from entrepreneurs and multi-unit partners who brought the Green Bean Cafe experience to their communities.
          </p>
          <span className="inline-block mt-3 text-[11px] font-display uppercase tracking-widest text-brand-text-muted/75 px-3 py-1 rounded-full glass-pill border border-brand-border-subtle">
            Notice: Sample Partner Profiles for Concept Demonstration
          </span>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARTNER_STORIES.map((item) => (
            <div
              key={item.id}
              className="glass-medium p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-luxury hover:shadow-luxury-hover flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 relative group"
            >
              <div>
                <Quote className="w-8 h-8 text-brand-accent/25 mb-4 group-hover:text-brand-accent/40 transition-colors" />

                <p className="font-serif italic text-base sm:text-lg text-brand-text mb-6 leading-snug">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-6">
                  {item.story}
                </p>
              </div>

              <div className="pt-6 border-t border-brand-border-subtle">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-11 h-11 rounded-full bg-brand-accent/20 border border-brand-accent text-brand-accent font-serif font-bold text-sm flex items-center justify-center shadow-glow">
                    {item.avatarText}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-brand-text">
                      {item.name}
                    </h3>
                    <span className="text-[11px] text-brand-text-muted font-display block">
                      {item.background}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] font-display uppercase tracking-wider text-brand-text-muted">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                    <span>{item.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>{item.format}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
