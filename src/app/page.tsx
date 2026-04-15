"use client";

import { useState, useEffect, useCallback } from "react";
import FeedCard, { type FeedPost } from "@/components/FeedCard";
import Navbar from "@/components/Navbar";
import CreatePost from "@/components/CreatePost";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import { Search, Bell, Menu, Loader2 } from "lucide-react";
import styles from "./page.module.css";
import { motion } from "framer-motion";

const STORIES = [
  { id: 1, name: "Your Story", user: "https://i.pravatar.cc/150?u=kiefer", active: false },
  { id: 2, name: "Winston", user: "https://i.pravatar.cc/150?u=winston", active: true },
  { id: 3, name: "The Gentry", user: "https://i.pravatar.cc/150?u=gentry", active: true },
  { id: 4, name: "Padron", user: "https://i.pravatar.cc/150?u=padron", active: true },
  { id: 5, name: "Cigar Afic.", user: "https://i.pravatar.cc/150?u=aficionado", active: true },
  { id: 6, name: "Havana Club", user: "https://i.pravatar.cc/150?u=havana", active: true },
];

type FeedType = "latest" | "trending" | "friends";

export default function Home() {
  const [feed, setFeed] = useState<FeedType>("latest");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (feedType: FeedType, cursorId?: string) => {
    const params = new URLSearchParams({ feed: feedType, limit: "10" });
    if (cursorId) params.set("cursor", cursorId);
    const res = await fetch(`/api/posts?${params}`);
    const data = await res.json();
    return data as { posts: FeedPost[]; nextCursor: string | null };
  }, []);

  // Load feed on mount or when tab changes
  useEffect(() => {
    setLoading(true);
    setPosts([]);
    setCursor(null);
    setHasMore(true);
    fetchPosts(feed).then(({ posts: newPosts, nextCursor }) => {
      setPosts(newPosts);
      setCursor(nextCursor);
      setHasMore(!!nextCursor);
      setLoading(false);
    });
  }, [feed, fetchPosts]);

  async function loadMore() {
    if (!hasMore || loadingMore || !cursor) return;
    setLoadingMore(true);
    const { posts: more, nextCursor } = await fetchPosts(feed, cursor);
    setPosts((prev) => [...prev, ...more]);
    setCursor(nextCursor);
    setHasMore(!!nextCursor);
    setLoadingMore(false);
  }

  function handlePostCreated(newPost: FeedPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  function handlePostDeleted(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main className={styles.app}>
      <div className={styles.desktopGrid}>

        {/* Left Sidebar */}
        <div className={styles.leftSidebarWrapper}>
          <div style={{ position: "sticky", top: 0 }}>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <h1 className={styles.logo}>CIGAR<br />CONNOISSEUR</h1>
            </div>
            <SidebarLeft />
          </div>
        </div>

        {/* Main Feed */}
        <div className={styles.mainFeedWrapper}>

          {/* Mobile Header */}
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

            {/* Feed Filter Tabs */}
            <div className={styles.feedTabs}>
              {(["latest", "trending", "friends"] as FeedType[]).map((tab) => (
                <button
                  key={tab}
                  className={`${styles.feedTab} ${feed === tab ? styles.feedTabActive : ""}`}
                  onClick={() => setFeed(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </header>

          {/* Stories Rail */}
          <div className={styles.stories}>
            {STORIES.map((story) => (
              <div key={story.id} className={styles.story}>
                <div className={styles.storyRing} style={{ background: story.active ? undefined : "var(--bg-subtle)" }}>
                  <img src={story.user} alt={story.name} className={styles.storyUser} />
                </div>
                <span className={styles.storyName}>{story.name}</span>
              </div>
            ))}
          </div>

          {/* Create Post */}
          <div style={{ padding: "0 1rem" }}>
            <CreatePost onPostCreated={handlePostCreated} />
          </div>

          {/* Feed */}
          <div className={styles.feed} style={{ padding: "0 1rem" }}>
            {loading ? (
              <div className={styles.loadingState}>
                <Loader2 size={28} className={styles.spinner} />
                <span>Loading feed...</span>
              </div>
            ) : posts.length === 0 ? (
              <div className={styles.emptyState}>
                <p>
                  {feed === "friends"
                    ? "No posts from people you follow yet. Find some folks to follow!"
                    : "No posts yet. Be the first to share something."}
                </p>
              </div>
            ) : (
              <>
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  >
                    <FeedCard post={post} onDelete={handlePostDeleted} />
                  </motion.div>
                ))}

                {hasMore && (
                  <div className={styles.loadMoreWrapper}>
                    <button
                      className={styles.loadMoreBtn}
                      onClick={loadMore}
                      disabled={loadingMore}
                    >
                      {loadingMore ? (
                        <><Loader2 size={16} className={styles.spinner} /> Loading...</>
                      ) : (
                        "Load more"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebarWrapper}>
          <div style={{ position: "sticky", top: 0 }}>
            <SidebarRight />
          </div>
        </div>

      </div>

      <div className="lg:hidden">
        <Navbar />
      </div>
    </main>
  );
}
