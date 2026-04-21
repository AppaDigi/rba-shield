"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import styles from "./page.module.css";

function getLoginErrorMessage(error?: string) {
    switch (error) {
        case "CredentialsSignin":
            return "Invalid email or password. Please try again.";
        case "Configuration":
            return "Sign-in is unavailable right now. Check your local auth configuration.";
        default:
            return "Sign-in failed. Please try again.";
    }
}

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    async function handleCredentials(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl,
            });

            if (!result) {
                setError("Sign-in failed. Please try again.");
                return;
            }

            if (result.error || !result.ok) {
                setError(getLoginErrorMessage(result.error));
                return;
            }

            router.push(result.url ?? callbackUrl);
            router.refresh();
        } catch {
            setError("Sign-in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogle() {
        setGoogleLoading(true);
        setError("");
        try {
            await signIn("google", { callbackUrl });
        } catch {
            setGoogleLoading(false);
            setError("Google sign-in is unavailable right now. Check OAuth environment settings.");
        }
    }

    return (
        <div className={styles.page}>
            {/* Ambient glow */}
            <div className={styles.ambientGlow} />

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Logo */}
                <div className={styles.logoArea}>
                    <h1 className={styles.logo}>CIGAR<br />CONNOISSEUR</h1>
                    <p className={styles.tagline}>The Connoisseur&rsquo;s Lounge</p>
                </div>

                <h2 className={styles.heading}>Welcome Back</h2>
                <p className={styles.subheading}>Sign in to continue to The Lounge</p>

                {/* Social Sign-In */}
                <div className={styles.socialButtons}>
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
                        Continue with Google
                    </button>

                    <button className={styles.appleBtn} disabled type="button" title="Coming soon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        Continue with Apple
                        <span className={styles.comingSoon}>Soon</span>
                    </button>
                </div>

                <div className={styles.divider}>
                    <span>or sign in with email</span>
                </div>

                {/* Error message */}
                {error && (
                    <motion.div
                        className={styles.errorBanner}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                    >
                        {error}
                    </motion.div>
                )}

                {/* Credentials Form */}
                <form onSubmit={handleCredentials} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <Mail size={16} className={styles.inputIcon} />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <Lock size={16} className={styles.inputIcon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowPassword((v) => !v)}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? <Loader2 size={18} className={styles.spinner} /> : "Sign In"}
                    </button>
                </form>

                <p className={styles.switchLink}>
                    New to The Lounge?{" "}
                    <Link href="/auth/register" className={styles.link}>
                        Create an account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg-app)" }} />}>
            <LoginContent />
        </Suspense>
    );
}
