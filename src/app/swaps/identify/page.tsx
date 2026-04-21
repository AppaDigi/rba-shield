"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Camera, ExternalLink, Loader2, MapPin, Search, Sparkles, Store, Upload, X } from "lucide-react";
import DesktopLayout from "@/components/DesktopLayout";
import SwapCard, { type SwapListingData } from "@/components/SwapCard";
import styles from "./page.module.css";

interface IdentificationResult {
    displayName: string;
    brand?: string | null;
    line?: string | null;
    vitola?: string | null;
    wrapper?: string | null;
    bandText: string[];
    confidence: number;
    notes?: string | null;
    alternateCandidates: { displayName: string; reason: string }[];
}

interface ExternalResults {
    summary: string;
    retailers: {
        name: string;
        url: string;
        price?: string | null;
        availability?: string | null;
        notes?: string | null;
    }[];
    localShops: {
        name: string;
        url?: string | null;
        address?: string | null;
        phone?: string | null;
        notes?: string | null;
    }[];
    sources: { title: string; url: string }[];
}

interface ScoutResponse {
    identification: IdentificationResult;
    swapMatches: SwapListingData[];
    external: ExternalResults;
}

const MAX_FILES = 3;
const MAX_FILE_SIZE = 2 * 1024 * 1024;

function fileToDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result);
            else reject(new Error("Could not read image."));
        };
        reader.onerror = () => reject(new Error("Could not read image."));
        reader.readAsDataURL(file);
    });
}

export default function IdentifyCigarPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [error, setError] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<ScoutResponse | null>(null);

    const confidenceLabel = useMemo(() => {
        const confidence = result?.identification.confidence ?? 0;
        if (confidence >= 0.85) return "High confidence";
        if (confidence >= 0.65) return "Good confidence";
        return "Best guess";
    }, [result]);

    async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
        const pickedFiles = Array.from(e.target.files ?? []);
        if (pickedFiles.length === 0) return;

        const availableSlots = MAX_FILES - images.length;
        const nextFiles = pickedFiles.slice(0, availableSlots);
        if (nextFiles.length === 0) {
            setError("You can upload up to 3 photos.");
            return;
        }

        for (const file of nextFiles) {
            if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                setError("Use PNG, JPG, or WebP images.");
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                setError("Each image must be under 2MB.");
                return;
            }
        }

        const dataUrls = await Promise.all(nextFiles.map(fileToDataUrl));
        setImages((current) => [...current, ...dataUrls].slice(0, MAX_FILES));
        setError("");
        e.target.value = "";
    }

    function removeImage(index: number) {
        setImages((current) => current.filter((_, currentIndex) => currentIndex !== index));
    }

    async function analyzeCigar(e: React.FormEvent) {
        e.preventDefault();
        if ((images.length === 0 && !query.trim()) || analyzing) return;

        setAnalyzing(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch("/api/cigar/identify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    images,
                    query: query.trim() || undefined,
                    searchLocation: searchLocation.trim() || undefined,
                }),
            });

            const data = (await res.json()) as ScoutResponse | { error?: string };
            if (!res.ok) {
                setError((data as { error?: string }).error ?? "Could not analyze this cigar.");
                return;
            }

            setResult(data as ScoutResponse);
        } catch {
            setError("Could not analyze this cigar right now.");
        } finally {
            setAnalyzing(false);
        }
    }

    return (
        <DesktopLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <Link href="/swaps" className={styles.backLink}>
                            <Search size={14} />
                            Back to Swaps
                        </Link>
                        <h1 className={styles.title}>Identify a Cigar</h1>
                        <p className={styles.subtitle}>
                            Upload a cigar photo, identify what it is, then jump straight into in-app swap leads and live buying options.
                        </p>
                    </div>
                    <div className={styles.tipCard}>
                        <Camera size={16} />
                        <div>
                            <strong>Best results</strong>
                            <span>Upload one band close-up and one full cigar shot.</span>
                        </div>
                    </div>
                </div>

                <form className={styles.panel} onSubmit={analyzeCigar}>
                    <div className={styles.panelHeader}>
                        <div>
                            <h2 className={styles.panelTitle}>Scout a cigar from photos</h2>
                            <p className={styles.panelMeta}>Up to 3 images. Or skip photos and search by cigar name. Add a city or ZIP if you want nearby shop suggestions.</p>
                        </div>
                        <button
                            type="button"
                            className={styles.uploadBtn}
                            onClick={() => fileInputRef.current?.click()}
                            disabled={images.length >= MAX_FILES}
                        >
                            <Upload size={15} />
                            Add Photo
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        multiple
                        className={styles.hiddenInput}
                        onChange={handleFiles}
                    />

                    <div className={styles.previewGrid}>
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <div key={image} className={styles.previewCard}>
                                    <img src={image} alt={`Upload ${index + 1}`} className={styles.previewImage} />
                                    <button type="button" className={styles.removeBtn} onClick={() => removeImage(index)}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <button
                                type="button"
                                className={styles.emptyDropzone}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Sparkles size={20} />
                                <span>Upload the cigar, its band, or the box lid.</span>
                            </button>
                        )}
                    </div>

                    <div className={styles.controls}>
                        <label className={styles.field}>
                            <span>Manual cigar search</span>
                            <div className={styles.inputWrap}>
                                <Search size={15} />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Padron 1964 Anniversary Exclusivo"
                                    className={styles.input}
                                />
                            </div>
                        </label>
                        <label className={styles.field}>
                            <span>Search nearby shops</span>
                            <div className={styles.inputWrap}>
                                <MapPin size={15} />
                                <input
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    placeholder="Knoxville, TN or 37902"
                                    className={styles.input}
                                />
                            </div>
                        </label>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.actions}>
                        <button type="submit" className={styles.analyzeBtn} disabled={(images.length === 0 && !query.trim()) || analyzing}>
                            {analyzing ? <Loader2 size={16} className={styles.spinner} /> : <Search size={16} />}
                            {analyzing ? "Analyzing cigar..." : "Analyze cigar"}
                        </button>
                    </div>
                </form>

                {result && (
                    <div className={styles.results}>
                        <section className={styles.resultHero}>
                            <div>
                                <span className={styles.kicker}>Identification</span>
                                <h2 className={styles.resultTitle}>{result.identification.displayName}</h2>
                                <p className={styles.resultSummary}>
                                    {result.identification.notes || "This is the strongest match from the uploaded photos."}
                                </p>
                            </div>
                            <div className={styles.confidenceCard}>
                                <strong>{confidenceLabel}</strong>
                                <span>{Math.round(result.identification.confidence * 100)}% confidence</span>
                            </div>
                        </section>

                        <section className={styles.factGrid}>
                            {[
                                ["Brand", result.identification.brand],
                                ["Line", result.identification.line],
                                ["Vitola", result.identification.vitola],
                                ["Wrapper", result.identification.wrapper],
                            ].map(([label, value]) => (
                                <div key={label} className={styles.factCard}>
                                    <span>{label}</span>
                                    <strong>{value || "Not confidently identified"}</strong>
                                </div>
                            ))}
                        </section>

                        {result.identification.bandText.length > 0 && (
                            <section className={styles.section}>
                                <h3 className={styles.sectionTitle}>Band text spotted</h3>
                                <div className={styles.tagRow}>
                                    {result.identification.bandText.map((item) => (
                                        <span key={item} className={styles.tag}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {result.identification.alternateCandidates.length > 0 && (
                            <section className={styles.section}>
                                <h3 className={styles.sectionTitle}>Other likely candidates</h3>
                                <div className={styles.candidateList}>
                                    {result.identification.alternateCandidates.map((candidate) => (
                                        <div key={candidate.displayName} className={styles.candidateCard}>
                                            <strong>{candidate.displayName}</strong>
                                            <p>{candidate.reason}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className={styles.section}>
                            <div className={styles.sectionHead}>
                                <h3 className={styles.sectionTitle}>Swap options in Cigar Swap</h3>
                                <span className={styles.sectionHint}>
                                    {result.swapMatches.length > 0 ? `${result.swapMatches.length} matching listings` : "No close listings yet"}
                                </span>
                            </div>
                            {result.swapMatches.length > 0 ? (
                                <div className={styles.swapList}>
                                    {result.swapMatches.map((listing) => (
                                        <SwapCard key={listing.id} listing={listing} />
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    No open swap listings matched this cigar yet. You can still use the buy options below or create a new listing once you have it.
                                </div>
                            )}
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHead}>
                                <h3 className={styles.sectionTitle}>Buy online</h3>
                                <span className={styles.sectionHint}>Web-backed retailer suggestions</span>
                            </div>
                            {result.external.retailers.length > 0 ? (
                                <div className={styles.marketGrid}>
                                    {result.external.retailers.map((retailer) => (
                                        <a key={retailer.url} href={retailer.url} target="_blank" rel="noreferrer" className={styles.marketCard}>
                                            <div className={styles.marketCardTop}>
                                                <strong>{retailer.name}</strong>
                                                <ExternalLink size={15} />
                                            </div>
                                            <div className={styles.marketMeta}>
                                                {retailer.price && <span>{retailer.price}</span>}
                                                {retailer.availability && <span>{retailer.availability}</span>}
                                            </div>
                                            <p>{retailer.notes || "Open retailer page"}</p>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>No solid online retailers were found for this cigar right now.</div>
                            )}
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHead}>
                                <h3 className={styles.sectionTitle}>Buy nearby</h3>
                                <span className={styles.sectionHint}>
                                    {searchLocation.trim() ? `Near ${searchLocation.trim()}` : "Add a city or ZIP to unlock local results"}
                                </span>
                            </div>
                            {result.external.localShops.length > 0 ? (
                                <div className={styles.marketGrid}>
                                    {result.external.localShops.map((shop) => (
                                        <div key={`${shop.name}-${shop.address}`} className={styles.marketCard}>
                                            <div className={styles.marketCardTop}>
                                                <strong>{shop.name}</strong>
                                                <Store size={15} />
                                            </div>
                                            {shop.address && <span className={styles.address}>{shop.address}</span>}
                                            {shop.phone && <span className={styles.address}>{shop.phone}</span>}
                                            <p>{shop.notes || "Call ahead to confirm this cigar is in stock."}</p>
                                            {shop.url && (
                                                <a href={shop.url} target="_blank" rel="noreferrer" className={styles.inlineLink}>
                                                    Visit shop
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    {searchLocation.trim()
                                        ? "No nearby cigar shops were confidently matched from this search."
                                        : "Add a location above if you want local cigar shop suggestions."}
                                </div>
                            )}
                        </section>

                        {result.external.sources.length > 0 && (
                            <section className={styles.section}>
                                <h3 className={styles.sectionTitle}>Sources checked</h3>
                                <div className={styles.sourceList}>
                                    {result.external.sources.map((source) => (
                                        <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className={styles.sourceLink}>
                                            {source.title}
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </DesktopLayout>
    );
}
