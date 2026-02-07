"use client";

import FeedCard from "@/components/FeedCard";
import Navbar from "@/components/Navbar";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight"; // We will create this
import { Search, Bell, Menu, Plus } from "lucide-react";
import styles from "./page.module.css";
import Image from "next/image";

const STORIES = [
  { id: 1, name: "Your Story", user: "https://i.pravatar.cc/150?u=kiefer", active: false },
  { id: 2, name: "Winston", user: "https://i.pravatar.cc/150?u=winston", active: true },
  { id: 3, name: "The Gentry", user: "https://i.pravatar.cc/150?u=gentry", active: true },
  { id: 4, name: "Padron", user: "https://i.pravatar.cc/150?u=padron", active: true },
  { id: 5, name: "Cigar Afic.", user: "https://i.pravatar.cc/150?u=aficionado", active: true },
  { id: 6, name: "Havana Club", user: "https://i.pravatar.cc/150?u=havana", active: true },
];

const DUMMY_POSTS = [
  {
    id: 1,
    name: "Arthur Pendelton",
    avatar: "https://i.pravatar.cc/150?u=arthur",
    time: "2h ago",
    text: "Just acquired a box of Padron 1964 Anniversary Series. The draw is impeccable, notes of cocoa and espresso. Anyone care to join me in the study this evening?",
    image: "https://images.unsplash.com/photo-1510009653068-07b489a20078?q=80&w=1000&auto=format&fit=crop",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    name: "The Gentry Club",
    avatar: "https://i.pravatar.cc/150?u=gentry",
    time: "5h ago",
    text: "Reminder: The 'Duck Race' Raffle begins at 8:00 PM Sharp. Grand Prize: A humidor of vintage Cohibas. Don't be late.",
    image: "https://images.unsplash.com/photo-1606771804928-854746f33967?w=800",
    likes: 128,
    comments: 32,
  },
  {
    id: 3,
    name: "Eleanor Vance",
    avatar: "https://i.pravatar.cc/150?u=eleanor",
    time: "1d ago",
    text: "Comparing the new Liga Privada with a standard Montecristo. The results may surprise you. Full review in the 'Aficionados' group.",
    image: "https://images.unsplash.com/photo-1533633310034-716914565780?w=800",
    likes: 15,
    comments: 4,
  }
];

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className={styles.app}>

      {/* Desktop Grid Layout */}
      <div className={styles.desktopGrid}>

        {/* Left Sidebar (Desktop Nav) */}
        <div className={styles.leftSidebarWrapper}>
          <div style={{ position: 'sticky', top: 0 }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <h1 className={styles.logo}>CIGAR<br />CONNOISSEUR</h1>
            </div>
            <SidebarLeft />
          </div>
        </div>

        {/* Main Feed Column */}
        <div className={styles.mainFeedWrapper}>

          {/* Mobile Header (Hidden on Laptop+ via CSS if desired, but good for now) */}
          <header className={styles.headerWrapper}>
            <div className={styles.headerContent}>
              <div className={styles.brand}>
                <h1 className={styles.logo}>The Lounge</h1>
                <span className={styles.tagline}>Connected Tech • Vintage Soul</span>
              </div>
              <div className={styles.controls}>
                <button className={styles.controlBtn}><Search size={20} /></button>
                <button className={styles.controlBtn}><Bell size={20} /></button>
                <button className={styles.controlBtn}><Menu size={20} /></button>
              </div>
            </div>
          </header>

          {/* Stories Rail */}
          <div className={styles.stories}>
            {STORIES.map((story) => (
              <div key={story.id} className={styles.story}>
                <div className={styles.storyRing} style={{ background: story.active ? undefined : 'var(--bg-subtle)' }}>
                  <img src={story.user} alt={story.name} className={styles.storyUser} />
                </div>
                <span className={styles.storyName}>{story.name}</span>
              </div>
            ))}
          </div>

          {/* Create Post */}
          <div className={styles.createPost}>
            <img src="https://i.pravatar.cc/150?u=kiefer" className={styles.userAvatar} alt="Me" />
            <div className={styles.postInput}>Share your latest smoke...</div>
            <button className={styles.controlBtn}><Plus size={20} /></button>
          </div>

          {/* Feed */}
          <div className={styles.feed}>
            {DUMMY_POSTS.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FeedCard
                  name={post.name}
                  avatar={post.avatar}
                  time={post.time}
                  text={post.text}
                  image={post.image}
                  likes={post.likes}
                  comments={post.comments}
                />
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Sidebar (Trending/Friends) */}
        <div className={styles.rightSidebarWrapper}>
          <div style={{ position: 'sticky', top: 0 }}>
            <SidebarRight />
          </div>
        </div>

      </div>

      {/* Mobile Navbar (Only visible on small screens via CSS media query if we add it, currently distinct) */}
      <div className="lg:hidden">
        <Navbar />
      </div>
    </main>
  );
}
