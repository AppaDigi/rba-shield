"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldEmblem } from "../ui/ShieldEmblem";
import { PremiumButton } from "../ui/PremiumButton";

export const FinalCTA = () => {
  return (
    <section className="py-40 bg-ink relative overflow-hidden flex items-center justify-center text-center">
      {/* Background Depth */}
      <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/textures/paper-texture.png')] opacity-5 pointer-events-none mix-blend-overlay" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10"
        >
          <ShieldEmblem className="w-24 h-24 text-brand-gold opacity-50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl md:text-6xl font-display mb-8 text-parchment leading-tight"
        >
          Do Not Let The Faithful <br />
          <span className="text-brand-gold">Stand Alone</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl font-serif italic text-parchment/60 mb-12 max-w-2xl leading-relaxed"
        >
          The public square requires courage. Courage requires backing. Join the Shield Wall today and ensure that when a stand is taken, the defense is ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <PremiumButton size="xl" variant="primary">
            Stand with the Shield
          </PremiumButton>
        </motion.div>
      </div>
    </section>
  );
};
