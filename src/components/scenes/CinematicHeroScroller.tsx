'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  TOTAL_FRAMES,
  OptimizedFrameLoader,
  renderFrameToCanvas,
} from '@/lib/frames';
import { ArrowDown, Sparkles, ChevronRight, Compass, Play, Pause } from 'lucide-react';

export const CinematicHeroScroller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<OptimizedFrameLoader | null>(null);

  // High-performance refs (avoiding React re-renders on scroll)
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number>(0);

  // Stage state: only updates when crossing major milestone thresholds
  const [activeStage, setActiveStage] = useState<'hero' | 'arrival' | 'discover'>('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAutoTouring, setIsAutoTouring] = useState(false);

  // Initialize loader
  useEffect(() => {
    const loader = new OptimizedFrameLoader();
    loaderRef.current = loader;

    loader.preloadInitial(() => {
      setIsLoaded(true);
    });
  }, []);

  // Direct canvas render function
  const renderCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loader = loaderRef.current;
    const img = loader?.getFrame(frameIdx);

    if (img && img.complete && img.naturalWidth > 0) {
      renderFrameToCanvas(ctx, img, canvas.width, canvas.height);
      lastDrawnFrameRef.current = frameIdx;
    }
  }, []);

  // Window resize handler (caps DPR at 1.5 for buttery 60fps)
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderCanvas(currentFrameRef.current);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [renderCanvas]);

  // Decoupled 60fps Scroll Listener
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const targetFrame = Math.floor(progress * (TOTAL_FRAMES - 1));
      currentFrameRef.current = targetFrame;

      // Update coarse stage only at boundaries (infrequent React re-render)
      if (progress < 0.24) {
        setActiveStage((prev) => (prev !== 'hero' ? 'hero' : prev));
      } else if (progress < 0.58) {
        setActiveStage((prev) => (prev !== 'arrival' ? 'arrival' : prev));
      } else {
        setActiveStage((prev) => (prev !== 'discover' ? 'discover' : prev));
      }

      if (!ticking) {
        ticking = true;
        rafIdRef.current = requestAnimationFrame(() => {
          if (currentFrameRef.current !== lastDrawnFrameRef.current) {
            renderCanvas(currentFrameRef.current);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderCanvas]);

  // Initial draw once loaded
  useEffect(() => {
    if (isLoaded) {
      renderCanvas(0);
    }
  }, [isLoaded, renderCanvas]);

  // Guided auto-tour
  useEffect(() => {
    if (!isAutoTouring || !containerRef.current) return;

    let tourRaf: number;
    let startTimestamp: number | null = null;
    const duration = 16000; // 16 seconds
    const startScrollY = window.scrollY;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(1, elapsed / duration);

      if (containerRef.current) {
        const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
        window.scrollTo({
          top: containerRef.current.offsetTop + progress * totalScrollable,
          behavior: 'auto',
        });
      }

      if (progress < 1) {
        tourRaf = requestAnimationFrame(step);
      } else {
        setIsAutoTouring(false);
      }
    };

    tourRaf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(tourRaf);
  }, [isAutoTouring]);

  return (
    <section
      id="cafe-experience"
      ref={containerRef}
      className="relative h-[450vh] w-full bg-brand-bg select-none"
    >
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Hardware-Accelerated Walkthrough Canvas */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Cinematic entrance and interior walkthrough of Green Bean Cafe"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Minimal Soft Vignette (Does NOT obscure the cake) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand-bg/60 via-transparent to-brand-bg/30" />

        {/* Initial Loading Indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-brand-bg/90 backdrop-blur-md px-6 text-center">
            <div className="w-12 h-12 rounded-full border-2 border-brand-accent/30 border-t-brand-accent animate-spin mb-4" />
            <span className="font-serif text-2xl font-bold text-brand-text mb-2">
              Green Bean Cafe
            </span>
            <p className="text-xs uppercase tracking-widest text-brand-text-muted font-display">
              Loading Cinematic Walkthrough
            </p>
          </div>
        )}

        {/* ============================================================
            OVERLAYS DESIGNED WITH CAKE VISIBILITY AS TOP PRIORITY
           ============================================================ */}

        {/* STAGE 1: HERO (Top of page, cake/entrance visible below) */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-start pt-20 sm:pt-28 px-4 sm:px-8 text-center transition-all duration-700 pointer-events-none ${
            activeStage === 'hero'
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Elegant Super Header Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs uppercase tracking-[0.25em] text-brand-accent font-display mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Premium Bakery & Specialty Cafe Franchise</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-brand-text leading-[1.1] mb-5 drop-shadow-sm">
              Turn Your Passion for Great Food{' '}
              <span className="text-gradient-gold block sm:inline">Into a Business.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-sm sm:text-lg text-brand-text-muted max-w-2xl mx-auto leading-relaxed mb-7 drop-shadow-sm">
              Build your own Green Bean Cafe with a proven brand, structured support and a clear path to growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-5">
              <a
                href="#enquiry"
                className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg group"
              >
                <span>Explore Franchise Opportunity</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  if (containerRef.current) {
                    const total = containerRef.current.offsetHeight - window.innerHeight;
                    window.scrollTo({
                      top: containerRef.current.offsetTop + total * 0.35,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="btn-secondary w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-brand-accent" />
                <span>Discover the Cafe</span>
              </button>
            </div>

            {/* Trust line */}
            <p className="text-[11px] font-display uppercase tracking-[0.25em] text-brand-text-muted/80">
              Built for entrepreneurs. Designed for growth.
            </p>
          </div>
        </div>

        {/* STAGE 2: SCENE 1 — ENTER (The Arrival, positioned on flank) */}
        <div
          className={`absolute inset-0 z-20 flex items-end sm:items-center justify-start p-6 sm:p-14 lg:p-20 transition-all duration-700 pointer-events-none ${
            activeStage === 'arrival'
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-md glass-medium p-7 sm:p-9 rounded-3xl text-left border border-white/30 shadow-2xl mb-12 sm:mb-0">
            <div className="flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.25em] text-brand-accent mb-2.5">
              <span className="w-5 h-[1.5px] bg-brand-accent" />
              <span>Scene 01 • The Arrival</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-text leading-snug mb-3">
              Step Into European Warmth.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-5">
              Natural light cascades over polished terrazzo, displaying fresh morning viennoiserie, single-origin espresso extraction, and warm oak finishes.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-border-subtle">
              <div>
                <span className="block font-serif text-xl font-bold text-brand-accent">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-brand-text-muted font-display">Specialty Arabica</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-brand-accent">72-Layer</span>
                <span className="text-[10px] uppercase tracking-wider text-brand-text-muted font-display">Normandy Butter Pastry</span>
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 3: SCENE 2 — DISCOVER (Placed on top/side so CAKE in center is 100% VISIBLE) */}
        <div
          className={`absolute inset-0 z-20 flex items-start sm:items-center justify-end p-6 sm:p-14 lg:p-20 transition-all duration-700 pointer-events-none ${
            activeStage === 'discover'
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-md glass-medium p-7 sm:p-9 rounded-3xl text-left border border-white/30 shadow-2xl mt-12 sm:mt-0">
            <div className="flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.25em] text-brand-accent mb-2.5">
              <span className="w-5 h-[1.5px] bg-brand-accent" />
              <span>Scene 02 • Sensory Depth</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-text leading-snug mb-3">
              More Than a Cafe.{' '}
              <span className="text-gradient-gold block">A Brand People Want to Be Part Of.</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-6">
              Witness the theatrical creation of our signature salted pecan torte: molten caramel glaze, roasted Georgia nuts, and rich cocoa layers engineered for daily customer devotion.
            </p>

            <a
              href="#brand-pillars"
              className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md"
            >
              <span>Explore Brand Pillars</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Minimal HUD Controls */}
        <div className="absolute bottom-5 left-6 right-6 lg:left-12 lg:right-12 z-30 flex items-center justify-between text-xs text-brand-text-muted pointer-events-auto">
          {/* Guided Tour Toggle */}
          <button
            onClick={() => setIsAutoTouring(!isAutoTouring)}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-light hover:text-brand-text transition-colors shadow-sm"
            title={isAutoTouring ? 'Pause tour' : 'Start auto tour'}
          >
            {isAutoTouring ? (
              <>
                <Pause className="w-3.5 h-3.5 text-brand-accent" />
                <span className="font-display tracking-wider uppercase text-[10px]">Pause Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-brand-accent" />
                <span className="font-display tracking-wider uppercase text-[10px]">Guided Tour</span>
              </>
            )}
          </button>

          {/* Scroll Prompt */}
          <div className="flex items-center gap-2 animate-bounce">
            <span className="font-display text-[10px] uppercase tracking-[0.25em]">Scroll to Enter</span>
            <ArrowDown className="w-3.5 h-3.5 text-brand-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};
