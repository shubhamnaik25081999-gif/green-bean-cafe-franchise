import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--color-bg)",
          surface: "var(--color-surface)",
          "surface-elevated": "var(--color-surface-elevated)",
          text: "var(--color-text)",
          "text-muted": "var(--color-text-muted)",
          accent: "var(--color-accent)",
          "accent-hover": "var(--color-accent-hover)",
          gold: "var(--color-gold)",
          border: "var(--color-border)",
          "border-subtle": "var(--color-border-subtle)",
          card: "var(--color-card)",
          highlight: "var(--color-highlight)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "luxury": "0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px var(--color-border)",
        "luxury-hover": "0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 0 1px 1px var(--color-gold)",
        "glow": "0 0 25px var(--color-gold)",
      },
    },
  },
  plugins: [],
};

export default config;
