/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, ExternalLink } from "lucide-react";

const fadeIn: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-parchment bg-texture-light">
      {/* HEADER / BIO SECTION */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl italic tracking-tight font-medium mb-12">About Brian</h1>
            
            <div className="text-xl md:text-2xl lg:text-3xl font-body leading-relaxed text-ink/90 italic border-l-8 border-wood pl-8 pr-4 py-4 text-left bg-ink/5 max-w-3xl mx-auto mb-16 rounded-r-lg">
              "Reformed and Protestant, Paedobaptist, Postmillennial, and Patriarchal — and several other things that tend to bother the good people of Twitter dot com."
            </div>
            
            <div className="space-y-8 font-body text-lg text-left text-ink/80 leading-relaxed max-w-3xl mx-auto">
              <p>
                Brian Sauvé is a pastor, musician, and author laboring to build up the household of faith. He serves as one of the pastors of Refuge Church in Ogden, Utah.
              </p>
              <p>
                His primary work consists of pastoral ministry, writing and recording new musical settings of the Psalms, and exploring the theology of the Christian household—aiming to equip the saints for the work of building a new Christendom from the ground up.
              </p>
              <p>
                Brian is married to Lexy, and they are laboring to raise up their children in the nurture and admonition of the Lord. They also co-host the Bright Hearth podcast together.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT BLOCK */}
      <section className="py-32 bg-wood bg-texture-dark text-parchment border-y-[12px] border-cathedral relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber/10 via-transparent to-transparent opacity-80 mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-oak/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Mail size={40} className="mx-auto mb-6 text-amber" strokeWidth={1} />
            <h2 className="font-heading text-4xl mb-6">Get in Touch</h2>
            <p className="font-body text-xl text-parchment/70 mb-10 max-w-xl mx-auto">
              For speaking inquiries, podcast interviews, or to support the work.
            </p>
            <a 
              href="mailto:contact@briansauve.com" 
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber text-ink font-heading text-xl tracking-wider hover:bg-parchment transition-colors duration-300"
            >
              EMAIL BOOKING <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* OTHER PROJECTS STRIP */}
      <section className="py-24 bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber mb-4 block">Ecosystem</span>
            <h2 className="font-heading text-4xl">Related Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a href="https://refugeutah.org" target="_blank" rel="noopener noreferrer" className="group p-8 border-4 border-cathedral hover:border-wood bg-oak bg-texture-dark text-parchment transition-colors duration-500 relative overflow-hidden flex flex-col items-center justify-center text-center aspect-video rounded-t-[10rem] shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <h3 className="font-heading text-3xl tracking-[0.1em] mb-2 z-10 italic">Refuge Church</h3>
              <p className="font-body text-sm text-amber z-10 uppercase tracking-widest flex items-center gap-2 mt-4">Visit Site <ExternalLink size={14} /></p>
            </a>
            
            <a href="https://newchristendompress.com" target="_blank" rel="noopener noreferrer" className="group p-8 border-4 border-cathedral hover:border-oak bg-wood bg-texture-dark text-parchment transition-colors duration-500 relative overflow-hidden flex flex-col items-center justify-center text-center aspect-video rounded-t-[10rem] shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <h3 className="font-heading text-3xl tracking-[0.1em] uppercase mb-2 z-10">New Christendom Press</h3>
              <p className="font-body text-sm text-amber z-10 uppercase tracking-widest flex items-center gap-2 mt-4">Visit Site <ExternalLink size={14} /></p>
            </a>
            
            <a href="https://www.patreon.com/briansauve" target="_blank" rel="noopener noreferrer" className="group p-8 border-4 border-wood hover:border-amber bg-cathedral bg-texture-dark text-parchment transition-colors duration-500 relative overflow-hidden flex flex-col items-center justify-center text-center aspect-video rounded-t-[10rem] shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <h3 className="font-heading text-3xl tracking-[0.1em] mb-2 z-10 italic">Patreon Community</h3>
              <p className="font-body text-sm text-amber z-10 uppercase tracking-widest flex items-center gap-2 mt-4">Support The Work <ExternalLink size={14} /></p>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
