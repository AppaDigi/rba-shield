"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Manifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section 
      id="mission"
      ref={containerRef}
      className="relative min-h-[150vh] flex flex-col items-center py-32 bg-ink"
    >
      <motion.div 
        style={{ opacity, y }}
        className="sticky top-1/4 max-w-4xl mx-auto px-6 text-center"
      >
        <span className="text-xs uppercase tracking-[0.5em] text-brand-gold/60 mb-8 block font-display">
          The Mandate
        </span>
        
        <div className="space-y-4 mb-16">
          {[
            "The modern public square is increasingly hostile",
            "to those who hold fast to the Truth.",
            "We are pressured, smeared, and legally",
            "intimidated into silence."
          ].map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1, 
                delay: i * 0.2,
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="text-2xl md:text-5xl font-serif italic leading-tight text-parchment/90"
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="space-y-8 text-lg md:text-xl text-parchment/60 font-sans leading-relaxed text-left max-w-2xl mx-auto border-l border-brand-gold/20 pl-8"
        >
          <p>
            Isolation makes us easy targets. When a business owner or a public leader stands for Christ, they often stand alone—vulnerable to the weight of institutions that do not share their convictions.
          </p>
          <p>
            <span className="text-brand-gold font-semibold tracking-wide">RBA SHIELD</span> is the institutional response. We are building a collective wall of protection, ensuring that no member of this Alliance faces the legal machinery of the age without a principled defense.
          </p>
          <p>
            This is not just legal aid; it is <span className="text-parchment italic">ecclesial solidarity</span>. It is the mobilization of resources by men of conviction for men of conviction.
          </p>
        </motion.div>

        {/* Decorative Quote Mark */}
        <div className="absolute -top-10 -left-10 text-9xl text-brand-gold/5 font-serif select-none pointer-events-none">
          “
        </div>
      </motion.div>

      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/textures/paper-texture.png')] opacity-5 pointer-events-none mix-blend-overlay" />
    </section>
  );
};
