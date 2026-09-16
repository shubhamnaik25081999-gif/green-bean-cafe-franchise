'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { CinematicHeroScroller } from '@/components/scenes/CinematicHeroScroller';
import { SceneBrandPillars } from '@/components/scenes/SceneBrandPillars';
import { BusinessEcosystem3D } from '@/components/scenes/BusinessEcosystem3D';
import { FranchiseOutlet3D } from '@/components/scenes/FranchiseOutlet3D';
import { FranchiseOpportunity } from '@/components/sections/FranchiseOpportunity';
import { FranchiseJourney } from '@/components/sections/FranchiseJourney';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { FranchiseStories } from '@/components/sections/FranchiseStories';
import { StorePresence3D } from '@/components/sections/StorePresence3D';
import { FAQSection } from '@/components/sections/FAQSection';
import { FranchiseEnquiryForm } from '@/components/sections/FranchiseEnquiryForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text transition-colors duration-400 relative">
      {/* Sticky Top Header Navigation */}
      <Navbar />

      {/* Floating Storyline Scroll Progress Tracker */}
      <ScrollProgress />

      {/* Section 1 & 2: Full-screen Cinematic Hero & Walkthrough */}
      <CinematicHeroScroller />

      {/* Section 3: Brand Pillars (Asymmetric Editorial Composition) */}
      <SceneBrandPillars />

      {/* Section 4: 3D Business Ecosystem (Three.js / React Three Fiber) */}
      <BusinessEcosystem3D />

      {/* Section 5: 3D Franchise Outlet Architecture with Interactive Hotspots */}
      <FranchiseOutlet3D />

      {/* Section 6: Franchise Opportunity & Store Formats */}
      <FranchiseOpportunity />

      {/* Section 7: The Franchise Journey (Explore → Understand → Trust → Apply) */}
      <FranchiseJourney />

      {/* Section 8: Culinary Magnetism / Product Repertoire */}
      <ProductShowcase />

      {/* Section 9: Franchise Partner Perspectives & Social Proof */}
      <FranchiseStories />

      {/* Section 10: 3D Store Presence & Metropolitan Expansion Hubs */}
      <StorePresence3D />

      {/* Section 11: Comprehensive Franchise FAQ Accordion */}
      <FAQSection />

      {/* Section 12: High-Conversion Franchise Enquiry Form */}
      <FranchiseEnquiryForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
