"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DesktopLayout from "@/components/DesktopLayout";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Clock, Eye, Tag, Loader2 } from "lucide-react";
import styles from "./page.module.css";

interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    category: string;
    coverImage: string | null;
    authorName: string | null;
    readTime: number;
    views: number;
    createdAt: string;
    updatedAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
    REGION: "Regions & Terroir",
    SHAPE: "Shapes & Sizes",
    AGING: "Aging & Storage",
    ETIQUETTE: "Etiquette & Handling",
    BRAND: "Brand Profiles",
    BLEND: "Wrappers & Blends",
};

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) return;
        fetch(`/api/knowledge/articles/${slug}`)
            .then(async res => {
                if (res.status === 404) { setNotFound(true); return; }
                const data: Article = await res.json();
                setArticle(data);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <DesktopLayout>
                <div className={styles.loadingState}>
                    <Loader2 size={28} className={styles.spinner} />
                </div>
            </DesktopLayout>
        );
    }

    if (notFound || !article) {
        return (
            <DesktopLayout>
                <div className={styles.notFound}>
                    <p>Article not found.</p>
                    <Link href="/knowledge" className={styles.backLink}>
                        <ArrowLeft size={16} /> Back to Encyclopedia
                    </Link>
                </div>
            </DesktopLayout>
        );
    }

    const categoryLabel = CATEGORY_LABELS[article.category] ?? article.category;
    const publishDate = new Date(article.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
    });

    return (
        <DesktopLayout>
            <div className={styles.container}>
                {/* Back nav */}
                <Link href="/knowledge" className={styles.backLink}>
                    <ArrowLeft size={16} /> Encyclopedia
                </Link>

                {/* Article header */}
                <header className={styles.articleHeader}>
                    <span className={styles.categoryBadge}>{categoryLabel}</span>
                    <h1 className={styles.title}>{article.title}</h1>
                    {article.excerpt && (
                        <p className={styles.excerpt}>{article.excerpt}</p>
                    )}

                    <div className={styles.meta}>
                        {article.authorName && (
                            <span className={styles.metaItem}>
                                <span className={styles.metaLabel}>By</span> {article.authorName}
                            </span>
                        )}
                        <span className={styles.metaItem}>
                            <Clock size={13} /> {article.readTime} min read
                        </span>
                        <span className={styles.metaItem}>
                            <Eye size={13} /> {article.views.toLocaleString()} views
                        </span>
                        <span className={styles.metaItem}>
                            <Tag size={13} /> {publishDate}
                        </span>
                    </div>
                </header>

                {/* Cover image */}
                {article.coverImage && (
                    <div className={styles.coverImage}>
                        <img
                            src={article.coverImage}
                            alt={article.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                )}

                {/* Article body */}
                <article
                    className={styles.articleBody}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Footer */}
                <div className={styles.footer}>
                    <Link href="/knowledge" className={styles.backLink}>
                        <ArrowLeft size={16} /> Back to Encyclopedia
                    </Link>
                </div>

                <div className="lg:hidden"><Navbar /></div>
            </div>
        </DesktopLayout>
    );
}
