"use client";

import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import { Search, MapPin, Globe, BookOpen, Clock, Tag } from "lucide-react";
import Image from "next/image";
import DesktopLayout from "@/components/DesktopLayout";

export default function KnowledgePage() {
    return (
        <DesktopLayout>
            <div className={styles.container}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>The Encyclopedia of Cigars</h1>
                    <p className={styles.subtitle}>
                        Explore the history, craftsmanship, and culture of the world's finest tobacco. <br />From seed to ash, master the art.
                    </p>

                    <div className={styles.searchWrapper}>
                        <input type="text" placeholder="Search cultivars, regions, brands..." className={styles.searchInput} />
                        <Search size={20} className={styles.searchIcon} />
                    </div>
                </div>

                {/* Categories */}
                <div className={styles.categoryGrid}>
                    <div className={styles.categoryCard}>
                        <div className={styles.iconWrapper}><MapPin size={24} /></div>
                        <div className={styles.catTitle}>Regions & Terroir</div>
                        <div className={styles.catDesc}>Discover the unique profiles of Vuelta Abajo, Estelí, and the Cibao Valley.</div>
                    </div>
                    <div className={styles.categoryCard}>
                        <div className={styles.iconWrapper}><Tag size={24} /></div>
                        <div className={styles.catTitle}>Shapes & Sizes</div>
                        <div className={styles.catDesc}>Learn the difference between a Robusto, Churchill, and the elusive Lancero.</div>
                    </div>
                    <div className={styles.categoryCard}>
                        <div className={styles.iconWrapper}><Clock size={24} /></div>
                        <div className={styles.catTitle}>Aging & Storage</div>
                        <div className={styles.catDesc}>Master the art of humidity control and long-term aging for peak flavor.</div>
                    </div>
                    <div className={styles.categoryCard}>
                        <div className={styles.iconWrapper}><BookOpen size={24} /></div>
                        <div className={styles.catTitle}>Etiquette & Handling</div>
                        <div className={styles.catDesc}>Proper cutting, lighting techniques, and lounge decorum for the modern gentleman.</div>
                    </div>
                </div>

                {/* Featured Article */}
                <div className={styles.featuredSection}>
                    <div className={styles.featuredImage}>
                        <img src="https://images.unsplash.com/photo-1623157879673-10821b066316?w=1000" alt="Habano Seed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className={styles.featuredContent}>
                        <span className={styles.featuredLabel}>Featured Masterclass</span>
                        <h2 className={styles.featuredHeadline}>The Lost Art of wrapper selection: Claro to Oscuro</h2>
                        <p className={styles.featuredExcerpt}>
                            Understanding the intricate fermentation process that gives a Maduro its sweetness and a Connecticut its creaminess. We dive deep into the chemistry of the leaf.
                        </p>
                        <button className={styles.readBtn}>Read Article</button>
                    </div>
                </div>

                <div className="lg:hidden">
                    <Navbar />
                </div>
            </div>
        </DesktopLayout>
    );
}
