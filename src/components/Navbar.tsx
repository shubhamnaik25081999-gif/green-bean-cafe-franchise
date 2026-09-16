'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme, ThemeMode } from '@/context/ThemeContext';
import { soundscape } from '@/lib/audio';
import { Volume2, VolumeX, Menu, X, Coffee, Flower2, Moon, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When at the top (under 75px), navbar is completely hidden
      if (currentScrollY < 75) {
        setIsVisible(false);
      } else {
        // Revealed when scrolled past 75px
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    if (!soundscape) return;
    const playing = soundscape.toggle();
    setIsPlayingAudio(playing);
  };

  const navLinks = [
    { label: 'Home', href: '#cafe-experience' },
    { label: 'Why Us', href: '#brand-pillars' },
    { label: 'Franchise', href: '#opportunity' },
    { label: 'Products', href: '#products' },
    { label: 'Stores', href: '#presence' },
    { label: 'FAQs', href: '#faqs' },
  ];

  const themeOptions: { id: ThemeMode; label: string; icon: any }[] = [
    { id: 'creme', label: 'Crème', icon: Coffee },
    { id: 'sakura', label: 'Sakura', icon: Flower2 },
    { id: 'midnight', label: 'Midnight', icon: Moon },
  ];

  return (
    <header
      className={`fixed top-4 sm:top-5 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-pill rounded-full py-2.5 px-4 sm:px-6 flex items-center justify-between shadow-luxury pointer-events-auto transition-all duration-300">
          {/* Brand Crest Logo */}
          <a href="#cafe-experience" className="group flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-accent/50 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform duration-300 shadow-inner">
              <span className="font-serif font-bold text-xs tracking-tighter">GB</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm sm:text-base tracking-wider text-brand-text uppercase leading-tight">
                Green Bean Cafe
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-brand-text-muted font-display">
                Franchise
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-display uppercase tracking-widest text-brand-text-muted hover:text-brand-accent transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions: Theme Switcher + Audio + Strongest CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Switcher Pill */}
            <div className="flex items-center bg-brand-bg/40 border border-brand-border-subtle rounded-full p-0.5">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const isActive = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTheme(opt.id)}
                    title={`Switch to ${opt.label} Theme`}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-accent text-white shadow-sm'
                        : 'text-brand-text-muted hover:text-brand-text'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Ambient Soundscape Button */}
            <button
              onClick={toggleSound}
              aria-label="Toggle ambient cafe soundscape"
              title={isPlayingAudio ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
              className={`p-2 rounded-full border transition-all duration-200 ${
                isPlayingAudio
                  ? 'bg-brand-accent/20 border-brand-accent text-brand-accent shadow-glow'
                  : 'bg-brand-bg/40 border-brand-border-subtle text-brand-text-muted hover:text-brand-text'
              }`}
            >
              {isPlayingAudio ? (
                <div className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-brand-accent animate-ping" />
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Primary Strongest CTA: Explore Franchise */}
            <a
              href="#enquiry"
              className="btn-primary px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Franchise</span>
            </a>
          </div>

          {/* Mobile Hamburger & Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-full bg-brand-bg/50 border border-brand-border-subtle text-brand-text"
              aria-label="Toggle sound"
            >
              {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-brand-accent" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-full bg-brand-bg/50 border border-brand-border-subtle text-brand-text"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glass Dropdown Menu */}
      {isMobileMenuOpen && isVisible && (
        <div className="lg:hidden max-w-sm mx-auto mt-2 px-4 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="glass-medium rounded-3xl p-6 border border-brand-border shadow-2xl flex flex-col gap-4">
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-display tracking-widest uppercase text-brand-text hover:text-brand-accent py-1.5 border-b border-brand-border-subtle"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] font-display uppercase tracking-wider text-brand-text-muted">
                <span>Theme:</span>
                <div className="flex gap-1">
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setTheme(opt.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                        theme === opt.id
                          ? 'bg-brand-accent text-white border-brand-accent'
                          : 'bg-brand-bg/40 text-brand-text border-brand-border-subtle'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="#enquiry"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full py-3 rounded-full text-center text-xs font-semibold tracking-wider uppercase shadow-md"
              >
                Explore Franchise
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
