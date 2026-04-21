"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, AtSign, Eye, EyeOff, Loader2, CheckCircle2, XCircle } from "lucide-react";
import styles from "./page.module.css";

function PasswordRequirement({ met, label }: { met: boolean; label: string }) {
    return (
        <div className={`${styles.requirement} ${met ? styles.requirementMet : ""}`}>
            {met ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
            {label}
        </div>
    );
}

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", username: "", email: "", password: "", confirm: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const pw = form.password;
    const pwChecks = {
        length: pw.length >= 8,
        upper: /[A-Z]/.test(pw),
        number: /[0-9]/.test(pw),
        match: pw.length > 0 && pw === form.confirm,
    };

    function update(field: string, value: string) {
        setForm((f) => ({ ...f, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!Object.values(pwChecks).every(Boolean)) {
            setError("Please fix the password requirements.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const profileUrl = `/profile/${form.username.toLowerCase()}`;
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    username: form.username.toLowerCase(),
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data.error ?? "Registration failed.");
                return;
            }

            const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
                callbackUrl: profileUrl,
            });

            if (!result || result.error || !result.ok) {
                setError("Account created, but automatic sign-in failed. Please sign in manually.");
                router.push("/auth/login");
                router.refresh();
                return;
            }

            router.push(result.url ?? profileUrl);
            router.refresh();
        } catch {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogle() {
        setGoogleLoading(true);
        setError("");
        try {
            await signIn("google", { callbackUrl: "/" });
        } catch {
            setGoogleLoading(false);
            setError("Google sign-up is unavailable right now. Check OAuth environment settings.");
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.ambientGlow} />

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={styles.logoArea}>
                    <h1 className={styles.logo}>CIGAR<br />SWAP</h1>
                    <p className={styles.tagline}>cigarswap.app</p>
                </div>

                <h2 className={styles.heading}>Join Cigar Swap</h2>
                <p className={styles.subheading}>Create your account to begin your journey</p>

                {/* Social sign up */}
                <button
                    className={styles.googleBtn}
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    type="button"
                >
                    {googleLoading ? (
                        <Loader2 size={18} className={styles.spinner} />
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    )}
                    Sign up with Google
                </button>

                <div className={styles.divider}><span>or create with email</span></div>

                {error && (
                    <motion.div className={styles.errorBanner} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Full Name */}
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <User size={16} className={styles.inputIcon} />
                            <input
                                type="text"
                                placeholder="Full name"
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                className={styles.input}
                                required
                                autoComplete="name"
                            />
                        </div>

                        {/* Username */}
                        <div className={styles.inputGroup}>
                            <AtSign size={16} className={styles.inputIcon} />
                            <input
                                type="text"
                                placeholder="username"
                                value={form.username}
                                onChange={(e) => update("username", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                                className={styles.input}
                                required
                                maxLength={20}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className={styles.inputGroup}>
                        <Mail size={16} className={styles.inputIcon} />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={styles.input}
                            required
                            autoComplete="email"
                        />
                    </div>

                    {/* Password */}
                    <div className={styles.inputGroup}>
                        <Lock size={16} className={styles.inputIcon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => update("password", e.target.value)}
                            className={styles.input}
                            required
                            autoComplete="new-password"
                        />
                        <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword((v) => !v)} tabIndex={-1}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className={styles.inputGroup}>
                        <Lock size={16} className={styles.inputIcon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={form.confirm}
                            onChange={(e) => update("confirm", e.target.value)}
                            className={styles.input}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Password Requirements */}
                    {form.password.length > 0 && (
                        <div className={styles.requirements}>
                            <PasswordRequirement met={pwChecks.length} label="At least 8 characters" />
                            <PasswordRequirement met={pwChecks.upper} label="One uppercase letter" />
                            <PasswordRequirement met={pwChecks.number} label="One number" />
                            <PasswordRequirement met={pwChecks.match} label="Passwords match" />
                        </div>
                    )}

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? <Loader2 size={18} className={styles.spinner} /> : "Create Account"}
                    </button>
                </form>

                <p className={styles.switchLink}>
                    Already a member?{" "}
                    <Link href="/auth/login" className={styles.link}>Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
}
