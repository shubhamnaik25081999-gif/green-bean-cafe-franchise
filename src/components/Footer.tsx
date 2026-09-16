'use client';

import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-surface border-t border-brand-border py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src="/products/green-bear-seal.png"
                  alt="Green Bean Crest"
                  className="w-12 h-12 rounded-full object-contain filter drop-shadow-md"
                />
                <div>
                  <span className="font-serif font-bold text-xl tracking-wider text-brand-text uppercase block">
                    Green Bean Cafe
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text-muted font-display block">
                    Artisan Patisserie & Specialty Cafe
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed max-w-sm mb-6">
                Turn your passion for great food into an enduring enterprise. A proven luxury bakery ecosystem with structured training, centralized commissary support, and distinguished brand prestige.
              </p>
            </div>

            <div className="text-[11px] text-brand-text-muted/80">
              Built for visionary entrepreneurs. Designed for enduring growth.
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-display uppercase tracking-[0.2em] text-brand-accent font-semibold mb-4">
              Explore The Experience
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-text-muted">
              <li>
                <a href="#cafe-experience" className="hover:text-brand-accent transition-colors">
                  Cinematic Walkthrough
                </a>
              </li>
              <li>
                <a href="#brand-pillars" className="hover:text-brand-accent transition-colors">
                  The Six Brand Pillars
                </a>
              </li>
              <li>
                <a href="#business-ecosystem" className="hover:text-brand-accent transition-colors">
                  3D Business Ecosystem
                </a>
              </li>
              <li>
                <a href="#outlet-3d" className="hover:text-brand-accent transition-colors">
                  3D Outlet Architecture
                </a>
              </li>
              <li>
                <a href="#opportunity" className="hover:text-brand-accent transition-colors">
                  Franchise Store Formats
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-accent transition-colors">
                  Artisan Product Showcase
                </a>
              </li>
            </ul>
          </div>

          {/* Governance & Franchise Inquiries (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-display uppercase tracking-[0.2em] text-brand-accent font-semibold mb-4">
                Territory Inquiries
              </h4>
              <p className="text-xs text-brand-text-muted leading-relaxed mb-4">
                Franchise development reviews are conducted on a rolling basis. Priority is given to multi-unit developers and prime high-street commercial real estate owners.
              </p>
              <div className="p-3.5 rounded-2xl glass-light border border-white/15 dark:border-white/5 text-xs text-brand-text">
                <span className="font-semibold text-brand-accent">Inquiry Hotline:</span>
                <span className="block text-brand-text-muted mt-0.5">franchise@greenbearcafe.demo</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs font-display uppercase tracking-widest text-brand-text-muted hover:text-brand-accent transition-all mt-6 w-fit"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Concept Disclaimer Bar */}
        <div className="pt-8 border-t border-brand-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-text-muted">
          <p>
            © {new Date().getFullYear()} Green Bean Cafe Franchise Group. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Concept Prototype & Portfolio Demonstration. No legal or financial offer made herein.
          </p>
        </div>
      </div>
    </footer>
  );
};
