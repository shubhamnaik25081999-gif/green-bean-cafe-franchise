'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '@/lib/data';
import { Sparkles, Coffee, Cake, Croissant, UtensilsCrossed, Star } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Creations', icon: Star },
    { id: 'signature', label: 'Signature Cakes', icon: Cake },
    { id: 'celebration', label: 'Celebration Cakes', icon: Sparkles },
    { id: 'pastries', label: 'Artisan Pastries', icon: Croissant },
    { id: 'desserts', label: 'Desserts & Tarts', icon: UtensilsCrossed },
    { id: 'coffee', label: 'Specialty Coffee', icon: Coffee },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  // High-resolution transparent PNG and local image mappings
  const productImages: Record<string, { src: string; isPng: boolean }> = {
    'pecan-caramel-torte': { src: '/products/hero-pecan-cake.png', isPng: true },
    'pistachio-rose-chiffon': { src: '/products/hero-pecan-cake.png', isPng: true },
    'golden-croissant-supreme': { src: '/products/golden-croissant.png', isPng: true },
    'matcha-yuzu-tart': { src: '/products/matcha-yuzu-tart.png', isPng: true },
    'green-bear-espresso': { src: '/products/specialty-espresso.png', isPng: true },
    'tiramisu-opera': { src: '/products/hero-pecan-cake.png', isPng: true },
  };

  return (
    <section
      id="products"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-surface/30 border-t border-brand-border-subtle"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Artisanal Repertoire</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight">
              Culinary Magnetism.{' '}
              <span className="text-gradient-gold block sm:inline">The Product Power.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted max-w-md leading-relaxed">
            The foundation of franchisee profitability is repeat guest desire. Our signature items turn casual visitors into loyal lifelong brand advocates.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-accent text-white shadow-md font-semibold ring-2 ring-brand-gold/40'
                    : 'glass-pill text-brand-text-muted hover:text-brand-text hover:bg-brand-surface/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const media = productImages[product.id] || { src: '/products/hero-pecan-cake.png', isPng: true };
            return (
              <div
                key={product.id}
                className="glass-medium rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 relative"
              >
                {/* Visual Image Pedestal / Header */}
                <div className="relative h-72 w-full overflow-hidden flex items-center justify-center p-6 bg-gradient-to-b from-brand-surface/40 to-brand-bg/60">
                  {/* Subtle Pedestal Ambient Glow */}
                  <div className="absolute w-44 h-44 rounded-full bg-brand-accent/15 blur-2xl group-hover:bg-brand-gold/20 transition-colors duration-500" />

                  {/* Circular Pedestal Rim */}
                  <div className="absolute w-48 h-20 bottom-4 rounded-[50%] border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 backdrop-blur-sm shadow-inner pointer-events-none" />

                  {/* Product Transparent Floating Image */}
                  <img
                    src={media.src}
                    alt={product.name}
                    className="relative z-10 max-h-56 max-w-[85%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out"
                  />

                  {/* Top Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full glass-pill text-brand-gold text-[10px] font-display uppercase tracking-wider font-semibold border border-brand-gold/30">
                      {product.badge}
                    </div>
                  )}

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 right-4 z-20 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white/85 text-[9px] font-display uppercase tracking-widest border border-white/10">
                    {product.category}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brand-text mb-1 leading-tight group-hover:text-brand-accent transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-xs font-serif italic text-brand-accent mb-3 block">
                      {product.tagline}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Flavor Notes */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {product.notes.map((note, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full glass-light text-brand-text-muted text-[10px] font-display tracking-wider border border-brand-border-subtle"
                        >
                          ✦ {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pairing & Details Button */}
                  <div className="pt-4 border-t border-brand-border-subtle flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-text-muted font-display block">
                        Signature Pairing
                      </span>
                      <span className="font-sans font-medium text-xs text-brand-text">
                        {product.pairing}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveProductModal(product)}
                      className="text-xs font-semibold text-brand-accent hover:underline focus:outline-none flex items-center gap-1 group/btn"
                    >
                      <span>View Profile</span>
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Deep-Dive Modal */}
      {activeProductModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setActiveProductModal(null)}
        >
          <div
            className="max-w-lg w-full glass-heavy rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Product Image Preview */}
            <div className="relative h-44 w-full flex items-center justify-center mb-4 bg-brand-surface/30 rounded-2xl p-4 overflow-hidden border border-white/10">
              <div className="absolute w-32 h-32 rounded-full bg-brand-accent/20 blur-xl" />
              <img
                src={productImages[activeProductModal.id]?.src || '/products/hero-pecan-cake.png'}
                alt={activeProductModal.name}
                className="relative z-10 max-h-36 max-w-[80%] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]"
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-display uppercase tracking-widest text-brand-accent font-semibold">
                {activeProductModal.category} Specification
              </span>
              <button
                onClick={() => setActiveProductModal(null)}
                className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-brand-text-muted hover:text-brand-text transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text mb-1">
              {activeProductModal.name}
            </h3>

            <p className="font-serif italic text-sm text-brand-accent mb-3">
              {activeProductModal.tagline}
            </p>

            <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-5">
              {activeProductModal.description}
            </p>

            <div className="p-4 rounded-2xl glass-light mb-4 border border-white/10">
              <span className="text-[11px] font-display uppercase tracking-wider text-brand-text-muted block mb-2">
                Curated Flavor Profile:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProductModal.notes.map((n, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full glass-pill text-brand-text text-xs font-medium"
                  >
                    ✦ {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 mb-6">
              <span className="text-[11px] font-display uppercase tracking-widest text-brand-accent font-semibold block mb-0.5">
                Recommended Barista Pairing
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-brand-text">
                {activeProductModal.pairing}
              </span>
            </div>

            <button
              onClick={() => setActiveProductModal(null)}
              className="btn-primary w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              Close Product Profile
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
