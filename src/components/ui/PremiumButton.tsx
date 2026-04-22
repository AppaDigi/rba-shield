"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "tertiary";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export const PremiumButton = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: PremiumButtonProps) => {
  const variants = {
    primary: "bg-brand-gold text-brand-navy hover:bg-parchment transition-colors duration-500",
    secondary: "bg-brand-navy text-parchment border border-slate-navy hover:bg-primary-blue hover:border-soft-blue transition-colors duration-500",
    outline: "border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-all duration-500",
    ghost: "text-parchment/60 hover:text-brand-gold transition-colors duration-300",
    tertiary: "text-parchment hover:text-brand-gold transition-colors duration-300 underline underline-offset-4 decoration-brand-gold/30 hover:decoration-brand-gold",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01, boxShadow: variant === "primary" ? "0 0 20px rgba(197, 160, 89, 0.3)" : "none" }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "relative inline-flex items-center justify-center font-display tracking-widest overflow-hidden group transition-all duration-500",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Dynamic Gold Intensification */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
      
      {/* Gloss Effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[35deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
      
      {/* Decorative Border for Primary/Secondary */}
      {(variant === "primary" || variant === "secondary") && (
        <div className="absolute inset-0 border border-white/10 pointer-events-none group-hover:border-white/20 transition-colors" />
      )}
    </motion.button>
  );
};
