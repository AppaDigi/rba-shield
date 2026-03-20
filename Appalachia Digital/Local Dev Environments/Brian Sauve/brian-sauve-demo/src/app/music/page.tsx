/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";

// Hardcoded discography data
const albums = [
  {
    title: "Awake the Dawn",
    subtitle: "PSALMS, HYMNS & SPIRITUAL SONGS",
    year: "2024",
    type: "LP",
    href: "https://open.spotify.com/album/3I8q6vItA7Mrtb3eHStW1x", // Real Spotify ID doesn't matter, just link to artist
    accent: "bg-[#0a0704]"
  },
  {
    title: "Even Dragons Shall Him Praise",
    subtitle: "PSALMS & HYMNS",
    year: "2022",
    type: "EP",
    href: "https://open.spotify.com/artist/briansauve",
    accent: "bg-[#140f0a]"
  },
  {
    title: "Psalm 2",
    subtitle: "SINGLE",
    year: "2023",
    type: "SINGLE",
    href: "https://open.spotify.com/artist/briansauve",
    accent: "bg-[#1a140d]"
  },
  {
    title: "O God My Joy",
    subtitle: "HYMNS COLLECTION",
    year: "2021",
    type: "LP",
    href: "https://open.spotify.com/artist/briansauve",
    accent: "bg-[#0f0b07]"
  },
  {
    title: "Psalm 110",
    subtitle: "SINGLE",
    year: "2022",
    type: "SINGLE",
    href: "https://open.spotify.com/artist/briansauve",
    accent: "bg-[#140e09]"
  },
  {
    title: "The King in All His Beauty",
    subtitle: "EP",
    year: "2020",
    type: "EP",
    href: "https://open.spotify.com/artist/briansauve",
    accent: "bg-[#0c0906]"
  },
  {
    title: "Christ Our Hope",
    subtitle: "LIVE SESSIONS",
    year: "2019",
    type: "LP",
    href: "https://open.spotify.com/artist/briansauve",
    accent: "bg-[#16100b]"
  }
];

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeIn: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function MusicPage() {
  return (
    <div className="flex flex-col min-h-screen bg-parchment bg-texture-light">
      {/* HEADER */}
      <section className="py-24 md:py-32 border-b-[12px] border-wood bg-cathedral bg-texture-dark bg-cathedral-pattern text-parchment relative overflow-hidden">
        <div className="absolute inset-0 bg-cathedral/95 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber via-wood to-wood mix-blend-overlay"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber mb-4 block">Discography</span>
            <h1 className="font-heading text-5xl md:text-7xl italic tracking-tight font-medium mb-6">Psalms &amp; Hymns</h1>
            <p className="font-body text-xl md:text-2xl text-parchment/70 max-w-2xl mx-auto leading-relaxed">
              Equipping the saints with theological depth and musical beauty to sing the Word.
            </p>
          </motion.div>
        </div>
      </section>

      {/* DISCOGRAPHY GRID */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {albums.map((album, index) => (
              <motion.div key={index} variants={fadeIn} className="group relative">
                {/* Cathedral Arched Typographic Album Art */}
                <a href={album.href} target="_blank" rel="noopener noreferrer" className={`block relative aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden mb-6 border-4 border-wood group-hover:border-amber/50 transition-colors duration-500 rounded-t-[50rem] rounded-b-xl ${album.accent} isolate`}>
                  <div className={`absolute inset-0 bg-texture-dark mix-blend-multiply opacity-50 pointer-events-none`}></div>
                  <div className={`absolute inset-0 p-8 flex flex-col justify-between items-center text-center transition-transform duration-1000 group-hover:scale-105`}>
                    <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/5 transition-colors duration-500"></div>
                    <div className="w-full border-t border-amber/20"></div>
                    <div className="space-y-3 z-10">
                      <h3 className="font-heading text-sm md:text-base tracking-[0.2em] text-amber/80">{album.subtitle}</h3>
                      <h2 className="font-heading text-3xl md:text-4xl text-parchment mt-2 italic font-medium leading-none">{album.title}</h2>
                    </div>
                    <div className="w-full flex justify-between items-end border-b border-amber/20 pb-4 z-10">
                      <span className="font-body text-xs tracking-widest text-parchment/60">{album.year}</span>
                      <span className="font-body text-xs tracking-widest text-parchment/60">{album.type}</span>
                    </div>
                    
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm bg-ink/30 z-20">
                      <div className="p-4 rounded-full bg-amber/90 text-ink transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <Play fill="currentColor" size={24} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </a>
                
                {/* Album Details */}
                <div className="text-center px-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber">{album.type}</span>
                    <span className="text-ink/30">•</span>
                    <span className="text-sm font-body tracking-wider text-ink/70">{album.year}</span>
                  </div>
                  <h3 className="font-heading text-2xl text-ink mb-3">{album.title}</h3>
                  <a href={album.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-heading tracking-widest text-ink/80 hover:text-amber transition-colors border-b border-transparent hover:border-amber pb-1">
                    STREAM NOW <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
