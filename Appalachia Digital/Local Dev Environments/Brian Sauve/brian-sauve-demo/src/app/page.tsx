/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Music, BookOpen, Mic, ArrowRight, ExternalLink } from "lucide-react";

const fadeIn: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-32 md:py-48 flex items-center justify-center border-b-8 border-wood bg-parchment bg-texture-light overflow-hidden">
        {/* Stained Glass Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber/10 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-oak/10 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
        
        {/* Central Arch Outline */}
        <div className="absolute top-12 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg md:max-w-2xl border-x border-t border-oak/10 rounded-t-[50rem] pointer-events-none bg-parchment/30"></div>
        <div className="absolute top-16 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[30rem] md:max-w-[40rem] border-x border-t border-oak/5 rounded-t-[50rem] pointer-events-none"></div>

        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-8">
            <span className="text-xs uppercase tracking-[0.4em] font-semibold text-amber border-y border-amber/30 py-3 px-8 bg-parchment/50 backdrop-blur-sm rounded-full shadow-sm">
              For the New Christendom
            </span>
          </motion.div>
          <motion.h1 
            variants={fadeIn} 
            className="font-heading text-6xl md:text-8xl lg:text-[10rem] mb-10 italic text-wood tracking-tight font-medium drop-shadow-sm"
          >
            Brian Sauvé
          </motion.h1>
          <motion.p 
            variants={fadeIn} 
            className="max-w-2xl mx-auto text-xl md:text-3xl text-ink/80 leading-relaxed font-body mb-16 relative"
          >
            {/* Quote marks subtle background */}
            <span className="absolute -top-12 -left-12 text-8xl text-amber/10 font-heading">"</span>
            Reformed pastor, psalm musician, author, and podcaster laboring to build up the household of faith.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/music" className="w-full sm:w-auto px-10 py-5 bg-wood text-parchment hover:bg-amber hover:text-cathedral transition-all duration-500 font-heading text-xl tracking-[0.2em] shadow-xl hover:shadow-amber/20 hover:-translate-y-1">
              LISTEN TO MUSIC
            </Link>
            <Link href="/words" className="w-full sm:w-auto px-10 py-5 bg-parchment text-wood hover:text-amber transition-all duration-500 font-heading text-xl tracking-[0.2em] border border-oak hover:border-amber flex items-center justify-center gap-3 backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-1">
              READ WRITINGS <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* BIO PREVIEW */}
      <section className="py-24 md:py-32 bg-wood border-y-[12px] border-oak text-parchment relative overflow-hidden bg-texture-dark border-t-0">
         <div className="absolute inset-0 bg-cathedral/80 mix-blend-multiply"></div>
         <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-3 relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-amber/20 shadow-2xl">
               <Image src="/images/family.webp" alt="Brian Sauve Family" fill className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-2 space-y-6">
               <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl italic text-amber drop-shadow-lg leading-tight">Laboring to build up the household of faith.</h2>
               <div className="w-24 h-px bg-amber/50 my-8"></div>
               <p className="font-body text-xl md:text-2xl text-parchment/80 leading-relaxed font-light">
                  Brian Sauvé is a pastor, author, and musician serving Refuge Church in Ogden, Utah. He and his wife Lexy host the Bright Hearth podcast, and are blessed with a growing quiver of children.
               </p>
               <Link href="/about" className="inline-flex items-center gap-3 font-heading text-lg tracking-[0.2em] text-amber hover:text-parchment transition-colors uppercase pt-4">
                 READ FULL BIO <ArrowRight size={20} />
               </Link>
            </motion.div>
         </div>
      </section>

      {/* LATEST ALBUM SECTION */}
      <section className="py-32 bg-cathedral bg-texture-dark bg-cathedral-pattern text-parchment relative border-b-[12px] border-wood">
        <div className="absolute inset-0 bg-cathedral/95 mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-amber/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center"
          >
            <motion.div variants={fadeIn} className="w-full lg:w-1/2 relative">
              {/* Cathedral Window Frame */}
              <div className="absolute -inset-4 bg-wood rounded-t-[50rem] rounded-b-3xl shadow-2xl"></div>
              <div className="absolute -inset-2 bg-cathedral rounded-t-[50rem] rounded-b-2xl border border-amber/20"></div>
              
              <div className="aspect-[3/4] bg-wood p-2 relative shadow-inner rounded-t-[50rem] rounded-b-xl z-20 group">
                <div className="w-full h-full border border-amber/30 rounded-t-[50rem] rounded-b-lg overflow-hidden relative bg-cathedral">
                  <Image 
                    src="/images/awake-the-dawn.webp" 
                    alt="Awake the Dawn Album Cover" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="inline-block px-4 py-1 border border-amber/40 text-[10px] uppercase tracking-[0.3em] font-body text-amber mb-6 max-w-max rounded-sm">Latest Release</span>
              <h2 className="font-heading text-5xl md:text-7xl mb-8 text-parchment font-medium drop-shadow-lg">Awake the Dawn</h2>
              <p className="font-body text-xl md:text-2xl text-parchment/60 leading-relaxed mb-12">
                A new collection of original psalms, hymns, and spiritual songs for the gathered church and the Christian household.
              </p>
              
              <div className="space-y-6">
                <a href="https://open.spotify.com/artist/briansauve" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-b-2 border-wood pb-6 hover:border-amber hover:text-amber transition-all duration-300 group">
                  <span className="font-heading text-2xl tracking-[0.1em]">Listen on Spotify</span>
                  <ExternalLink size={24} className="text-parchment/30 group-hover:text-amber group-hover:scale-110 transition-all" />
                </a>
                <a href="https://music.apple.com/us/artist/brian-sauve" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-b-2 border-wood pb-6 hover:border-amber hover:text-amber transition-all duration-300 group">
                  <span className="font-heading text-2xl tracking-[0.1em]">Listen on Apple Music</span>
                  <ExternalLink size={24} className="text-parchment/30 group-hover:text-amber group-hover:scale-110 transition-all" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-32 bg-parchment bg-texture-light relative">
        <div className="absolute top-0 right-0 w-full max-w-3xl h-full bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-amber/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Pillar 1: Music */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center group cursor-pointer">
              <Link href="/music" className="contents">
                <div className="h-32 w-px bg-gradient-to-b from-transparent via-amber/40 to-transparent mb-10 group-hover:via-amber transition-all duration-700"></div>
                <div className="p-6 rounded-full bg-parchment shadow-[0_0_40px_rgba(200,134,10,0.1)] group-hover:shadow-[0_0_60px_rgba(200,134,10,0.2)] mb-8 transition-shadow duration-500">
                  <Music size={40} className="text-wood group-hover:text-amber transition-colors duration-300" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-4xl mb-6 text-oak">Psalms & Hymns</h3>
                <p className="font-body text-lg text-ink/70 leading-relaxed max-w-xs mb-10">Equipping the church with robust, singable theology and musical settings of the Psalms.</p>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber border-b border-amber/0 group-hover:border-amber/100 pb-1 transition-all pointer-events-auto">Explore Music</span>
              </Link>
            </motion.div>

            {/* Pillar 2: Words */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center group cursor-pointer mt-16 md:mt-0">
              <Link href="/words" className="contents">
                <div className="h-32 w-px bg-gradient-to-b from-transparent via-amber/40 to-transparent mb-10 group-hover:via-amber transition-all duration-700"></div>
                <div className="p-6 rounded-full bg-parchment shadow-[0_0_40px_rgba(200,134,10,0.1)] group-hover:shadow-[0_0_60px_rgba(200,134,10,0.2)] mb-8 transition-shadow duration-500">
                  <BookOpen size={40} className="text-wood group-hover:text-amber transition-colors duration-300" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-4xl mb-6 text-oak">Books & Essays</h3>
                <p className="font-body text-lg text-ink/70 leading-relaxed max-w-xs mb-10">Writings on theology, the household, and building the New Christendom.</p>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber border-b border-amber/0 group-hover:border-amber/100 pb-1 transition-all pointer-events-auto">Read Writings</span>
              </Link>
            </motion.div>

            {/* Pillar 3: Podcasts */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center group cursor-pointer mt-16 md:mt-0">
              <Link href="/listen" className="contents">
                <div className="h-32 w-px bg-gradient-to-b from-transparent via-amber/40 to-transparent mb-10 group-hover:via-amber transition-all duration-700"></div>
                <div className="p-6 rounded-full bg-parchment shadow-[0_0_40px_rgba(200,134,10,0.1)] group-hover:shadow-[0_0_60px_rgba(200,134,10,0.2)] mb-8 transition-shadow duration-500">
                  <Mic size={40} className="text-wood group-hover:text-amber transition-colors duration-300" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-4xl mb-6 text-oak">Podcasts</h3>
                <p className="font-body text-lg text-ink/70 leading-relaxed max-w-xs mb-10">Conversations on productive households and the biblical paranormal.</p>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber border-b border-amber/0 group-hover:border-amber/100 pb-1 transition-all pointer-events-auto">Listen Now</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PATREON STRIP */}
      <section className="py-40 bg-cathedral bg-texture-dark text-parchment text-center relative overflow-hidden border-t-[12px] border-wood">
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber/20 via-transparent to-transparent opacity-50 pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-x-0 bottom-0 h-96 opacity-30 pointer-events-none mix-blend-screen">
           <Image src="/images/cityscape.webp" alt="Cityscape graphics" fill className="object-cover object-bottom" />
        </div>
        <div className="absolute inset-x-0 bottom-0 border-b-[20px] border-oak"></div>
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-px bg-amber/50"></div>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl mb-8 italic tracking-wide drop-shadow-lg">Support the Work</h2>
          <p className="font-body text-xl md:text-2xl text-parchment/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            Partner with me on Patreon to help fund the production of new albums, books, and resources for the church.
          </p>
          <a 
            href="https://www.patreon.com/briansauve" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-14 py-6 bg-cathedral text-parchment bg-texture-dark border border-amber/20 font-heading text-2xl hover:bg-parchment hover:text-wood transition-all duration-500 tracking-[0.2em] shadow-2xl hover:shadow-amber/20 hover:-translate-y-1 rounded-sm"
          >
            BECOME A PATRON
          </a>
        </motion.div>
      </section>
    </div>
  );
}
