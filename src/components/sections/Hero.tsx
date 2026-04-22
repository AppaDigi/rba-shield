"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ShieldEmblem } from "../ui/ShieldEmblem";
import { PremiumButton } from "../ui/PremiumButton";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const shieldY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Cinematic Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-vignette" />
        
        {/* Background Texture/Motion */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-blue/10 blur-[120px] rounded-full" 
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Emblem Entry */}
        <motion.div
          style={{ y: shieldY, opacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <ShieldEmblem className="w-32 h-32 md:w-48 md:h-48 mb-12" />
        </motion.div>

        {/* Narrative Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.5em] text-brand-gold/60 mb-6 block font-display">
            Reformed Business Alliance
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-display mb-8 leading-tight">
            The Shield <br />
            <span className="text-brand-gold">Of The Faithful</span>
          </h1>
        </motion.div>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="max-w-2xl text-parchment/60 font-serif text-lg md:text-xl italic mb-12 leading-relaxed"
        >
          &quot;A shield for the Reformed in the public square. Backed by conviction. <br className="hidden md:block" /> Funded by members. Ready when needed.&quot;
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <PremiumButton size="xl" variant="primary" className="w-full sm:w-auto">
            Stand with the Shield
          </PremiumButton>
          <PremiumButton variant="secondary" size="xl" className="w-full sm:w-auto">
            Request Support
          </PremiumButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.3em] text-parchment/40">The Manifesto</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
