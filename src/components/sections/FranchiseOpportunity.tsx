'use client';

import React, { useState } from 'react';
import { FRANCHISE_MODELS, FranchiseModel } from '@/lib/data';
import { Sparkles, MapPin, Maximize2, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

export const FranchiseOpportunity: React.FC = () => {
  const [activeModel, setActiveModel] = useState<FranchiseModel>(FRANCHISE_MODELS[0]);

  return (
    <section
      id="opportunity"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-surface/35 border-t border-brand-border-subtle"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>The Franchise Blueprint</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            Build a Business Around a Brand{' '}
            <span className="text-gradient-gold block sm:inline">People Love.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
            Scalable formats crafted for prominent lifestyle destinations, affluent residential catchments, and high-energy urban thoroughfares.
          </p>
        </div>

        {/* Model Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-brand-surface border border-brand-border shadow-inner gap-1 sm:gap-2">
            {FRANCHISE_MODELS.map((model) => {
              const isActive = activeModel.id === model.id;
              return (
                <button
                  key={model.id}
                  onClick={() => setActiveModel(model)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-accent text-white shadow-md font-semibold'
                      : 'text-brand-text-muted hover:text-brand-text'
                  }`}
                >
                  {model.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Model Feature Card */}
        <div className="glass-heavy rounded-3xl p-8 sm:p-12 border border-white/20 dark:border-white/10 shadow-2xl mb-16 relative overflow-hidden">
          {/* Subtle Green Bean Seal Watermark */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none select-none">
            <img
              src="/products/green-bear-seal.png"
              alt="Seal Watermark"
              className="w-full h-full object-contain filter invert dark:invert-0"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Model Specs & Highlights (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-brand-accent/30 text-brand-accent text-xs font-display uppercase tracking-wider mb-4">
                <span>Format: {activeModel.format}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text mb-4">
                {activeModel.title}
              </h3>

              <p className="font-sans text-base text-brand-text-muted mb-8 leading-relaxed">
                {activeModel.highlight}
              </p>

              {/* Spatial Requirements Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl glass-light border border-white/15 dark:border-white/5 flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center text-brand-accent flex-shrink-0">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-display uppercase tracking-wider text-brand-text-muted block">
                      Target Footprint
                    </span>
                    <span className="font-serif font-bold text-base text-brand-text">
                      {activeModel.footprint}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl glass-light border border-white/15 dark:border-white/5 flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center text-brand-accent flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-display uppercase tracking-wider text-brand-text-muted block">
                      Ideal Location Profile
                    </span>
                    <span className="font-sans font-medium text-xs text-brand-text line-clamp-1">
                      {activeModel.idealLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <span className="text-xs font-display uppercase tracking-wider text-brand-text-muted block font-semibold">
                  Format Specifications & Architecture:
                </span>
                {activeModel.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-brand-text">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="leading-normal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Architectural Summary Card (5 cols) */}
            <div className="lg:col-span-5 p-8 rounded-2xl glass-medium border border-white/20 dark:border-white/10 shadow-luxury flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-6 shadow-glow">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-brand-text mb-3">
                  Turnkey Deployment Support
                </h4>
                <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-6">
                  From commercial lease negotiations to bespoke interior millwork, equipment installation, and grand opening PR, our central expansion team guides every phase of your store launch.
                </p>

                <div className="space-y-2.5 mb-8 text-xs font-medium text-brand-text">
                  <div className="flex items-center justify-between py-2 border-b border-brand-border-subtle">
                    <span className="text-brand-text-muted">Kitchen & Bar Setup</span>
                    <span className="text-brand-accent font-semibold">Standardized OEM Equipment</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-brand-border-subtle">
                    <span className="text-brand-text-muted">Staff Onboarding</span>
                    <span className="text-brand-accent font-semibold">Green Bean Academy Certified</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-brand-border-subtle">
                    <span className="text-brand-text-muted">Supply Network</span>
                    <span className="text-brand-accent font-semibold">Cold-Chain Temperature Controlled</span>
                  </div>
                </div>
              </div>

              <a
                href="#enquiry"
                className="btn-primary w-full py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-2 group shadow-luxury"
              >
                <span>Inquire for this Format</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
