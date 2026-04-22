"use client";

import React from "react";
import { PremiumButton } from "../ui/PremiumButton";
import { Heart } from "lucide-react";

export const DonationBand = () => {
  return (
    <section className="py-20 bg-brand-navy relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-hero-glow opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display mb-4 text-parchment">
              Back the <span className="text-brand-gold">Shield Wall</span>
            </h2>
            <p className="text-parchment/60 font-serif italic text-lg">
              Not every business owner needs full membership today, but everyone can help build the defense fund for those who do. Support the mission with a one-time contribution.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <PremiumButton variant="primary" size="xl">
              Contribute Now
            </PremiumButton>
            <PremiumButton variant="outline" size="xl">
              <Heart className="w-4 h-4 mr-2" />
              Give Monthly
            </PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
};
