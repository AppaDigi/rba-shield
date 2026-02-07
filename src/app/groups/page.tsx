"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { Users, Search, Plus, Trophy, Zap, MapPin, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import DesktopLayout from "@/components/DesktopLayout";

export default function GroupsPage() {
    const groups = [
        {
            id: 1,
            name: "The Gentry Club",
            members: 12500,
            category: "Exclusive",
            image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800",
            icon: Trophy
        },
        {
            id: 2,
            name: "New World Smokers",
            members: 8200,
            category: "Regional",
            image: "https://images.unsplash.com/photo-1510009653068-07b489a20078?w=800",
            icon: MapPin
        },
        {
            id: 3,
            name: "Cuban Aficionados",
            members: 5400,
            category: "Vintage",
            image: "https://images.unsplash.com/photo-1623157879673-10821b066316?w=800",
            icon: Globe
        },
        {
            id: 4,
            name: "The Leaf Lounge",
            members: 3100,
            category: "Social",
            image: "https://images.unsplash.com/photo-1533633310034-716914565780?w=800",
            icon: Users
        },
        {
            id: 5,
            name: "Cigar Rolling Masters",
            members: 1800,
            category: "Educational",
            image: "https://images.unsplash.com/photo-1606771804928-854746f33967?w=800",
            icon: Zap
        },
        {
            id: 6,
            name: "Whisky & Sticks",
            members: 9200,
            category: "Pairing",
            image: "https://images.unsplash.com/photo-1577908993883-fa4c0d087799?w=800",
            icon: Trophy
        }
    ];

    return (
        <DesktopLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Cigar Societies</h1>
                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} size={20} />
                        <input type="text" placeholder="Find a society..." className={styles.searchInput} />
                    </div>
                    <button className={styles.createBtn}>
                        <Plus size={20} />
                        <span className="hidden md:inline">Create Society</span>
                    </button>
                </div>

                <div className={styles.filters}>
                    <button className={`${styles.filterBtn} ${styles.activeFilter}`}>All Societies</button>
                    <button className={styles.filterBtn}>My Groups</button>
                    <button className={styles.filterBtn}>Local Chapters</button>
                    <button className={styles.filterBtn}>Brand Specific</button>
                </div>

                <div className={styles.grid}>
                    {groups.map((group, index) => (
                        <motion.div
                            key={group.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <div className={styles.cardCover} style={{ backgroundImage: `url(${group.image})` }}>
                                <span className={styles.groupCategory}>{group.category}</span>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.groupIcon}>
                                    <group.icon size={28} className="text-gold" />
                                </div>
                                <h3 className={styles.groupName}>{group.name}</h3>
                                <div className={styles.groupMeta}>
                                    <Users size={14} className="text-gray-400" />
                                    <span>{group.members.toLocaleString()} Members</span>
                                </div>
                                <Link href={`/groups/${group.id}`} className={styles.joinBtn}>
                                    View Society
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:hidden">
                    <Navbar />
                </div>
            </div>
        </DesktopLayout>
    );
}
