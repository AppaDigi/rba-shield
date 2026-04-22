"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { PremiumButton } from "../ui/PremiumButton";

const navLinks = [
  { name: "The Mission", href: "#mission" },
  { name: "Protection", href: "#protection" },
  { name: "Membership", href: "#membership" },
  { name: "The Fund", href: "#fund" },
  { name: "Submit Need", href: "#submit" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-ink/90 backdrop-blur-md border-b border-brand-gold/20 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-brand-gold group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-brand-gold/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl tracking-tighter text-brand-gold">RBA SHIELD</span>
            <span className="text-[8px] tracking-[0.3em] text-parchment/40 uppercase -mt-1">Reformed Defense</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest text-parchment/70 hover:text-brand-gold transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <PremiumButton variant="primary" size="sm" className="ml-4">
            Stand with the Shield
          </PremiumButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-ink border-b border-brand-gold/20 flex flex-col items-center py-8 gap-6 md:hidden panel-solid"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest text-parchment/70 hover:text-brand-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <PremiumButton variant="primary" size="md" className="w-64">
              Stand with the Shield
            </PremiumButton>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
