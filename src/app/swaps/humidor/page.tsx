"use client";

import { useState, useEffect, useRef } from "react";
import DesktopLayout from "@/components/DesktopLayout";
import Navbar from "@/components/Navbar";
import { Plus, Trash2, BookOpen, Loader2, Package, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

interface HumidorItem {
    id: string;
    name: string;
    brand: string | null;
    size: string | null;
    wrapper: string | null;
    origin: string | null;
    quantity: number;
    notes: string | null;
    imageUrl: string | null;
    createdAt: string;
}

const WRAPPER_OPTIONS = ["Connecticut", "Maduro", "Habano", "Corojo", "Oscuro", "Natural", "Claro"];
const SIZE_OPTIONS = ["Robusto", "Churchill", "Toro", "Lancero", "Panatela", "Corona", "Double Corona", "Perfecto", "Torpedo", "Gordo"];
const ORIGIN_OPTIONS = ["Cuba", "Nicaragua", "Dominican Republic", "Honduras", "Ecuador", "Mexico", "Peru", "USA"];

export default function HumidorPage() {
    const { status } = useSession();
    const router = useRouter();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [items, setItems] = useState<HumidorItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [adding, setAdding] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [wrapper, setWrapper] = useState("");
    const [origin, setOrigin] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [notes, setNotes] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") { router.push("/auth/login"); return; }
        if (status !== "authenticated") return;
        fetch("/api/humidor")
            .then(r => r.json())
            .then(setItems)
            .finally(() => setLoading(false));
    }, [status, router]);

    function resetForm() {
        setName(""); setBrand(""); setSize(""); setWrapper(""); setOrigin(""); setQuantity("1"); setNotes(""); setImageUrl(""); setImageError("");
        if (imageInputRef.current) imageInputRef.current.value = "";
    }

    async function addItem(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || adding) return;
        setAdding(true);
        try {
            const res = await fetch("/api/humidor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), brand, size, wrapper, origin, quantity: parseInt(quantity) || 1, notes, imageUrl }),
            });
            if (res.ok) {
                const item: HumidorItem = await res.json();
                setItems(prev => [item, ...prev]);
                resetForm();
                setShowAdd(false);
            }
        } finally {
            setAdding(false);
        }
    }

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setImageError("Use a PNG, JPG, or WebP image.");
            e.target.value = "";
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setImageError("Photo must be under 2MB.");
            e.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result;
            if (typeof result === "string") {
                setImageUrl(result);
                setImageError("");
            }
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    }

    async function deleteItem(id: string) {
        await fetch(`/api/humidor/${id}`, { method: "DELETE" });
        setItems(prev => prev.filter(i => i.id !== id));
    }

    const totalCigars = items.reduce((sum, i) => sum + i.quantity, 0);

    if (status === "loading" || loading) {
        return (
            <DesktopLayout>
                <div className={styles.loadingState}><Loader2 size={28} className={styles.spin} /></div>
            </DesktopLayout>
        );
    }

    return (
        <DesktopLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.titleRow}>
                            <BookOpen size={22} className={styles.titleIcon} />
                            <h1 className={styles.title}>My Humidor</h1>
                        </div>
                        <p className={styles.subtitle}>
                            {totalCigars} cigar{totalCigars !== 1 ? "s" : ""} across {items.length} listing{items.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <button className={styles.addBtn} onClick={() => setShowAdd(v => !v)}>
                        <Plus size={15} /> Add Cigar
                    </button>
                </header>

                {/* Add cigar form */}
                <AnimatePresence>
                    {showAdd && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={styles.addForm}
                            onSubmit={addItem}
                        >
                            <div className={styles.formGrid}>
                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Cigar Name *</label>
                                    <input className={styles.input} placeholder="e.g., Padrón 1964 Anniversary Maduro"
                                        value={name} onChange={e => setName(e.target.value)} required />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Brand</label>
                                    <input className={styles.input} placeholder="e.g., Padrón"
                                        value={brand} onChange={e => setBrand(e.target.value)} />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Quantity</label>
                                    <input className={styles.input} type="number" min="1" max="500"
                                        value={quantity} onChange={e => setQuantity(e.target.value)} />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Size / Vitola</label>
                                    <select className={styles.input} value={size} onChange={e => setSize(e.target.value)}>
                                        <option value="">Select size...</option>
                                        {SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Wrapper</label>
                                    <select className={styles.input} value={wrapper} onChange={e => setWrapper(e.target.value)}>
                                        <option value="">Select wrapper...</option>
                                        {WRAPPER_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Origin</label>
                                    <select className={styles.input} value={origin} onChange={e => setOrigin(e.target.value)}>
                                        <option value="">Select origin...</option>
                                        {ORIGIN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                </div>
                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Photo</label>
                                    <input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className={styles.hiddenInput}
                                        onChange={handleImageUpload}
                                    />
                                    {imageUrl ? (
                                        <div className={styles.imageUploadCard}>
                                            <img src={imageUrl} alt="Humidor preview" className={styles.imagePreview} />
                                            <div className={styles.imageMeta}>
                                                <span className={styles.imageTitle}>Photo attached</span>
                                                <span className={styles.imageHint}>This image will appear on your humidor card.</span>
                                            </div>
                                            <button type="button" className={styles.secondaryBtn} onClick={() => setImageUrl("")}>
                                                <Trash2 size={14} />
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <button type="button" className={styles.secondaryBtn} onClick={() => imageInputRef.current?.click()}>
                                            <ImagePlus size={14} />
                                            Upload Photo
                                        </button>
                                    )}
                                    <input
                                        className={styles.input}
                                        placeholder="Or paste an image URL"
                                        value={imageUrl.startsWith("data:image/") ? "" : imageUrl}
                                        onChange={(e) => { setImageUrl(e.target.value); setImageError(""); }}
                                    />
                                    <span className={styles.fieldHint}>PNG, JPG, or WebP up to 2MB.</span>
                                    {imageError && <span className={styles.fieldError}>{imageError}</span>}
                                </div>
                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Personal Notes</label>
                                    <textarea className={styles.textarea} placeholder="Year purchased, storage conditions, tasting notes..."
                                        value={notes} onChange={e => setNotes(e.target.value)} rows={2} maxLength={500} />
                                </div>
                            </div>
                            <div className={styles.formFooter}>
                                <button type="button" className={styles.cancelBtn} onClick={() => { setShowAdd(false); resetForm(); }}>Cancel</button>
                                <button type="submit" className={styles.addBtn} disabled={!name.trim() || adding}>
                                    {adding ? <Loader2 size={14} className={styles.spin} /> : <Plus size={14} />}
                                    Add to Humidor
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Items list */}
                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <Package size={40} className={styles.emptyIcon} />
                        <p>Your humidor is empty.</p>
                        <p className={styles.emptyHint}>Add cigars to list them on The Exchange.</p>
                        <button className={styles.addBtn} onClick={() => setShowAdd(true)}>
                            <Plus size={14} /> Add Your First Cigar
                        </button>
                    </div>
                ) : (
                    <div className={styles.list}>
                        <AnimatePresence>
                            {items.map(item => (
                                <motion.div
                                    key={item.id}
                                    className={styles.itemCard}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    layout
                                >
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                                    ) : (
                                        <div className={styles.itemImagePlaceholder}>
                                            <Package size={20} />
                                        </div>
                                    )}
                                    <div className={styles.itemMain}>
                                        <div className={styles.itemName}>{item.name}</div>
                                        <div className={styles.itemTags}>
                                            {item.brand && <span className={styles.tag}>{item.brand}</span>}
                                            {item.size && <span className={styles.tag}>{item.size}</span>}
                                            {item.wrapper && <span className={styles.tag}>{item.wrapper}</span>}
                                            {item.origin && <span className={styles.tag}>{item.origin}</span>}
                                        </div>
                                        {item.notes && <p className={styles.itemNotes}>{item.notes}</p>}
                                    </div>
                                    <div className={styles.itemRight}>
                                        <div className={styles.qtyBadge}>×{item.quantity}</div>
                                        <button className={styles.deleteBtn} onClick={() => deleteItem(item.id)}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <div className="lg:hidden"><Navbar /></div>
            </div>
        </DesktopLayout>
    );
}
