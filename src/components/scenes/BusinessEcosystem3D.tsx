'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';
import { BUSINESS_NODES, BusinessNode } from '@/lib/data';
import { Network, ArrowRight, CheckCircle2 } from 'lucide-react';

// 3D Central Node
function CenterBrandNode({ themeColor }: { themeColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color={themeColor}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.68, 32]} />
        <meshBasicMaterial color={themeColor} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      <Html center position={[0, 0, 0]} distanceFactor={11} zIndexRange={[10, 0]}>
        <div className="pointer-events-none select-none px-3.5 py-1.5 rounded-full glass-heavy text-brand-text border border-white/30 text-center whitespace-nowrap shadow-xl">
          <span className="font-serif font-bold text-xs tracking-wider block">GREEN BEAR CAFE</span>
          <span className="text-[8px] uppercase tracking-widest text-brand-gold font-display">Core Hub</span>
        </div>
      </Html>
    </group>
  );
}

// 3D Destination Node: "YOUR OUTLET"
function YourOutletNode({ accentColor, isHovered }: { accentColor: string; isHovered: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group ref={ref} position={[0, -2.3, 1.2]}>
      <mesh>
        <cylinderGeometry args={[0.85, 1.05, 0.45, 6]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <Html center position={[0, -0.55, 0]} distanceFactor={10}>
        <div className="pointer-events-none select-none px-3 py-1 rounded-full btn-primary text-[10px] font-bold tracking-wider whitespace-nowrap shadow-glow">
          ★ YOUR OUTLET
        </div>
      </Html>
    </group>
  );
}

// 3D Satellite Node
function SatelliteNode({
  node,
  angle,
  radius,
  isSelected,
  onSelect,
  accentColor,
}: {
  node: BusinessNode;
  angle: number;
  radius: number;
  isSelected: boolean;
  onSelect: () => void;
  accentColor: string;
}) {
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius * 0.75;
  const y = Math.sin(angle * 2) * 0.35 + 0.25;

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group position={[x, y, z]}>
      <primitive
        object={new THREE.Line(
          lineGeo,
          new THREE.LineBasicMaterial({
            color: isSelected ? accentColor : '#999999',
            transparent: true,
            opacity: isSelected ? 0.8 : 0.2,
          })
        )}
        position={[-x, -y, -z]}
      />

      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[isSelected ? 0.5 : 0.38, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? accentColor : '#A8998C'}
          emissive={isSelected ? accentColor : '#000000'}
          emissiveIntensity={isSelected ? 0.4 : 0}
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>

      <Html center position={[0, 0.65, 0]} distanceFactor={11}>
        <button
          onClick={onSelect}
          className={`px-2.5 py-1 rounded-full text-[9px] font-display uppercase tracking-widest whitespace-nowrap transition-all shadow-md ${
            isSelected
              ? 'bg-brand-accent text-white ring-2 ring-white scale-110 font-bold'
              : 'glass-light text-brand-text hover:text-brand-accent'
          }`}
        >
          {node.name}
        </button>
      </Html>
    </group>
  );
}

export const BusinessEcosystem3D: React.FC = () => {
  const { themeConfig } = useTheme();
  const [selectedNode, setSelectedNode] = useState<BusinessNode>(BUSINESS_NODES[0]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Viewport Intersection Observer: pauses 3D rendering when offscreen
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

  const radius = 3.6;

  return (
    <section
      id="business-ecosystem"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-surface/30 border-t border-brand-border-subtle overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
            <Network className="w-3.5 h-3.5 text-brand-gold" />
            <span>Scene 04 • Business Ecosystem</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            You Are Not Buying a Name.{' '}
            <span className="text-gradient-gold block sm:inline">You Are Entering an Ecosystem.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
            A continuous ring of standardized support feeds directly into your outlet—guaranteeing operational harmony, supply integrity, and sustained footfall.
          </p>
        </div>

        {/* 3D Viewport & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Canvas Viewport (7 cols) */}
          <div className="lg:col-span-7 h-[440px] sm:h-[520px] rounded-3xl glass-light relative overflow-hidden border border-brand-border-subtle shadow-luxury">
            {isInView ? (
              <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 2.2, 7.2], fov: 46 }}
                className="w-full h-full"
              >
                <ambientLight intensity={themeConfig.threeJs.ambientIntensity * 0.8} color={themeConfig.threeJs.ambientColor} />
                <directionalLight
                  position={[5, 8, 5]}
                  intensity={themeConfig.threeJs.dirLightIntensity * 0.9}
                  color={themeConfig.threeJs.dirLightColor}
                />
                <pointLight
                  position={[-3, -2, -2]}
                  intensity={1.0}
                  color={themeConfig.threeJs.accentLightColor}
                />

                <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
                  <CenterBrandNode themeColor={themeConfig.colors.accent} />

                  {BUSINESS_NODES.map((node, i) => {
                    const angle = (i / BUSINESS_NODES.length) * Math.PI * 2;
                    return (
                      <SatelliteNode
                        key={node.id}
                        node={node}
                        angle={angle}
                        radius={radius}
                        isSelected={selectedNode.id === node.id}
                        onSelect={() => setSelectedNode(node)}
                        accentColor={themeConfig.colors.accent}
                      />
                    );
                  })}

                  <YourOutletNode accentColor={themeConfig.colors.gold} isHovered={true} />
                </Float>

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 3} />
              </Canvas>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-brand-text-muted">
                Entering 3D Space...
              </div>
            )}

            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full glass-light border border-white/20 text-[10px] text-brand-text-muted flex items-center gap-2 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              <span>Interactive 3D • Drag to orbit & click nodes</span>
            </div>
          </div>

          {/* Right Info Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Quick Node Selector Pills */}
            <div className="flex flex-wrap gap-1.5 mb-1">
              {BUSINESS_NODES.map((node) => {
                const isActive = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-display uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-brand-accent text-white shadow-sm font-semibold'
                        : 'glass-light text-brand-text-muted hover:text-brand-text'
                    }`}
                  >
                    {node.name}
                  </button>
                );
              })}
            </div>

            {/* Apple Glass Selected Node Details Card */}
            <div className="glass-medium p-8 rounded-3xl border border-white/30 shadow-luxury relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-display uppercase tracking-[0.2em] text-brand-accent font-semibold">
                  {selectedNode.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-full glass-light text-brand-text-muted text-[10px] font-mono">
                  Active Node
                </span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-brand-text mb-3">
                {selectedNode.name}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-6">
                {selectedNode.details}
              </p>

              {/* Metrics Badge */}
              <div className="p-4 rounded-2xl glass-light border border-white/20 flex items-center justify-between mb-6">
                <span className="text-[11px] text-brand-text-muted font-display uppercase tracking-wider">
                  {selectedNode.metricsLabel}
                </span>
                <span className="font-serif font-bold text-sm text-brand-accent">
                  {selectedNode.metricsValue}
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-xs text-brand-text">
                <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Synchronized directly with your local outlet daily.</span>
              </div>
            </div>

            <a
              href="#outlet-3d"
              className="btn-secondary py-3 px-6 rounded-full text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-2 group"
            >
              <span>Inspect 3D Outlet Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
