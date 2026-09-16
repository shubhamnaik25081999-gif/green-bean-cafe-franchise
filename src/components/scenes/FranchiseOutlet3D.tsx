'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';
import { OUTLET_HOTSPOTS, OutletHotspot } from '@/lib/data';
import { Store, Eye, Info, Check } from 'lucide-react';

// Stylized 3D Cafe Outlet Architectural Cutaway
function CafeArchitecture({
  themeAccent,
  groundColor,
  activeHotspotId,
  onSelectHotspot,
}: {
  themeAccent: string;
  groundColor: string;
  activeHotspotId: string;
  onSelectHotspot: (h: OutletHotspot) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Floor Foundation Slab */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[6.8, 0.3, 6.8]} />
        <meshStandardMaterial color={groundColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Decorative Marble Inset */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[6.4, 0.02, 6.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Back Feature Wall (Warm Fluted Brand Green) */}
      <mesh position={[0, 1.4, -3.2]}>
        <boxGeometry args={[6.4, 2.8, 0.2]} />
        <meshStandardMaterial color="#223626" roughness={0.7} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-3.2, 1.4, 0]}>
        <boxGeometry args={[0.2, 2.8, 6.4]} />
        <meshStandardMaterial color="#2E241F" roughness={0.8} />
      </mesh>

      {/* Front Entrance Glass Facade Arch & Awning */}
      <group position={[0, 1.5, 3.1]}>
        {/* Glass Panels */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6.2, 2.6, 0.05]} />
          <meshPhysicalMaterial
            color="#D1E8ED"
            transparent
            opacity={0.35}
            roughness={0.1}
          />
        </mesh>
        {/* Awning Canopy */}
        <mesh position={[0, 1.3, 0.5]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[6.4, 0.12, 1.2]} />
          <meshStandardMaterial color="#1E382B" roughness={0.5} />
        </mesh>
        {/* Illuminated Signage Bar */}
        <mesh position={[0, 1.4, 0.6]}>
          <boxGeometry args={[3.0, 0.3, 0.1]} />
          <meshStandardMaterial color={themeAccent} emissive={themeAccent} emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Bakery & Patisserie Counter (L-Shape) */}
      <group position={[-1.2, 0.55, 0.5]}>
        <mesh>
          <boxGeometry args={[2.6, 1.1, 1.0]} />
          <meshStandardMaterial color="#3E3028" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.56, 0]}>
          <boxGeometry args={[2.7, 0.06, 1.1]} />
          <meshStandardMaterial color="#FAFAFA" roughness={0.2} />
        </mesh>
        {/* Glass Cake Showcase with Glowing Interior Light */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[2.3, 0.65, 0.85]} />
          <meshPhysicalMaterial color="#FFFFFF" transparent opacity={0.35} roughness={0.1} />
        </mesh>
        {/* Illuminated Cake Displays inside */}
        <mesh position={[-0.6, 0.7, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} />
        </mesh>
        <mesh position={[0.5, 0.7, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} />
        </mesh>
      </group>

      {/* Specialty Espresso Bar */}
      <group position={[1.4, 0.55, 0.5]}>
        <mesh>
          <boxGeometry args={[1.7, 1.1, 1.0]} />
          <meshStandardMaterial color="#3E3028" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.56, 0]}>
          <boxGeometry args={[1.8, 0.06, 1.1]} />
          <meshStandardMaterial color="#FAFAFA" roughness={0.2} />
        </mesh>
        {/* Espresso Machine */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.8, 0.45, 0.5]} />
          <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Customer Lounge Seating */}
      <group position={[0, 0, -1.7]}>
        {/* Banquette Sofa */}
        <mesh position={[0, 0.4, -1.2]}>
          <boxGeometry args={[5.0, 0.65, 0.65]} />
          <meshStandardMaterial color="#6B4D3C" roughness={0.8} />
        </mesh>
        {/* Cafe Tables */}
        {[-1.5, 0, 1.5].map((tx, idx) => (
          <group key={idx} position={[tx, 0, -0.4]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 0.04, 16]} />
              <meshStandardMaterial color="#33241C" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Back Prep Area */}
      <group position={[-2.1, 0.5, -2.3]}>
        <mesh>
          <boxGeometry args={[1.5, 1.0, 0.85]} />
          <meshStandardMaterial color="#A3AAA7" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* 3D Hotspot Interactive Markers */}
      {OUTLET_HOTSPOTS.map((hotspot) => {
        const isSelected = activeHotspotId === hotspot.id;
        return (
          <group key={hotspot.id} position={hotspot.position}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot(hotspot);
              }}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
              }}
            >
              <sphereGeometry args={[isSelected ? 0.26 : 0.18, 12, 12]} />
              <meshStandardMaterial
                color={isSelected ? themeAccent : '#D4AF37'}
                emissive={isSelected ? themeAccent : '#D4AF37'}
                emissiveIntensity={isSelected ? 0.9 : 0.4}
              />
            </mesh>

            <Html center distanceFactor={9} position={[0, 0.35, 0]}>
              <button
                onClick={() => onSelectHotspot(hotspot)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-display uppercase tracking-widest whitespace-nowrap transition-all shadow-md ${
                  isSelected
                    ? 'bg-brand-accent text-white scale-110 ring-2 ring-white font-bold'
                    : 'glass-light text-brand-text hover:text-brand-accent'
                }`}
              >
                {hotspot.title}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export const FranchiseOutlet3D: React.FC = () => {
  const { themeConfig } = useTheme();
  const [selectedHotspot, setSelectedHotspot] = useState<OutletHotspot>(OUTLET_HOTSPOTS[0]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '150px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="outlet-3d"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-bg border-t border-brand-border-subtle overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
            <Store className="w-3.5 h-3.5 text-brand-gold" />
            <span>Scene 05 • Franchise Outlet Architecture</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            Anatomy of a High-Yield Cafe.{' '}
            <span className="text-gradient-gold block sm:inline">3D Interactive Tour.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
            Explore the spatial ergonomics and customer flow engineered into every square foot of a Green Bear Cafe outlet.
          </p>
        </div>

        {/* 3D Viewport & Specification Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Canvas Viewport (8 Cols) */}
          <div className="lg:col-span-8 h-[460px] sm:h-[550px] rounded-3xl glass-light relative overflow-hidden border border-brand-border-subtle shadow-luxury">
            {isInView ? (
              <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [6.2, 5.2, 6.2], fov: 40 }}
                className="w-full h-full"
              >
                <ambientLight intensity={themeConfig.threeJs.ambientIntensity * 0.85} color={themeConfig.threeJs.ambientColor} />
                <directionalLight
                  position={[8, 10, 6]}
                  intensity={themeConfig.threeJs.dirLightIntensity * 0.9}
                  color={themeConfig.threeJs.dirLightColor}
                />
                <pointLight position={[-3, 2.5, -2]} intensity={1.0} color={themeConfig.threeJs.accentLightColor} />

                <CafeArchitecture
                  themeAccent={themeConfig.colors.accent}
                  groundColor={themeConfig.threeJs.groundColor}
                  activeHotspotId={selectedHotspot.id}
                  onSelectHotspot={setSelectedHotspot}
                />

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2.3}
                  minPolarAngle={Math.PI / 4.5}
                />
              </Canvas>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-brand-text-muted">
                Rendering Architecture...
              </div>
            )}

            {/* Hotspot buttons */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5 max-w-[85%]">
              {OUTLET_HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`px-3 py-1 rounded-full text-[10px] font-display uppercase tracking-wider transition-all ${
                    selectedHotspot.id === h.id
                      ? 'bg-brand-accent text-white shadow-sm font-semibold'
                      : 'glass-light text-brand-text-muted hover:text-brand-text'
                  }`}
                >
                  {h.title}
                </button>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full glass-light border border-white/20 text-[10px] text-brand-text-muted flex items-center gap-2 pointer-events-none">
              <Eye className="w-3.5 h-3.5 text-brand-accent" />
              <span>Drag to orbit 360° • Click hotspots for specs</span>
            </div>
          </div>

          {/* Apple Glass Hotspot Specification Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="glass-medium p-8 rounded-3xl border border-white/30 shadow-luxury relative">
              <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-accent mb-2">
                <Info className="w-3.5 h-3.5" />
                <span>Zone Specification</span>
              </div>

              <div className="text-[10px] uppercase tracking-wider text-brand-text-muted font-display mb-1">
                {selectedHotspot.area}
              </div>

              <h3 className="font-serif text-3xl font-bold text-brand-text mb-3">
                {selectedHotspot.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-6">
                {selectedHotspot.description}
              </p>

              <div className="p-4 rounded-2xl glass-light border border-white/20">
                <span className="text-[10px] font-display uppercase tracking-wider text-brand-accent font-semibold block mb-1">
                  Franchise Standard:
                </span>
                <p className="text-xs text-brand-text font-medium leading-relaxed">
                  {selectedHotspot.keyFeature}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-brand-border-subtle flex items-center gap-2 text-xs text-brand-text font-medium">
                <Check className="w-4 h-4 text-brand-accent" />
                <span>Turnkey architectural fit-out package provided.</span>
              </div>
            </div>

            <a
              href="#opportunity"
              className="btn-primary py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase text-center block shadow-lg"
            >
              View Franchise Store Models
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
