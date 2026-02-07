"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

const SWAPS = [
    { id: 1, offering: "Cohiba Behike 56", seeking: "Padron 50th Anniv.", image: "https://images.unsplash.com/photo-1577908993883-fa4c0d087799?w=500" },
    { id: 2, offering: "Arturo Fuente Opus X", seeking: "Vintage Davidoff", image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=500" },
    { id: 3, offering: "Liga Privada No. 9", seeking: "Montecristo No. 2", image: "https://images.unsplash.com/photo-1533633310034-716914565780?w=500" },
    { id: 4, offering: "Partagas Serie D", seeking: "My Father Le Bijou", image: "https://images.unsplash.com/photo-1606771804928-854746f33967?w=500" },
];

export default function SwapsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.25rem" }}>
                    <h1 className={styles.title}>The Exchange</h1>
                    <ArrowLeftRight size={22} className="text-accent" />
                </div>
                <p className={styles.subtitle}>Curated Trades for the Discerning.</p>
            </header>

            <div className={styles.grid}>
                {SWAPS.map((swap, index) => (
                    <motion.div
                        key={swap.id}
                        className={styles.card}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className={styles.imageContainer}>
                            <div className={styles.badge}>SWAP</div>
                            <img src={swap.image} alt={swap.offering} className={styles.image} />
                        </div>
                        <div className={styles.details}>
                            <h3 className={styles.offering}>{swap.offering}</h3>
                            <div className={styles.seekingRow}>
                                <span className={styles.seekingLabel}>In Exchange For</span>
                                <span className={styles.seeking}>{swap.seeking}</span>
                            </div>
                            <button className={styles.swapButton}>Analyze Trade</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="lg:hidden">
                <Navbar />
            </div>
        </div>
    );
}
