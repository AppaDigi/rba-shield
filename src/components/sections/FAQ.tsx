"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Who is eligible for RBA Shield legal support?",
    answer: "Support is primarily available to members of the Reformed Business Alliance who face legal threats or public slander due to their confessional convictions in the marketplace. Priority is given to Shield Members and Patrons, though triage is available to all."
  },
  {
    question: "How does the Legal Defense Fund work?",
    answer: "The fund is sustained by member contributions. When a member faces a qualifying legal threat, the RBA Shield tactical team assesses the situation. If approved, funds are mobilized to cover or subsidize legal representation by vetted, conviction-aligned attorneys."
  },
  {
    question: "Are you a law firm?",
    answer: "No. RBA Shield is an advocacy and defense program. We partner with a network of vetted attorneys and legal organizations who share our confessional commitments and provide the actual legal representation."
  },
  {
    question: "What if I am not Reformed?",
    answer: "While we stand in solidarity with all faithful Christians facing persecution, the resources of RBA Shield are specifically focused on building defense infrastructure for businesses and leaders within the Reformed confessional tradition."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-deep-navy border-t border-slate-navy">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.5em] text-brand-gold/60 mb-4 block font-display">
            Clarity & Conviction
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-parchment">
            Common <span className="text-brand-gold">Inquiries</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-slate-navy bg-ink/50 overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-display text-lg tracking-wide text-parchment">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-brand-gold transition-transform duration-300",
                    openIndex === index ? "rotate-180" : ""
                  )} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-parchment/60 font-serif italic leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
