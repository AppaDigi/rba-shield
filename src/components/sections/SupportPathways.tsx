"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MessageSquareX, Scale, Gavel, Users, FileText } from "lucide-react";

const pathways = [
  {
    title: "Slander & Defamation",
    description: "Defending the reputation of members against malicious and false accusations in the public square.",
    icon: MessageSquareX,
  },
  {
    title: "Cease & Desist",
    description: "Professional legal responses to intimidation tactics designed to stifle faithful business operations.",
    icon: ShieldCheck,
  },
  {
    title: "Triage & Counsel",
    description: "Rapid assessment of legal needs and direct connection to vetted, conviction-aligned attorneys.",
    icon: Gavel,
  },
  {
    title: "Member Advocacy",
    description: "Strategic public response and coordination with RBA leadership to stand with targeted members.",
    icon: Users,
  },
  {
    title: "Legal Fund Access",
    description: "Financial assistance for critical legal defense needs, supported by the RBA Shield member fund.",
    icon: Scale,
  },
  {
    title: "Resource Library",
    description: "Access to documents, guidance, and strategic preparation materials for proactive defense.",
    icon: FileText,
  },
];

export const SupportPathways = () => {
  return (
    <section id="protection" className="py-32 bg-deep-navy relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.5em] text-brand-gold/60 mb-4 block font-display">
            Defense Capabilities
          </span>
          <h2 className="text-4xl md:text-6xl font-display mb-6">
            Our <span className="text-brand-gold">Shield Wall</span>
          </h2>
          <p className="max-w-2xl mx-auto text-parchment/60 font-serif italic text-lg">
            Strategic legal and advocacy support designed to protect those who prioritize Christ&apos;s Lordship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4, scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              className="group relative p-8 panel-solid border-slate-navy hover:border-brand-gold/40 transition-all duration-500"
            >
              <div className="mb-6 inline-block p-4 bg-brand-gold/5 border border-brand-gold/20 group-hover:bg-brand-gold/10 transition-colors">
                <pathway.icon className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-xl font-display mb-4 tracking-wider group-hover:text-brand-gold transition-colors">
                {pathway.title}
              </h3>
              <p className="text-parchment/50 text-sm leading-relaxed group-hover:text-parchment/80 transition-colors">
                {pathway.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-gold/0 group-hover:border-brand-gold/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
