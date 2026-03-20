"use client";

import { motion } from "framer-motion";
import { Mic, ExternalLink, Headphones } from "lucide-react";

export default function ListenPage() {
  return (
    <div className="flex flex-col min-h-screen bg-parchment bg-texture-light text-ink">
      {/* HEADER */}
      <section className="py-24 md:py-32 border-b-[12px] border-wood bg-cathedral bg-texture-dark bg-cathedral-pattern text-parchment relative overflow-hidden">
        <div className="absolute inset-0 bg-cathedral/95 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber via-cathedral to-cathedral mix-blend-overlay"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Mic size={48} className="mx-auto mb-6 text-amber" strokeWidth={1} />
            <h1 className="font-heading text-5xl md:text-7xl italic tracking-tight font-medium mb-6">Podcasts</h1>
            <p className="font-body text-xl md:text-2xl text-parchment/70 max-w-2xl mx-auto leading-relaxed">
              Conversations on the productive Christian household and the biblical paranormal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PODCAST CARDS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Bright Hearth Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="bg-wood bg-texture-dark border-4 border-cathedral overflow-hidden group hover:border-amber/50 transition-colors duration-500 flex flex-col h-full rounded-2xl shadow-2xl text-parchment"
            >
              <div className="aspect-[4/3] relative flex items-center justify-center border-b-4 border-cathedral overflow-hidden bg-cathedral bg-cathedral-pattern rounded-t-[50rem] mx-4 mt-4">
                <div className="absolute inset-0 bg-cathedral/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="text-center z-10 p-8 transform group-hover:scale-105 transition-transform duration-700">
                  <h2 className="font-heading text-5xl md:text-6xl text-amber italic font-medium mb-2">Bright Hearth</h2>
                  <div className="h-px w-24 bg-amber/50 mx-auto my-4"></div>
                  <p className="font-heading text-xl tracking-[0.2em] text-parchment/80">WITH BRIAN & LEXY</p>
                </div>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <Headphones size={24} className="text-amber" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber">Household & Family</span>
                </div>
                <h3 className="font-heading text-3xl mb-4 text-parchment">Building Productive Christian Homes</h3>
                <p className="font-body text-lg text-parchment/70 leading-relaxed mb-8 flex-grow">
                  Bright Hearth is a podcast about the productive Christian household. Brian and his wife Lexy explore topics ranging from marriage and parenting to homemaking, liturgy, and the theology of the home.
                </p>
                
                <div className="space-y-4 pt-6 border-t border-amber/20 mt-auto">
                  <a href="https://podcasts.apple.com/us/podcast/bright-hearth/id1659902347" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/link">
                    <span className="font-heading text-xl tracking-wider text-parchment group-hover/link:text-amber transition-colors">Listen on Apple Podcasts</span>
                    <ExternalLink size={20} className="text-parchment/40 group-hover/link:text-amber transition-colors" />
                  </a>
                  <a href="https://open.spotify.com/show/0zX0GkH2X2h22U2N5YQJw2" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/link">
                    <span className="font-heading text-xl tracking-wider text-parchment group-hover/link:text-amber transition-colors">Listen on Spotify</span>
                    <ExternalLink size={20} className="text-parchment/40 group-hover/link:text-amber transition-colors" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Haunted Cosmos Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-wood bg-texture-dark border-4 border-cathedral overflow-hidden group hover:border-amber/50 transition-colors duration-500 flex flex-col h-full rounded-2xl shadow-2xl text-parchment"
            >
              <div className="aspect-[4/3] relative flex items-center justify-center border-b-4 border-cathedral overflow-hidden bg-cathedral bg-cathedral-pattern rounded-t-[50rem] mx-4 mt-4">
                <div className="absolute inset-0 bg-cathedral/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="text-center z-10 p-8 transform group-hover:scale-105 transition-transform duration-700">
                  <h2 className="font-heading text-5xl md:text-6xl text-amber italic font-medium mb-2">Haunted<br/>Cosmos</h2>
                  <div className="h-px w-24 bg-amber/50 mx-auto my-4"></div>
                  <p className="font-heading text-xl tracking-[0.2em] text-parchment/80">WITH BRIAN & BEN</p>
                </div>
              </div>
              
              <div className="p-8 md:p-12 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <Headphones size={24} className="text-amber" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber">Theology & The Unseen</span>
                </div>
                <h3 className="font-heading text-3xl mb-4 text-parchment">The Biblical Paranormal</h3>
                <p className="font-body text-lg text-parchment/70 leading-relaxed mb-8 flex-grow">
                  A podcast exploring the high strangeness of the biblical worldview. Brian and Ben Garrett discuss giants, UFOs, cryptids, and the supernatural world through the lens of Scripture and historical orthodoxy.
                </p>
                
                <div className="space-y-4 pt-6 border-t border-amber/20 mt-auto">
                  <a href="https://thehauntedcosmos.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/link">
                    <span className="font-heading text-xl tracking-wider text-parchment group-hover/link:text-amber transition-colors">Visit hauntedcosmos.com</span>
                    <ExternalLink size={20} className="text-parchment/40 group-hover/link:text-amber transition-colors" />
                  </a>
                  <a href="https://open.spotify.com/show/7B1w4n4r1c3o6k1y2Hk9J2" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group/link">
                    <span className="font-heading text-xl tracking-wider text-parchment group-hover/link:text-amber transition-colors">Listen on Spotify</span>
                    <ExternalLink size={20} className="text-parchment/40 group-hover/link:text-amber transition-colors" />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
