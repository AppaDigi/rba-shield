"use client";

import Navbar from "@/components/Navbar";
import styles from "./ProfileDesktop.module.css";
import FeedCard from "@/components/FeedCard";
import {
    Camera,
    MapPin,
    Calendar,
    Star,
    Trophy,
    Briefcase,
    MoreHorizontal,
    MessageCircle,
    Users,
    Heart,
    Edit,
    Video,
    Image as ImageIcon
} from "lucide-react";

import { motion } from "framer-motion";

export default function ProfilePage() {
    return (
        <div className={styles.container}>
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.profileHeader}
            >
                <div className={styles.coverPhoto} style={{ backgroundImage: "url(https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=1600)" }}>
                    <button className={styles.coverEditBtn}>
                        <Camera size={20} />
                        <span>Edit Cover Photo</span>
                    </button>
                </div>

                <div className={styles.headerContent}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className={styles.avatarWrapper}
                    >
                        <img src="https://i.pravatar.cc/300?u=kiefer" alt="Profile" className={styles.avatar} />
                    </motion.div>

                    <div className={styles.userInfo}>
                        <h1 className={styles.name}>Kiefer Revell</h1>
                        <p className={styles.headline}>Cigar Aficionado • Tech Lead • Vintage Collector</p>
                        <div className="flex gap-4 mt-2 text-gray-400 text-sm">
                            <span className="cursor-pointer hover:underline font-semibold text-white">482 Friends</span>
                            <span className="cursor-pointer hover:underline">12 Mutual</span>
                        </div>

                        {/* Friends Avatars */}
                        <div className="flex -space-x-2 mt-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-[#1A120B]" />
                            ))}
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={`${styles.primaryBtn} bg-gold text-black`}>
                            <Users size={20} />
                            <span>Add Friend</span>
                        </button>
                        <button className={`${styles.secondaryBtn} bg-gray-700`}>
                            <MessageCircle size={20} />
                            <span>Message</span>
                        </button>
                        <button className={`${styles.secondaryBtn} bg-gray-700`}>
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className={styles.navTabs}>
                    <div className={`${styles.tab} ${styles.activeTab}`}>Posts</div>
                    <div className={styles.tab}>About</div>
                    <div className={styles.tab}>Friends</div>
                    <div className={styles.tab}>Photos</div>
                    <div className={styles.tab}>Videos</div>
                    <div className={styles.tab}>Swaps</div>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className={styles.contentGrid}>

                {/* Left Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-4"
                >

                    {/* Intro Card */}
                    <div className={styles.introCard}>
                        <h2 className={styles.cardTitle}>Intro</h2>
                        <div className={styles.introItem}>
                            <Briefcase size={20} className="text-gray-400" />
                            <span>Founder at <strong>Revell Tech</strong></span>
                        </div>
                        <div className={styles.introItem}>
                            <MapPin size={20} className="text-gray-400" />
                            <span>Lives in <strong>Austin, Texas</strong></span>
                        </div>
                        <div className={styles.introItem}>
                            <Calendar size={20} className="text-gray-400" />
                            <span>Joined September 2024</span>
                        </div>
                        <div className={styles.introItem}>
                            <Trophy size={20} className="text-gold" />
                            <span>Connoisseur Level 5</span>
                        </div>
                        <button className="w-full bg-gray-800 text-white rounded-md py-2 mt-2 font-semibold">Edit Details</button>
                    </div>

                    {/* Stats Card */}
                    <div className={styles.statsCard}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={styles.cardTitle}>Cigar Stats</h2>
                            <span className="text-gold text-sm font-bold">See All</span>
                        </div>

                        <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-400">Favorite Smoke</span>
                            <span className="font-semibold text-right">Padron 1964<br />Anniversary</span>
                        </div>

                        <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-400">Humidor Count</span>
                            <span className="font-semibold">142 Sticks</span>
                        </div>

                        <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-400">Swap Rating</span>
                            <div className="flex text-gold">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <span className="ml-1 text-white font-bold">5.0</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <span className="text-gray-400 text-sm">Last Swap Transaction</span>
                            <div className={styles.lastSwap}>
                                <img src="https://i.pravatar.cc/100?u=trader" className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="text-sm font-bold">Traded with @TheDuke</div>
                                    <div className="text-xs text-green-400">Successful • Oct 12</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Photos Card */}
                    <div className={styles.photosCard}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={styles.cardTitle}>Photos</h2>
                            <span className="text-gold text-sm cursor-pointer">See All Photos</span>
                        </div>
                        <div className={styles.grid3}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                                <img key={i} src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=300`} className={styles.gridPhoto} />
                            ))}
                        </div>
                    </div>

                </motion.div>

                {/* Feed Column */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col"
                >

                    {/* Create Post */}
                    <div className={styles.createPost}>
                        <div className="flex gap-3 w-full border-b border-gray-800 pb-4">
                            <img src="https://i.pravatar.cc/300?u=kiefer" className={styles.userThumb} />
                            <input type="text" placeholder="What's on your mind, Kiefer?" className="flex-1 bg-transparent outline-none text-white text-lg placeholder-gray-500" />
                        </div>
                        <div className="flex pt-4 justify-between w-full">
                            <button className="flex items-center gap-2 text-gray-400 hover:bg-gray-800 px-4 py-2 rounded-md flex-1 justify-center transition-colors">
                                <Video className="text-red-500" />
                                <span>Live Video</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:bg-gray-800 px-4 py-2 rounded-md flex-1 justify-center transition-colors">
                                <ImageIcon className="text-green-500" />
                                <span>Photo/Video</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:bg-gray-800 px-4 py-2 rounded-md flex-1 justify-center transition-colors">
                                <Star className="text-yellow-500" />
                                <span>Review/Rating</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="bg-[#2C241B] p-4 rounded-lg border border-[#3E3228] mb-6 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Posts</h3>
                        <button className="bg-[#3E3228] px-3 py-1 rounded text-sm flex items-center gap-2">
                            <SlidersIcon size={16} /> Filters
                        </button>
                    </div>

                    {/* Feed */}
                    <div className="flex flex-col gap-6">
                        <FeedCard
                            name="Kiefer Revell"
                            avatar="https://i.pravatar.cc/300?u=kiefer"
                            time="1h ago"
                            text="Just finished setting up the new humidor. Currently seasoning it with Boveda 84% packs. Can't wait to fill this beauty with some Cubans."
                            image="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800"
                            likes={24}
                            comments={5}
                        />
                        <FeedCard
                            name="Kiefer Revell"
                            avatar="https://i.pravatar.cc/300?u=kiefer"
                            time="2d ago"
                            text="Had an amazing trade with @TheDuke. Highly recommend dealing with him. The packaging was immaculate."
                            likes={89}
                            comments={12}
                        />
                    </div>

                </motion.div>

            </div>

            <div className="lg:hidden">
                <Navbar />
            </div>
        </div >
    );
}

function SlidersIcon({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="4" y1="21" y2="14" />
            <line x1="4" x2="4" y1="10" y2="3" />
            <line x1="12" x2="12" y1="21" y2="12" />
            <line x1="12" x2="12" y1="8" y2="3" />
            <line x1="20" x2="20" y1="21" y2="16" />
            <line x1="20" x2="20" y1="12" y2="3" />
            <line x1="1" x2="7" y1="14" y2="14" />
            <line x1="9" x2="15" y1="8" y2="8" />
            <line x1="17" x2="23" y1="16" y2="16" />
        </svg>
    )
}
