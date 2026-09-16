'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';
import { CITIES_PRESENCE, CityPresence } from '@/lib/data';
import { MapPin, Globe, Compass, CheckCircle2 } from 'lucide-react';

// 3D Network Globe / Grid
function NetworkGlobe({
  themeAccent,
  activeCityId,
  onSelectCity,
}: {
  themeAccent: string;
  activeCityId: string;
  onSelectCity: (city: CityPresence) => void;
}) {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
  });

  // 3D positions for the 4 sample cities distributed aesthetically on the 3D surface
  const cityPositions: Record<string, [number, number, number]> = {
    mumbai: [-1.4, 0.4, 1.8],
    pune: [-1.1, -0.2, 1.9],
    bengaluru: [-0.6, -1.2, 1.8],
    delhi: [-0.8, 1.5, 1.6],
  };

  return (
    <group ref={globeRef}>
      {/* Outer Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[2.4, 28, 28]} />
        <meshStandardMaterial
          color="#333333"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color="#1A1817"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Equatorial Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[2.55, 2.58, 48]} />
        <meshBasicMaterial color={themeAccent} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* City Hub Markers */}
      {CITIES_PRESENCE.map((city) => {
        const pos = cityPositions[city.id] || [0, 0, 2.4];
        const isSelected = activeCityId === city.id;

        return (
          <group key={city.id} position={pos}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectCity(city);
              }}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
              }}
            >
              <sphereGeometry args={[isSelected ? 0.22 : 0.14, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? themeAccent : '#D4AF37'}
                emissive={isSelected ? themeAccent : '#D4AF37'}
                emissiveIntensity={isSelected ? 1.0 : 0.4}
              />
            </mesh>

            <Html center distanceFactor={9} position={[0, 0.35, 0]}>
              <button
                onClick={() => onSelectCity(city)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-display uppercase tracking-widest whitespace-nowrap transition-all shadow-md ${
                  isSelected
                    ? 'bg-brand-accent text-white ring-2 ring-white scale-110 font-bold'
                    : 'bg-black/80 text-white/90 hover:bg-black'
                }`}
              >
                {city.name}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export const StorePresence3D: React.FC = () => {
  const { themeConfig } = useTheme();
  const [selectedCity, setSelectedCity] = useState<CityPresence>(CITIES_PRESENCE[0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Performance: Pause 3D canvas rendering when scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="presence"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-surface/35 border-t border-brand-border-subtle"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
            <Globe className="w-3.5 h-3.5 text-brand-gold" />
            <span>Target Metropolitan Territories</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            Strategic Store Presence.{' '}
            <span className="text-gradient-gold block sm:inline">Expansion Hubs.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
            Illustrative key metropolitan regions targeted for strategic territory clusters, flagship destinations, and high-frequency boutiques.
          </p>
          <span className="inline-block mt-3 text-[10px] font-display uppercase tracking-widest text-brand-text-muted/80 px-3 py-1 rounded-full glass-pill border border-brand-border-subtle">
            Illustrative sample territories for concept demonstration
          </span>
        </div>

        {/* Interactive 3D Network & Details Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Network Viewport (7 Cols) */}
          <div className="lg:col-span-7 h-[460px] sm:h-[540px] rounded-3xl glass-heavy relative overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl">
            <Canvas
              frameloop={isVisible ? 'always' : 'never'}
              dpr={[1, 1.5]}
              camera={{ position: [0, 1.2, 6.2], fov: 45 }}
              className="w-full h-full"
            >
              <ambientLight intensity={themeConfig.threeJs.ambientIntensity} color={themeConfig.threeJs.ambientColor} />
              <directionalLight position={[6, 8, 6]} intensity={1.8} color={themeConfig.threeJs.dirLightColor} />
              <pointLight position={[-4, -2, 2]} intensity={1.2} color={themeConfig.threeJs.accentLightColor} />

              <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                <NetworkGlobe
                  themeAccent={themeConfig.colors.accent}
                  activeCityId={selectedCity.id}
                  onSelectCity={setSelectedCity}
                />
              </Float>

              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>

            {/* City Selector Buttons */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5">
              {CITIES_PRESENCE.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1 rounded-full text-[11px] font-display uppercase tracking-wider transition-all ${
                    selectedCity.id === city.id
                      ? 'bg-brand-accent text-white shadow-md font-semibold ring-1 ring-brand-gold/50'
                      : 'glass-pill text-brand-text-muted hover:text-brand-text'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full glass-pill text-[11px] text-brand-text-muted flex items-center gap-2 pointer-events-none border border-white/10">
              <Compass className="w-3.5 h-3.5 text-brand-accent" />
              <span>Interactive 3D Sphere • Drag to rotate territories</span>
            </div>
          </div>

          {/* City Demographic & Territory Dossier (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-medium p-8 sm:p-10 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-display uppercase tracking-[0.2em] text-brand-accent font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedCity.status}</span>
                </span>
                <span className="text-[11px] font-mono text-brand-text-muted">
                  Cluster Zone
                </span>
              </div>

              <h3 className="font-serif text-4xl font-bold text-brand-text mb-2">
                {selectedCity.name}
              </h3>

              <p className="font-serif italic text-sm text-brand-accent mb-4">
                {selectedCity.tagline}
              </p>

              <p className="font-sans text-sm text-brand-text-muted leading-relaxed mb-6">
                {selectedCity.vibe}
              </p>

              {/* Sample Formats Planned */}
              <div className="p-4 rounded-2xl glass-light border border-white/15 dark:border-white/5 mb-6">
                <span className="text-xs font-display uppercase tracking-wider text-brand-text-muted block mb-3 font-semibold">
                  Illustrative Formats for Territory:
                </span>
                <div className="space-y-2">
                  {selectedCity.storeFormats.map((fmt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-brand-text">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                      <span>{fmt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#enquiry"
                className="btn-primary w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-center block shadow-luxury"
              >
                Inquire for {selectedCity.name} Territory
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
