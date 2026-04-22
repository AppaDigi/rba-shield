"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileSearch, Gavel, Handshake } from "lucide-react";

const steps = [
  {
    title: "Intake & Triage",
    description: "Submit your legal need or threat through our secure portal. Our tactical team reviews the situation immediately.",
    icon: FileSearch,
  },
  {
    title: "Strategic Counsel",
    description: "We connect you with vetted, conviction-aligned attorneys and strategic advisors to map out a principled response.",
    icon: Shield,
  },
  {
    title: "Resource Mobilization",
    description: "If eligible, the RBA Shield Legal Fund is activated to support your defense, backed by our member network.",
    icon: Gavel,
  },
  {
    title: "Solidarity & Defense",
    description: "We stand with you in the public square and the courtroom, ensuring you are never left to stand alone.",
    icon: Handshake,
  },
];

export const Process = () => {
  return (
    <section id="process" className="py-32 bg-ink border-y border-brand-gold/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.5em] text-brand-gold/60 mb-4 block font-display">
            The Protocol
          </span>
          <h2 className="text-4xl md:text-5xl font-display mb-6">
            How the <span className="text-brand-gold">Shield Operates</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-brand-gold/10 -translate-y-12" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-deep-navy border border-brand-gold/20 flex items-center justify-center mb-8 relative group">
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors" />
                <step.icon className="w-6 h-6 text-brand-gold" />
                
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-7 h-7 bg-brand-gold text-ink text-[10px] font-display flex items-center justify-center">
                  0{index + 1}
                </div>
              </div>
              
              <h3 className="text-lg font-display mb-4 tracking-widest text-parchment">
                {step.title}
              </h3>
              <p className="text-parchment/40 text-sm leading-relaxed font-serif italic">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
