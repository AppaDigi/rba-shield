"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import { Search, MapPin, Globe, BookOpen, Clock, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import DesktopLayout from "@/components/DesktopLayout";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface ArticleSummary {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    category: string;
    coverImage: string | null;
    authorName: string | null;
    readTime: number;
    views: number;
    createdAt: string;
}

const CATEGORIES = [
    { key: "REGION",    label: "Regions & Terroir",   icon: MapPin,   desc: "Discover the unique profiles of Vuelta Abajo, Estelí, and the Cibao Valley." },
    { key: "SHAPE",     label: "Shapes & Sizes",       icon: Tag,      desc: "Learn the difference between a Robusto, Churchill, and the elusive Lancero." },
    { key: "AGING",     label: "Aging & Storage",      icon: Clock,    desc: "Master humidity control and long-term aging for peak flavor." },
    { key: "ETIQUETTE", label: "Etiquette & Handling", icon: BookOpen, desc: "Proper cutting, lighting, and lounge decorum for the modern gentleman." },
    { key: "BRAND",     label: "Brand Profiles",       icon: Globe,    desc: "The heritage and craft behind the world's great cigar houses." },
    { key: "BLEND",     label: "Wrappers & Blends",    icon: Tag,      desc: "From Claro to Oscuro — understanding the soul of the cigar." },
];

export default function KnowledgePage() {
    const [articles, setArticles] = useState<ArticleSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchArticles = useCallback(async (q: string, category: string | null) => {
        setLoading(true);
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (category) params.set("category", category);
        const res = await fetch(`/api/knowledge/articles?${params}`);
        const data = await res.json();
        setArticles(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchArticles("", null);
    }, [fetchArticles]);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setQuery(val);
        setActiveCategory(null);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => fetchArticles(val, null), 350);
    }

    function handleCategory(key: string) {
        const next = activeCategory === key ? null : key;
        setActiveCategory(next);
        setQuery("");
        fetchArticles("", next);
    }

    const featured = articles.find(a => a.coverImage) ?? articles[0];
    const rest = articles.filter(a => a !== featured);

    return (
        <DesktopLayout>
            <div className={styles.container}>
                {/* Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>The Encyclopedia of Cigars</h1>
                    <p className={styles.subtitle}>
                        Explore the history, craftsmanship, and culture of the world&apos;s finest tobacco.
                    </p>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Search cultivars, regions, brands..."
                            className={styles.searchInput}
                            value={query}
                            onChange={handleSearch}
                        />
                        <Search size={20} className={styles.searchIcon} />
                    </div>
                </div>

                {/* Category filters */}
                <div className={styles.categoryGrid}>
                    {CATEGORIES.map(({ key, label, icon: Icon, desc }) => (
                        <button
                            key={key}
                            className={`${styles.categoryCard} ${activeCategory === key ? styles.categoryActive : ""}`}
                            onClick={() => handleCategory(key)}
                        >
                            <div className={styles.iconWrapper}><Icon size={22} /></div>
                            <div className={styles.catTitle}>{label}</div>
                            <div className={styles.catDesc}>{desc}</div>
                        </button>
                    ))}
                </div>

                {/* Articles */}
                {loading ? (
                    <div className={styles.loadingState}><Loader2 size={28} className={styles.spinner} /></div>
                ) : articles.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No articles found{query ? ` for "${query}"` : ""}.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured article */}
                        {featured && !query && !activeCategory && (
                            <div className={styles.featuredSection}>
                                {featured.coverImage && (
                                    <div className={styles.featuredImage}>
                                        <img src={featured.coverImage} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                )}
                                <div className={styles.featuredContent}>
                                    <span className={styles.featuredLabel}>
                                        {CATEGORIES.find(c => c.key === featured.category)?.label ?? featured.category}
                                    </span>
                                    <h2 className={styles.featuredHeadline}>{featured.title}</h2>
                                    <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                                    <div className={styles.featuredMeta}>
                                        {featured.authorName && <span>{featured.authorName}</span>}
                                        <span>{featured.readTime} min read</span>
                                        <span>{featured.views} views</span>
                                    </div>
                                    <Link href={`/knowledge/${featured.slug}`} className={styles.readBtn}>
                                        Read Article
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Article grid */}
                        <h2 className={styles.sectionTitle}>
                            {activeCategory
                                ? CATEGORIES.find(c => c.key === activeCategory)?.label
                                : query
                                ? `Results for "${query}"`
                                : "All Articles"}
                        </h2>
                        <div className={styles.articleGrid}>
                            {(query || activeCategory ? articles : rest).map((article, i) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                >
                                    <Link href={`/knowledge/${article.slug}`} className={styles.articleCard}>
                                        {article.coverImage && (
                                            <div className={styles.articleImg}>
                                                <img src={article.coverImage} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            </div>
                                        )}
                                        <div className={styles.articleBody}>
                                            <span className={styles.articleCategory}>
                                                {CATEGORIES.find(c => c.key === article.category)?.label ?? article.category}
                                            </span>
                                            <h3 className={styles.articleTitle}>{article.title}</h3>
                                            {article.excerpt && <p className={styles.articleExcerpt}>{article.excerpt}</p>}
                                            <div className={styles.articleMeta}>
                                                {article.authorName && <span>{article.authorName}</span>}
                                                <span>{article.readTime} min</span>
                                                <span>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}

                <div className="lg:hidden"><Navbar /></div>
            </div>
        </DesktopLayout>
    );
}
