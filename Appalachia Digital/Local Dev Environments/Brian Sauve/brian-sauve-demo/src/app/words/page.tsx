/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, PenTool } from "lucide-react";

const articles = [
  {
    title: "The Architecture of the Christian Household",
    date: "OCTOBER 14, 2023",
    description: "Rebuilding productive households requires us to think architecturally about our lives—not just building shelter, but designing an engine for dominion.",
    url: "#"
  },
  {
    title: "Singing the Psalms as War",
    date: "AUGUST 02, 2023",
    description: "Why the modern church must recover the imprecatory psalms. They are not an embarrassment to the gospel; they are the weapons of our warfare.",
    url: "#"
  },
  {
    title: "Fathers, Teach Your Sons to Fight",
    date: "MAY 19, 2023",
    description: "A generation of men raised on safetyism cannot inherit the earth. Why Christian fathers must cultivate controlled aggression in their sons.",
    url: "#"
  }
];

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const fadeIn: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function WordsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-parchment bg-texture-light">
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
            <BookOpen size={48} className="mx-auto mb-6 text-amber" strokeWidth={1} />
            <h1 className="font-heading text-5xl md:text-7xl italic tracking-tight font-medium mb-6">Books &amp; Essays</h1>
            <p className="font-body text-xl md:text-2xl text-ink/70 max-w-2xl mx-auto leading-relaxed">
              Writings spanning theology, the household, and the project of building the New Christendom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BOOKS SECTION */}
      <section className="py-32 bg-wood bg-texture-dark text-parchment border-y-[12px] border-cathedral relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber/5 via-transparent to-transparent opacity-50 mix-blend-screen pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center"
          >
            <motion.div variants={fadeIn} className="w-full md:w-1/2 relative group">
              {/* Typographic Book Cover */}
              <div className="aspect-[3/4] bg-cathedral bg-texture-dark border-4 border-oak p-8 flex flex-col justify-between items-center text-center shadow-2xl relative rounded-t-[30rem] overflow-hidden group-hover:border-amber/50 transition-colors duration-700">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber/10 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                <div className="space-y-6 z-10 w-full mt-12">
                  <h3 className="font-heading text-sm tracking-[0.3em] text-amber/80 uppercase">New Christendom Press</h3>
                  <div className="w-16 h-px bg-amber/50 mx-auto"></div>
                  <h2 className="font-heading text-5xl md:text-6xl text-parchment uppercase tracking-widest leading-tight">HAUNTED<br/>COSMOS</h2>
                </div>
                
                <div className="z-10 w-full">
                  <span className="font-heading text-lg tracking-[0.3em] text-parchment/60 uppercase">Brian Sauvé & Ben Garrett</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] font-body text-amber mb-4">Hardcover Book</span>
              <h2 className="font-heading text-4xl md:text-5xl mb-6 text-parchment font-medium">Haunted Cosmos, Vol. 1</h2>
              <p className="font-body text-lg text-parchment/70 leading-relaxed mb-8">
                A theological field guide to the high strangeness of the biblical worldview. Available exclusively through New Christendom Press in a premium clothbound hardcover edition.
              </p>
              
              <a href="https://newchristendompress.com" target="_blank" rel="noopener noreferrer" className="inline-block border text-center border-amber bg-amber/10 hover:bg-amber text-amber hover:text-ink transition-colors duration-300 font-heading text-lg tracking-[0.2em] px-8 py-4 w-full sm:w-auto">
                PRE-ORDER NOW
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES & PREACHING */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Articles Column */}
            <motion.div 
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="flex items-center gap-4 mb-12 border-b border-amber/30 pb-4">
                <PenTool className="text-amber" size={24} />
                <h2 className="font-heading text-3xl tracking-wide">Recent Essays</h2>
              </div>
              
              <div className="space-y-12">
                {articles.map((article, index) => (
                  <motion.article key={index} variants={fadeIn} className="group">
                    <span className="text-xs font-body tracking-[0.2em] text-amber mb-2 block">{article.date}</span>
                    <h3 className="font-heading text-3xl mb-3 group-hover:text-amber transition-colors">
                      <a href={article.url}>{article.title}</a>
                    </h3>
                    <p className="font-body text-ink/70 text-lg leading-relaxed mb-4 max-w-2xl">
                      {article.description}
                    </p>
                    <a href={article.url} className="inline-flex items-center gap-2 text-sm font-heading tracking-widest text-ink hover:text-amber transition-colors">
                      READ ESSAY <ExternalLink size={14} />
                    </a>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            {/* Preaching Sidebar */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-cathedral bg-texture-dark text-parchment p-8 md:p-10 sticky top-36 border-4 border-wood shadow-2xl rounded-t-[20rem] relative overflow-hidden">
                <div className="absolute inset-0 bg-cathedral/90 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber/10 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber block mb-4 mt-8 text-center">Pastoral Ministry</span>
                  <h3 className="font-heading text-4xl mb-6 italic font-medium text-center drop-shadow-sm">Preaching</h3>
                  <div className="w-16 h-px bg-amber/50 mb-8 mx-auto"></div>
                <p className="font-body text-parchment/70 leading-relaxed mb-8">
                  I serve as one of the pastors at Refuge Church in Ogden, Utah. My weekly sermons are available on the church website, focusing on expository preaching and building up the saints.
                </p>
                <a 
                  href="https://refugeutah.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between border-b border-amber/30 pb-2 hover:border-amber text-amber/90 transition-colors group"
                >
                  <span className="font-heading tracking-[0.1em] text-lg uppercase">Listen at Refuge</span>
                  <ExternalLink size={18} className="text-amber/50 group-hover:text-amber" />
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
