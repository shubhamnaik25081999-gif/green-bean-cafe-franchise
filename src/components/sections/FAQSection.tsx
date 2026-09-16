'use client';

import React, { useState } from 'react';
import { FAQS, FAQItem } from '@/lib/data';
import { Sparkles, HelpCircle, ChevronDown, Search } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'General', 'Requirements', 'Support', 'Process'];

  const filteredFaqs = FAQS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faqs"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-bg border-t border-brand-border-subtle"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-gold" />
            <span>Essential Inquiries</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            Frequently Asked{' '}
            <span className="text-gradient-gold block sm:inline">Questions.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed max-w-xl mx-auto">
            Everything you need to know about the Green Bean Cafe franchise opportunity, operational support, and application process.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-brand-accent text-white font-semibold shadow-md ring-1 ring-brand-gold/50'
                    : 'glass-pill text-brand-text-muted hover:text-brand-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-brand-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-full glass-input text-xs text-brand-text placeholder:text-brand-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 glass-medium rounded-3xl text-sm text-brand-text-muted">
              No questions found matching your search. Try another keyword.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="glass-medium rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0" />
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-text">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-accent flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-brand-border-subtle animate-in fade-in duration-200">
                      <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
