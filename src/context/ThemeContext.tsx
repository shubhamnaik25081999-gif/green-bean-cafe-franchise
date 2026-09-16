'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'creme' | 'sakura' | 'midnight';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  tagline: string;
  colors: {
    bg: string;
    surface: string;
    surfaceElevated: string;
    text: string;
    textMuted: string;
    accent: string;
    accentHover: string;
    gold: string;
    border: string;
    borderSubtle: string;
    card: string;
    highlight: string;
  };
  threeJs: {
    ambientColor: string;
    ambientIntensity: number;
    dirLightColor: string;
    dirLightIntensity: number;
    accentLightColor: string;
    accentLightIntensity: number;
    fogColor: string;
    fogDensity: number;
    particleColor: string;
    groundColor: string;
    specularColor: string;
  };
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  creme: {
    id: 'creme',
    name: 'Crème Classic',
    tagline: 'Warm & Artisanal Elegance',
    colors: {
      bg: '#FAF7F2',
      surface: '#F4ECE1',
      surfaceElevated: '#FFFFFF',
      text: '#1C1512',
      textMuted: '#685950',
      accent: '#C88A3A', // Warm caramel
      accentHover: '#B2762A',
      gold: '#D4AF37', // Muted gold
      border: 'rgba(28, 21, 18, 0.12)',
      borderSubtle: 'rgba(28, 21, 18, 0.06)',
      card: 'rgba(255, 255, 255, 0.85)',
      highlight: '#F3E5D4',
    },
    threeJs: {
      ambientColor: '#FFF8EE',
      ambientIntensity: 1.1,
      dirLightColor: '#FFEBD0',
      dirLightIntensity: 1.8,
      accentLightColor: '#E6A15C',
      accentLightIntensity: 1.2,
      fogColor: '#FAF7F2',
      fogDensity: 0.025,
      particleColor: '#C88A3A',
      groundColor: '#EDE5D8',
      specularColor: '#FFFFFF',
    },
  },
  sakura: {
    id: 'sakura',
    name: 'Cherry Blossom',
    tagline: 'Editorial & Soft Poise',
    colors: {
      bg: '#FDF8F9',
      surface: '#F7EBF0',
      surfaceElevated: '#FFFFFF',
      text: '#282124',
      textMuted: '#705E65',
      accent: '#B85D75', // Muted rose burgundy
      accentHover: '#A04B62',
      gold: '#D8A4B8', // Soft blush gold
      border: 'rgba(40, 33, 36, 0.11)',
      borderSubtle: 'rgba(40, 33, 36, 0.05)',
      card: 'rgba(255, 255, 255, 0.88)',
      highlight: '#FCE7EE',
    },
    threeJs: {
      ambientColor: '#FFF0F5',
      ambientIntensity: 1.2,
      dirLightColor: '#FFE4E9',
      dirLightIntensity: 1.6,
      accentLightColor: '#E898AC',
      accentLightIntensity: 1.4,
      fogColor: '#FDF8F9',
      fogDensity: 0.022,
      particleColor: '#EAA9BC',
      groundColor: '#F4E4EB',
      specularColor: '#FFF5F8',
    },
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    tagline: 'Cinematic & Sophisticated',
    colors: {
      bg: '#0C0A0A',
      surface: '#181514',
      surfaceElevated: '#221E1C',
      text: '#F5EEE6',
      textMuted: '#A69B94',
      accent: '#D4AF37', // Champagne Gold
      accentHover: '#C29C28',
      gold: '#CBB279',
      border: 'rgba(212, 175, 55, 0.18)',
      borderSubtle: 'rgba(245, 238, 230, 0.08)',
      card: 'rgba(24, 21, 20, 0.85)',
      highlight: '#2A2420',
    },
    threeJs: {
      ambientColor: '#28201D',
      ambientIntensity: 0.7,
      dirLightColor: '#FFE7B8',
      dirLightIntensity: 2.2,
      accentLightColor: '#C93B4E', // Rich berry rim light
      accentLightIntensity: 1.5,
      fogColor: '#0C0A0A',
      fogDensity: 0.035,
      particleColor: '#CBB279',
      groundColor: '#120F0F',
      specularColor: '#FFD799',
    },
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'creme',
  themeConfig: THEMES.creme,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('creme');

  useEffect(() => {
    // Read from localStorage on client mount
    try {
      const savedTheme = localStorage.getItem('gbc_theme') as ThemeMode;
      if (savedTheme && THEMES[savedTheme]) {
        setThemeState(savedTheme);
      }
    } catch {
      // ignore
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('gbc_theme', newTheme);
    } catch {
      // ignore
    }
  };

  const themeConfig = THEMES[theme];

  // Update CSS Variables & Root Theme Class
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.classList.remove('theme-creme', 'theme-sakura', 'theme-midnight');
    root.classList.add(`theme-${theme}`);

    // Map CSS variables
    const c = themeConfig.colors;
    root.style.setProperty('--color-bg', c.bg);
    root.style.setProperty('--color-surface', c.surface);
    root.style.setProperty('--color-surface-elevated', c.surfaceElevated);
    root.style.setProperty('--color-text', c.text);
    root.style.setProperty('--color-text-muted', c.textMuted);
    root.style.setProperty('--color-accent', c.accent);
    root.style.setProperty('--color-accent-hover', c.accentHover);
    root.style.setProperty('--color-gold', c.gold);
    root.style.setProperty('--color-border', c.border);
    root.style.setProperty('--color-border-subtle', c.borderSubtle);
    root.style.setProperty('--color-card', c.card);
    root.style.setProperty('--color-highlight', c.highlight);

    // Document background
    document.body.style.backgroundColor = c.bg;
    document.body.style.color = c.text;
  }, [theme, themeConfig]);

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
