'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Send, CheckCircle2, Shield, Clock, Phone, Mail, User, MapPin, Briefcase } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  preferredInvestment: string;
  preferredLocation: string;
  businessExperience: string;
  message: string;
}

export const FranchiseEnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    preferredInvestment: 'Mid-Tier Cafe Format',
    preferredLocation: '',
    businessExperience: 'Prior Business Owner / Executive',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic frontend validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please provide a valid phone number.');
      return;
    }
    if (!formData.city.trim()) {
      setErrorMsg('Please specify your target city.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury processing delay (800ms)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#C88A3A', '#1E382B', '#EAA9BC'],
        });
      } catch {
        // ignore
      }
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      preferredInvestment: 'Mid-Tier Cafe Format',
      preferredLocation: '',
      businessExperience: 'Prior Business Owner / Executive',
      message: '',
    });
  };

  return (
    <section
      id="enquiry"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-brand-surface/40 border-t border-brand-border-subtle overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-accent mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Franchise Application</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight mb-4">
            Begin Your Journey With{' '}
            <span className="text-gradient-gold block sm:inline">Green Bean Cafe.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-muted leading-relaxed max-w-xl mx-auto">
            Submit your qualified expression of interest. Our franchise development leadership will review your market vision and territory preferences.
          </p>
        </div>

        {/* Success State Celebration Card */}
        {isSubmitted ? (
          <div className="glass-heavy p-10 sm:p-14 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl text-center animate-in zoom-in-95 duration-500 max-w-2xl mx-auto relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-brand-accent/20 border-2 border-brand-accent text-brand-accent flex items-center justify-center mx-auto mb-6 shadow-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text mb-4 leading-snug">
              Thank You for Your Interest in Green Bean Cafe.
            </h3>

            <p className="font-sans text-base sm:text-lg text-brand-text mb-6 font-medium">
              Our franchise team will review your enquiry and get in touch within 48 business hours.
            </p>

            <div className="p-6 rounded-2xl glass-light border border-white/15 dark:border-white/5 text-left mb-8 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-brand-border-subtle">
                <span className="text-brand-text-muted">Applicant Name:</span>
                <span className="font-semibold text-brand-text">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border-subtle">
                <span className="text-brand-text-muted">Target Territory:</span>
                <span className="font-semibold text-brand-text">{formData.city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border-subtle">
                <span className="text-brand-text-muted">Contact Email:</span>
                <span className="font-semibold text-brand-text">{formData.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-brand-text-muted">Preferred Model:</span>
                <span className="font-semibold text-brand-accent">{formData.preferredInvestment}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="btn-secondary px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          /* Application Form Card */
          <div className="glass-heavy p-8 sm:p-12 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden">
            {/* Subtle Brand Seal Watermark */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 pointer-events-none select-none">
              <img
                src="/products/green-bear-seal.png"
                alt="Brand Seal"
                className="w-full h-full object-contain filter invert dark:invert-0"
              />
            </div>

            {errorMsg && (
              <div className="p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-600 text-xs font-medium flex items-center gap-2">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-brand-text font-semibold mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-brand-text font-semibold mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. eleanor@estateventures.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-brand-text font-semibold mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                  />
                </div>

                {/* Preferred City */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-brand-text font-semibold mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Target City / Region *</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Mumbai, Bengaluru, Pune, Delhi..."
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                  />
                </div>

                {/* Preferred Format / Scope */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-brand-text font-semibold mb-2">
                    Preferred Store Format
                  </label>
                  <select
                    name="preferredInvestment"
                    value={formData.preferredInvestment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                  >
                    <option value="Flagship Destination Cafe">Flagship Destination Cafe (1,500 - 2,500 sq.ft.)</option>
                    <option value="High-Street Neighborhood Cafe">High-Street Neighborhood Cafe (800 - 1,400 sq.ft.)</option>
                    <option value="Boutique Kiosk & Express">Boutique Kiosk & Express (350 - 700 sq.ft.)</option>
                    <option value="Multi-Unit Territorial Agreement">Multi-Unit Territorial Agreement</option>
                  </select>
                </div>

                {/* Business Experience */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-brand-text font-semibold mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Business Background</span>
                  </label>
                  <select
                    name="businessExperience"
                    value={formData.businessExperience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                  >
                    <option value="Prior Food & Beverage Operator">Prior Food & Beverage Operator</option>
                    <option value="Retail Franchise Owner">Retail Franchise Owner</option>
                    <option value="Corporate Executive / Entrepreneur">Corporate Executive / Entrepreneur</option>
                    <option value="Commercial Real Estate Owner">Commercial Real Estate Owner</option>
                  </select>
                </div>
              </div>

              {/* Preferred Location Notes */}
              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-brand-text font-semibold mb-2">
                  Specific Catchment / Property Details (Optional)
                </label>
                <input
                  type="text"
                  name="preferredLocation"
                  placeholder="e.g. Owned or shortlisted commercial space on high street"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-brand-text font-semibold mb-2">
                  Personal Vision or Additional Notes
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Share a brief overview of your business timeline, questions, or specific location interests..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all resize-none"
                />
              </div>

              {/* Privacy & Protocol Assurance */}
              <div className="flex items-center gap-2 text-[11px] text-brand-text-muted">
                <Shield className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                <span>All discussions remain strictly confidential. Prototype demonstration submission.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-luxury hover:shadow-2xl transition-all"
              >
                {isSubmitting ? (
                  <span>Processing Application...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Qualified Franchise Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
