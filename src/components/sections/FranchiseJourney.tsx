'use client';

import React from 'react';
import { FRANCHISE_JOURNEY } from '@/lib/data';
import { Compass, BookOpen, ShieldCheck, Send, Sparkles, ArrowRight } from 'lucide-react';

const icons = [Compass, BookOpen, ShieldCheck, Send];

export const FranchiseJourney: React.FC = () => {
  return (
    <section
      id="journey"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-bg border-t border-brand-border-subtle overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Path to Partnership</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            The Franchise Journey.{' '}
            <span className="text-gradient-gold block sm:inline">From Discovery to Launch.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
            A structured, 4-stage path designed to ensure complete mutual alignment, rigorous site evaluation, and turnkey operational mastery.
          </p>
        </div>

        {/* Continuous Path Cards */}
        <div className="relative">
          {/* Connecting SVG Path Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-1 bg-brand-border-subtle -translate-y-6 z-0">
            <div className="h-full bg-gradient-to-r from-brand-accent via-brand-gold to-brand-accent w-full opacity-60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {FRANCHISE_JOURNEY.map((item, index) => {
              const Icon = icons[index];
              return (
                <div
                  key={item.step}
                  className="glass-medium p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 relative"
                >
                  {/* Step Number Top Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-brand-accent">
                      {item.step}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full glass-pill text-brand-text-muted text-[10px] font-display uppercase tracking-widest border border-brand-border-subtle">
                      {item.duration}
                    </span>
                  </div>

                  <div>
                    {/* Icon Circle */}
                    <div className="w-12 h-12 rounded-2xl glass-light border border-brand-border flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-[11px] font-display uppercase tracking-[0.2em] text-brand-accent font-semibold mb-2">
                      {item.phase}
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-brand-text mb-3 leading-snug">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Milestone Action Tag */}
                  <div className="pt-4 border-t border-brand-border-subtle flex items-center justify-between text-xs font-semibold text-brand-accent group-hover:text-brand-text">
                    <span>{item.action}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Summary Ribbon */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-3 rounded-full glass-heavy border border-white/20 dark:border-white/10 text-xs font-display uppercase tracking-widest text-brand-text shadow-luxury">
            <span className="text-brand-accent font-bold">01 Explore</span>
            <span className="text-brand-text-muted">→</span>
            <span className="text-brand-accent font-bold">02 Understand</span>
            <span className="text-brand-text-muted">→</span>
            <span className="text-brand-accent font-bold">03 Trust</span>
            <span className="text-brand-text-muted">→</span>
            <span className="text-brand-accent font-bold">04 Apply</span>
          </div>
        </div>
      </div>
    </section>
  );
};
