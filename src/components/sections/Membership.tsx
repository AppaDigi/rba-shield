"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PremiumButton } from "../ui/PremiumButton";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Supporter",
    price: "$25",
    description: "For those who wish to back the shield wall and support the legal fund.",
    features: [
      "Access to legal resource library",
      "Monthly shield updates",
      "Alliance network inclusion",
      "Support the general defense fund",
    ],
    cta: "Become a Supporter",
    popular: false,
  },
  {
    name: "Shield Member",
    price: "$99",
    description: "Full protection and priority access for business owners and leaders.",
    features: [
      "Priority legal triage & intake",
      "Access to vetted counsel network",
      "Emergency cease & desist support",
      "Slander & reputation defense",
      "Legal fund eligibility",
    ],
    cta: "Join the Shield",
    popular: true,
  },
  {
    name: "Shield Patron",
    price: "$499",
    description: "Strategic partners building the long-term institutional defense capacity.",
    features: [
      "All Shield Member benefits",
      "Direct consultation with RBA leadership",
      "Invitations to strategic briefings",
      "Founder's Circle status",
      "Enhanced fund contribution",
    ],
    cta: "Become a Patron",
    popular: false,
  },
];

export const Membership = () => {
  return (
    <section id="membership" className="py-32 bg-ink relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[150px] rounded-full -mr-64 -mt-64" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.5em] text-brand-gold/60 mb-4 block font-display">
            The Covenant
          </span>
          <h2 className="text-4xl md:text-6xl font-display mb-6">
            Membership <span className="text-brand-gold">& Solidarity</span>
          </h2>
          <p className="max-w-2xl mx-auto text-parchment/60 font-serif italic text-lg leading-relaxed">
            &quot;We build the shield before we need it. Stand with those who stand, and ensure the faithful are never left undefended.&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              className={cn(
                "relative flex flex-col p-8 lg:p-10 transition-all duration-500 border",
                tier.popular 
                  ? "bg-primary-blue border-brand-gold/40 z-10 shadow-[0_0_50px_rgba(197,160,89,0.1)]" 
                  : "bg-deep-navy border-slate-navy hover:border-brand-gold/20"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-ink px-4 py-1 text-[10px] font-display tracking-widest">
                  MOST STRATEGIC
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-display mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-display text-brand-gold">{tier.price}</span>
                  <span className="text-parchment/40 text-sm">/ MONTH</span>
                </div>
                <p className="text-parchment/50 text-sm font-serif italic min-h-[40px]">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-brand-gold mt-1 flex-shrink-0" />
                    <span className="text-parchment/70 text-sm leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <PremiumButton 
                variant={tier.popular ? "primary" : "outline"} 
                className="w-full"
                size="lg"
              >
                {tier.cta}
              </PremiumButton>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-parchment/40 text-sm font-serif italic">
            Looking for one-time support? 
            <button className="text-brand-gold hover:underline ml-2">Contribute to the Shield Fund</button>
          </p>
        </div>
      </div>
    </section>
  );
};
