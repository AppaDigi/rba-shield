"use client";

import React from "react";
import { motion } from "framer-motion";

export const Theology = () => {
  return (
    <section className="py-40 bg-ink relative overflow-hidden">
      {/* Heraldic Background Image Placeholder */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] border border-brand-gold/30 rounded-full rotate-45" />
        <div className="absolute w-[600px] h-[600px] border border-brand-gold/20 rounded-full -rotate-12" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs uppercase tracking-[0.5em] text-brand-gold/60 mb-6 block font-display">
              Confessional Identity
            </span>
            <h2 className="text-4xl md:text-6xl font-display mb-8 leading-tight">
              Christ <br />
              <span className="text-brand-gold">Is Lord</span> <br />
              Over All
            </h2>
            <div className="h-[2px] w-20 bg-brand-gold/40 mb-10" />
            <p className="text-xl md:text-2xl font-serif italic text-parchment/80 leading-relaxed">
              &quot;We do not build in a vacuum, nor do we defend ourselves by mere pragmatism. Our response to legal pressure is rooted in the Lordship of Christ over every square inch of the public square.&quot;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="p-8 border-l border-brand-gold/20 bg-brand-gold/[0.02]">
              <h3 className="font-display text-sm tracking-widest text-brand-gold mb-4">Covenantal Solidarity</h3>
              <p className="text-parchment/60 leading-relaxed text-sm">
                The Reformed tradition understands the duty of the community to stand for justice and the defense of the innocent. We act not as isolated individuals, but as a body.
              </p>
            </div>
            
            <div className="p-8 border-l border-brand-gold/20 bg-brand-gold/[0.02]">
              <h3 className="font-display text-sm tracking-widest text-brand-gold mb-4">The Duty of the Magistrate</h3>
              <p className="text-parchment/60 leading-relaxed text-sm">
                We believe in the lawful use of the sword and the shield. RBA Shield exists to help our members interface with the legal structures of the land in a way that honors our theological convictions.
              </p>
            </div>

            <div className="p-8 border-l border-brand-gold/20 bg-brand-gold/[0.02]">
              <h3 className="font-display text-sm tracking-widest text-brand-gold mb-4">Truth-Telling</h3>
              <p className="text-parchment/60 leading-relaxed text-sm">
                In an age of slander, we are committed to the defense of the Truth. Our legal strategies are built on the bedrock of confessional integrity and unwavering resolve.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
