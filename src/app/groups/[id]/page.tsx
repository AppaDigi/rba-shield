"use client";

import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import FeedCard from "@/components/FeedCard";
import { Users, Calendar, Trophy, Plus, MapPin } from "lucide-react";

import { use } from "react";
import DesktopLayout from "@/components/DesktopLayout";

export default function GroupPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const groupId = parseInt(id);

    // Demo Data based on ID
    const GROUP_DATA = {
        1: {
            name: "The Gentry Club",
            banner: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1200",
            members: 12500,
            icon: Trophy,
            desc: "An exclusive society for the modern gentleman. Focused on rare vintages and high-stakes auctions."
        },
        2: {
            name: "New World Smokers",
            banner: "https://images.unsplash.com/photo-1510009653068-07b489a20078?w=1200",
            members: 8200,
            desc: "Celebrating the finest tobacco from Nicaragua, Dominican Republic, and Honduras."
        },
        3: {
            name: "Cuban Aficionados",
            banner: "https://images.unsplash.com/photo-1623157879673-10821b066316?w=1200",
            members: 5400,
            desc: "Dedicated to Habanos S.A. releases. Authenticity verification required for entry."
        },
        4: {
            name: "The Leaf Lounge",
            banner: "https://images.unsplash.com/photo-1533633310034-716914565780?w=1200",
            members: 3100,
            desc: "A casual space for sharing daily smokes and pairing recommendations."
        },
        5: {
            name: "Cigar Rolling Masters",
            banner: "https://images.unsplash.com/photo-1606771804928-854746f33967?w=1200",
            members: 1800,
            desc: "Learn from the torcedores. Workshops, masterclasses, and blend theory."
        },
        6: {
            name: "Whisky & Sticks",
            banner: "https://images.unsplash.com/photo-1577908993883-fa4c0d087799?w=1200",
            members: 9200,
            desc: "The perfect marriage of single malts and premium tobacco."
        }
    };

    const group = GROUP_DATA[groupId as keyof typeof GROUP_DATA] || GROUP_DATA[1];

    return (
        <DesktopLayout showRightSidebar={true}>
            <div className={styles.container}>
                {/* Banner */}
                <div className={styles.banner} style={{ backgroundImage: `url(${group.banner})` }}>
                    <div className={styles.bannerOverlay}>
                        <div className={styles.groupHeader}>
                            <div className={styles.groupAvatar}>
                                <Trophy size={48} className="text-gold" />
                            </div>
                            <div>
                                <h1 className={styles.groupTitle}>{group.name}</h1>
                                <div className={styles.groupMeta}>
                                    <span>Private Group</span> • <span>{group.members.toLocaleString()} Members</span>
                                </div>
                                <p className="text-gray-300 text-sm mt-1 max-w-lg hidden md:block">{group.desc}</p>
                            </div>
                            <button className={`${styles.joinBtn} ml-auto bg-gold text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform`}>
                                Join Group
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Layout */}
                <div className={styles.contentGrid}>

                    {/* Left Feed */}
                    <div className={styles.feed}>
                        {/* Create Post */}
                        <div className={styles.createPost}>
                            <img src="https://i.pravatar.cc/150?u=kiefer" className={styles.userAvatar} />
                            <input type="text" placeholder={`Discuss in ${group.name}...`} className={styles.postInput} />
                        </div>

                        <FeedCard
                            avatar="https://i.pravatar.cc/150?u=admin"
                            name="Club Admin"
                            time="Pinned Post"
                            text={`Welcome to ${group.name}. Please review the pinned rules regarding trading and civil discourse. Enjoy your stay.`}
                            likes={450}
                            comments={120}
                        />

                        <FeedCard
                            avatar="https://i.pravatar.cc/150?u=member1"
                            name="Sir Winston"
                            time="2h ago"
                            text="Tonight's pairing: A 1998 Cohiba Lancero with a glass of 25-year-old Macallan. Simply exquisite."
                            image="https://images.unsplash.com/photo-1577908993883-fa4c0d087799?w=800"
                            likes={89}
                            comments={24}
                        />
                    </div>

                    {/* Right Sidebar */}
                    <div className={styles.sidebar}>

                        {/* About Widget */}
                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>About</div>
                            <p className="text-sm text-gray-400 mb-4">{group.desc}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                <Users size={16} />
                                <span>{group.members.toLocaleString()} Members</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPin size={16} />
                                <span>Global • English</span>
                            </div>
                        </div>

                        {/* Members Widget */}
                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>New Members</div>
                            <div className={styles.memberList}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/150?u=${i + groupId * 10}`} className={styles.memberAvatar} />
                                ))}
                            </div>
                        </div>

                        {/* Events Widget */}
                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>Upcoming Events</div>
                            <div className={styles.eventItem}>
                                <div className={styles.dateBox}>
                                    <span className={styles.day}>12</span>
                                    <span className={styles.month}>OCT</span>
                                </div>
                                <div>
                                    <div className="font-bold">Annual Smoker</div>
                                    <div className="text-sm text-gray-400">London, UK</div>
                                </div>
                            </div>
                            <div className={styles.eventItem}>
                                <div className={styles.dateBox}>
                                    <span className={styles.day}>25</span>
                                    <span className={styles.month}>OCT</span>
                                </div>
                                <div>
                                    <div className="font-bold">Rolling Masterclass</div>
                                    <div className="text-sm text-gray-400">Online • Live</div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="lg:hidden">
                    <Navbar />
                </div>
            </div>
        </DesktopLayout>
    );
}
