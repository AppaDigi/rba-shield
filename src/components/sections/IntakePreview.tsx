"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ChevronRight, Lock } from "lucide-react";
import { PremiumButton } from "../ui/PremiumButton";

export const IntakePreview = () => {
  return (
    <section id="submit" className="py-32 bg-ink relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-16 border border-slate-navy bg-deep-navy overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold/30" />
          <div className="absolute top-0 right-0 p-4">
            <Lock className="w-5 h-5 text-brand-gold/20" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <ShieldAlert className="w-16 h-16 text-brand-crimson mb-8" />
            
            <h2 className="text-3xl md:text-5xl font-display mb-6">
              Submit a <span className="text-brand-gold">Legal Need</span>
            </h2>
            
            <p className="text-parchment/60 font-serif italic text-lg mb-12 max-w-2xl">
              &quot;If you are facing a legal threat, slander, or a violation of conscience in your business, do not wait. Our team is ready to triage your situation and connect you with the appropriate response.&quot;
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left mb-12">
              <div className="p-4 border border-slate-navy bg-primary-blue/20 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-gold" />
                <span className="text-xs uppercase tracking-widest text-parchment/40">100% Confidential</span>
              </div>
              <div className="p-4 border border-slate-navy bg-primary-blue/20 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-gold" />
                <span className="text-xs uppercase tracking-widest text-parchment/40">Expert Triage</span>
              </div>
              <div className="p-4 border border-slate-navy bg-primary-blue/20 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-gold" />
                <span className="text-xs uppercase tracking-widest text-parchment/40">Network of Counsel</span>
              </div>
              <div className="p-4 border border-slate-navy bg-primary-blue/20 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-gold" />
                <span className="text-xs uppercase tracking-widest text-parchment/40">Member-Backed Defense</span>
              </div>
            </div>

            <PremiumButton size="xl" className="group">
              Begin Intake Process
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </PremiumButton>

            <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-parchment/20">
              Note: Submission does not guarantee representation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
