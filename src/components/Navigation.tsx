"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";
import Logo from "@/components/ui/Logo";
import { motion, AnimatePresence, Variants } from "framer-motion";

const menuVariants: Variants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    y: "-100%",
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navBrandContainer}>
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Logo className={styles.navLogo} />
            </Link>
            <div className={styles.navBrand}>
              <Link href="/" className={styles.navBrandName} onClick={() => setIsOpen(false)}>RBA Shield</Link>
              <span className={styles.navBrandSub}>Reformed Business Alliance</span>
            </div>
          </div>

          <button 
            className={styles.menuToggle} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`${styles.hamburgerLine} ${isOpen ? styles.hamburgerLineOpen1 : ""}`} />
            <span className={`${styles.hamburgerLine} ${isOpen ? styles.hamburgerLineOpen2 : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.fullscreenMenu}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.menuContent}>
              <div className={styles.menuLinks}>
                <motion.div variants={linkVariants}>
                  <Link href="/" className={styles.menuLink} onClick={() => setIsOpen(false)}>
                    <span className={styles.menuNumber}>00</span>
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <Link href="/problem" className={styles.menuLink} onClick={() => setIsOpen(false)}>
                    <span className={styles.menuNumber}>01</span>
                    The Problem
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <Link href="/program" className={styles.menuLink} onClick={() => setIsOpen(false)}>
                    <span className={styles.menuNumber}>02</span>
                    The Program
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <Link href="/attorneys" className={styles.menuLink} onClick={() => setIsOpen(false)}>
                    <span className={styles.menuNumber}>03</span>
                    For Attorneys
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <Link href="/join" className={styles.menuLinkSpecial} onClick={() => setIsOpen(false)}>
                    Take Up Your Shield
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
