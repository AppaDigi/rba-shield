"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, Save, Loader2, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

export default function EditProfilePage() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: session?.user?.name ?? "",
        bio: "",
        location: "",
        avatar: session?.user?.image ?? "",
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Password change
    const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
    const [showPw, setShowPw] = useState(false);
    const [pwSaving, setPwSaving] = useState(false);
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState(false);

    function update_(field: string, value: string) {
        setForm((f) => ({ ...f, [field]: value }));
    }

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            setError("Avatar must be under 2MB");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            const base64 = ev.target?.result as string;
            setAvatarPreview(base64);
            setForm((f) => ({ ...f, avatar: base64 }));
        };
        reader.readAsDataURL(file);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!session?.user?.username) return;
        setSaving(true);
        setError("");

        const res = await fetch(`/api/profile/${session.user.username}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: form.name,
                bio: form.bio,
                location: form.location,
                avatar: form.avatar,
            }),
        });

        const data = await res.json();
        setSaving(false);

        if (!res.ok) {
            setError(data.error ?? "Failed to save profile");
            return;
        }

        await update({ avatar: form.avatar });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    }

    const displayAvatar = avatarPreview ?? session?.user?.image;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Link href={session?.user?.username ? `/profile/${session.user.username}` : "/"} className={styles.backLink}>
                        <ArrowLeft size={18} />
                        Back to Profile
                    </Link>
                    <h1 className={styles.heading}>Edit Profile</h1>
                </div>

                <motion.form
                    onSubmit={handleSave}
                    className={styles.form}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Avatar Upload */}
                    <div className={styles.avatarSection}>
                        <div className={styles.avatarWrapper} onClick={() => fileInputRef.current?.click()}>
                            {displayAvatar ? (
                                <img src={displayAvatar} alt="Avatar" className={styles.avatar} />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    {(session?.user?.name ?? "U").charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className={styles.avatarOverlay}>
                                <Camera size={20} />
                                <span>Change Photo</span>
                            </div>
                        </div>
                        <p className={styles.avatarHint}>Max 2MB · PNG, JPG, WebP</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleAvatarChange}
                            style={{ display: "none" }}
                        />
                    </div>

                    {/* Fields */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Display Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => update_("name", e.target.value)}
                            className={styles.input}
                            maxLength={60}
                            placeholder="Your display name"
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Bio</label>
                        <textarea
                            value={form.bio}
                            onChange={(e) => update_("bio", e.target.value)}
                            className={styles.textarea}
                            maxLength={300}
                            rows={3}
                            placeholder="Tell The Lounge who you are..."
                        />
                        <span className={styles.charCount}>{form.bio.length}/300</span>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Location</label>
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) => update_("location", e.target.value)}
                            className={styles.input}
                            maxLength={60}
                            placeholder="City, Country"
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.successBanner}>Profile updated successfully!</div>}

                    <button type="submit" className={styles.saveBtn} disabled={saving}>
                        {saving ? <Loader2 size={16} className={styles.spinner} /> : <Save size={16} />}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </motion.form>

                {/* ─── Change Password ─── */}
                <div className={styles.divider} />
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Lock size={16} />
                        <h2 className={styles.sectionTitle}>Change Password</h2>
                    </div>
                    <div className={styles.pwFields}>
                        {["current", "newPw", "confirm"].map((field) => (
                            <div key={field} className={styles.fieldGroup}>
                                <label className={styles.label}>
                                    {field === "current" ? "Current Password" : field === "newPw" ? "New Password" : "Confirm New Password"}
                                </label>
                                <div className={styles.pwInputWrapper}>
                                    <input
                                        type={showPw ? "text" : "password"}
                                        value={pwForm[field as keyof typeof pwForm]}
                                        onChange={(e) => setPwForm((f) => ({ ...f, [field]: e.target.value }))}
                                        className={styles.input}
                                        placeholder="••••••••"
                                    />
                                    <button type="button" className={styles.eyeBtn} onClick={() => setShowPw((v) => !v)} tabIndex={-1}>
                                        {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                        {pwError && <div className={styles.error}>{pwError}</div>}
                        {pwSuccess && <div className={styles.successBanner}>Password updated!</div>}
                        <p className={styles.pwNote}>Password change via credentials is coming soon. Use Google Sign-In to manage your password.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
