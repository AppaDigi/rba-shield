"use client";

import React from "react";
import Link from "next/link";
import { Shield, Send, Users, Briefcase, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-ink pt-24 pb-12 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-brand-gold" />
              <div className="flex flex-col">
                <span className="font-display text-xl tracking-tighter text-brand-gold">RBA SHIELD</span>
                <span className="text-[8px] tracking-[0.3em] text-parchment/40 uppercase -mt-1">Reformed Defense</span>
              </div>
            </Link>
            <p className="text-parchment/40 text-sm leading-relaxed font-serif italic">
              &quot;Building the defense infrastructure for the Reformed business community in the public square.&quot;
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-parchment/30 hover:text-brand-gold transition-colors">
                <Send className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-parchment/30 hover:text-brand-gold transition-colors">
                <Users className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-parchment/30 hover:text-brand-gold transition-colors">
                <Briefcase className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Program Links */}
          <div className="space-y-6">
            <h4 className="font-display text-xs tracking-widest text-brand-gold">The Program</h4>
            <ul className="space-y-4">
              {["The Mission", "Our Defense Wall", "How It Works", "Member Benefits", "Submit a Need"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-parchment/50 text-xs uppercase tracking-widest hover:text-brand-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="space-y-6">
            <h4 className="font-display text-xs tracking-widest text-brand-gold">RBA Ecosystem</h4>
            <ul className="space-y-4">
              {[
                "Reformed Business Alliance",
                "Alliance Marketplace",
                "Strategic Network",
                "Local Watchman",
                "Institute for Statecraft",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-parchment/50 text-xs uppercase tracking-widest hover:text-brand-gold transition-colors flex items-center gap-2">
                    {item} <ExternalLink className="w-3 h-3 opacity-30" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Info */}
          <div className="space-y-6">
            <h4 className="font-display text-xs tracking-widest text-brand-gold">Legal & Support</h4>
            <ul className="space-y-4">
              {["Terms of Service", "Privacy Policy", "Conflict of Interest", "Donation Terms", "Member Agreement"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-parchment/50 text-xs uppercase tracking-widest hover:text-brand-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-gold/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-parchment/20 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Reformed Business Alliance. RBA Shield is a member-supported initiative.
          </p>
          <p className="text-[10px] text-parchment/20 uppercase tracking-[0.2em]">
            Built with conviction.
          </p>
        </div>
      </div>
    </footer>
  );
};
