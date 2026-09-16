# ☕ GREEN BEAN CAFE — Luxury Artisan Patisserie & 3D Franchise Website

[![Next.js](https://img.shields.io/badge/Next.js-14.2.23-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=flat&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

An Apple-inspired luxury web experience for **Green Bean Cafe**, a premium bakery and café franchise brand. Engineered for high performance, scroll-driven storytelling, and qualified franchise lead generation.

---

## ✨ Features

- **Apple-Inspired Physical Glassmorphism**: Custom multi-tiered glass tokens (`.glass-light`, `.glass-medium`, `.glass-heavy`, `.glass-pill`, `.glass-input`) with realistic specular highlights, beveled edges, and authentic background refraction.
- **Unobstructed Hero & Dynamic Reveal**: The hero displays an uninterrupted view of the signature cake and entrance at scroll 0, seamlessly sliding in a floating glass pill navbar upon scrolling.
- **Decoupled 60fps Scroller Engine**: High-performance canvas scrubbing using direct `requestAnimationFrame` and mutable refs, completely eliminating scroll-event React re-renders.
- **Interactive 3D Three.js Scenes**:
  - **Business Ecosystem 3D**: Dynamic central hub with orbiting satellite services (`Training`, `Marketing`, `Supply Chain`, `Operations`).
  - **Franchise Outlet 3D**: Architectural cutaway model featuring interactive hotspot beacons (`Patisserie Display`, `Espresso Bar`, `Customer Lounge`, `Assembly Station`).
  - **Strategic Store Presence 3D**: Interactive territory sphere highlighting metropolitan expansion clusters.
- **Smart Resource Management**: All 3D canvases use `IntersectionObserver` to pause rendering when scrolled out of view and cap DPR at 1.5 to maintain a rock-solid 60 FPS.
- **Transparent Product Repertoire**: High-resolution transparent PNG pastries and beverages floating over illuminated radial pedestals with natural drop shadows.
- **Multi-Theme Engine**: Instant, zero-reload switching between **Crème Classic**, **Cherry Blossom**, and **Midnight** with synchronized Three.js lighting and `localStorage` persistence.
- **Ambient Soundscape**: Procedurally generated acoustic harmonic pad using the Web Audio API with zero external media files.
- **Franchise Inquiries with Confetti**: Multi-field qualified franchise application form with client-side validation and celebration state.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, React 18)
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation**: GSAP & CSS Hardware Acceleration
- **Sound**: Native Web Audio API
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shubhamnaik25081999-gif/green-bean-cafe-franchise.git

# Navigate to project directory
cd green-bean-cafe-franchise

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
npm run build
npm run start
```

---

## ☁️ Deploying to Vercel

This project is 100% frontend-ready and requires zero environment variables, backend services, or database setups.

1. Push this repository to your GitHub account.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your `green-bean-cafe-franchise` repository.
4. Keep the default settings (Framework: Next.js) and click **Deploy**.

---

## 📄 License

MIT License. Concept prototype and design showcase.
