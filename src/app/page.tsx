"use client";

import { useState, useEffect, useCallback } from "react";
import FeedCard, { type FeedPost } from "@/components/FeedCard";
import Navbar from "@/components/Navbar";
import CreatePost from "@/components/CreatePost";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import { Search, Bell, Menu, Loader2 } from "lucide-react";
import styles from "./page.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";

type FeedType = "latest" | "trending" | "friends";

interface StoryAuthor {
  id: string;
  name: string | null;
  username: string;
  avatar: string | null;
}

interface Story {
  id: string;
  imageUrl: string;
  caption: string | null;
  authorId: string;
  author: StoryAuthor;
}

export default function Home() {
  const { data: session } = useSession();
  const [feed, setFeed] = useState<FeedType>("latest");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [stories, setStories] = useState<Story[]>([]);

  const fetchPosts = useCallback(async (feedType: FeedType, cursorId?: string) => {
    const params = new URLSearchParams({ feed: feedType, limit: "10" });
    if (cursorId) params.set("cursor", cursorId);
    const res = await fetch(`/api/posts?${params}`);
    const data = await res.json();
    return data as { posts: FeedPost[]; nextCursor: string | null };
  }, []);

  function switchFeed(nextFeed: FeedType) {
    setFeed(nextFeed);
    setLoading(true);
    setPosts([]);
    setCursor(null);
    setHasMore(true);
  }

  useEffect(() => {
    let cancelled = false;

    fetchPosts(feed).then(({ posts: newPosts, nextCursor }) => {
      if (cancelled) return;
      setPosts(newPosts);
      setCursor(nextCursor);
      setHasMore(!!nextCursor);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [feed, fetchPosts]);

  useEffect(() => {
    if (!session?.user?.id) return;

    fetch("/api/notifications")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setUnreadNotifications(data?.unreadCount ?? 0))
      .catch(() => setUnreadNotifications(0));
  }, [session?.user?.id]);

  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.ok ? res.json() : [])
      .then((data: Story[]) => setStories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

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

  const visiblePosts = posts.filter((post) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      post.content.toLowerCase().includes(query) ||
      (post.author.name ?? "").toLowerCase().includes(query) ||
      post.author.username.toLowerCase().includes(query)
    );
  });

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
                <button className={styles.controlBtn} onClick={() => setSearchOpen((value) => !value)} aria-label="Search lounge posts">
                  <Search size={20} />
                </button>
                <Link className={styles.controlBtn} href="/notifications" aria-label="Open notifications">
                  <Bell size={20} />
                  {session?.user?.id && unreadNotifications > 0 && <span className={styles.controlBadge}>{Math.min(unreadNotifications, 9)}</span>}
                </Link>
                <button className={styles.controlBtn} onClick={() => setHeaderMenuOpen((value) => !value)} aria-label="Open menu">
                  <Menu size={20} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.mobileSearchWrap}
                >
                  <div className={styles.mobileSearch}>
                    <Search size={16} className={styles.mobileSearchIcon} />
                    <input
                      className={styles.mobileSearchInput}
                      placeholder="Search posts, names, and @usernames"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {headerMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={styles.headerMenu}
                >
                  <Link href={session?.user?.username ? `/profile/${session.user.username}` : "/auth/login"} className={styles.headerMenuLink} onClick={() => setHeaderMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link href="/messages" className={styles.headerMenuLink} onClick={() => setHeaderMenuOpen(false)}>
                    Messages
                  </Link>
                  <Link href="/notifications" className={styles.headerMenuLink} onClick={() => setHeaderMenuOpen(false)}>
                    Notifications
                  </Link>
                  <Link href="/settings" className={styles.headerMenuLink} onClick={() => setHeaderMenuOpen(false)}>
                    Settings
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feed Filter Tabs */}
            <div className={styles.feedTabs}>
              {(["latest", "trending", "friends"] as FeedType[]).map((tab) => (
                <button
                  key={tab}
                  className={`${styles.feedTab} ${feed === tab ? styles.feedTabActive : ""}`}
                  onClick={() => switchFeed(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </header>

          {/* Stories Rail */}
          <div className={styles.stories}>
            {/* Your Story slot */}
            {session?.user && (
              <div className={styles.story}>
                <div className={styles.storyRing} style={{ background: "var(--bg-subtle)" }}>
                  {session.user.image ? (
                    <img src={session.user.image} alt="Your Story" className={styles.storyUser} />
                  ) : (
                    <div className={styles.storyUser} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-card)", color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 700 }}>
                      {(session.user.name ?? "Y").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className={styles.storyName}>Your Story</span>
              </div>
            )}
            {stories.map((story) => (
              <div key={story.id} className={styles.story}>
                <div className={styles.storyRing}>
                  {story.author.avatar ? (
                    <img src={story.author.avatar} alt={story.author.name ?? story.author.username} className={styles.storyUser} />
                  ) : (
                    <div className={styles.storyUser} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-card)", color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 700 }}>
                      {(story.author.name ?? story.author.username).charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className={styles.storyName}>{story.author.name ?? story.author.username}</span>
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
            ) : visiblePosts.length === 0 ? (
              <div className={styles.emptyState}>
                <p>
                  {searchQuery
                    ? "No lounge posts match that search yet."
                    : feed === "friends"
                      ? "No posts from people you follow yet. Find some folks to follow!"
                      : "No posts yet. Be the first to share something."}
                </p>
              </div>
            ) : (
              <>
                {visiblePosts.map((post, index) => (
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
