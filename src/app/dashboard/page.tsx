import React from "react";
import { Shield, Clock, FileText, Scale } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display mb-2">Member Overview</h1>
        <p className="text-parchment/40 text-sm italic font-serif">Welcome back to the Shield Wall.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-brand-gold/10 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-5 h-5 text-brand-gold" />
            <span className="text-[10px] uppercase tracking-widest text-brand-gold">Active</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-parchment/40 mb-1">Status</div>
          <div className="text-xl font-display">Shield Member</div>
        </div>
        
        <div className="p-6 border border-brand-gold/10 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <Scale className="w-5 h-5 text-brand-gold" />
            <span className="text-[10px] uppercase tracking-widest text-parchment/40">Protected</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-parchment/40 mb-1">Protection Level</div>
          <div className="text-xl font-display">Priority Access</div>
        </div>

        <div className="p-6 border border-brand-gold/10 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-5 h-5 text-brand-gold" />
            <span className="text-[10px] uppercase tracking-widest text-parchment/40">Verified</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-parchment/40 mb-1">Since</div>
          <div className="text-xl font-display">April 2026</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-sm tracking-widest">Recent Activity</h3>
        <div className="border border-brand-gold/5 bg-white/[0.01] rounded-sm divide-y divide-brand-gold/5">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-brand-gold" />
              </div>
              <div>
                <div className="text-xs font-display">Membership Activated</div>
                <div className="text-[10px] text-parchment/30 uppercase tracking-widest">System • Just Now</div>
              </div>
            </div>
            <span className="text-[10px] text-parchment/40">04/22/26</span>
          </div>
        </div>
      </div>

      <div className="p-8 border border-brand-gold/20 bg-brand-gold/5 rounded-sm flex flex-col items-center text-center gap-6">
        <h4 className="font-display text-lg">Facing a Legal Need?</h4>
        <p className="text-parchment/60 text-sm max-w-md">Our intake team is ready to review your situation. Priority access is included in your membership.</p>
        <button className="px-8 py-3 bg-brand-gold text-background font-display text-xs tracking-widest uppercase hover:bg-parchment transition-colors">
          Start New Request
        </button>
      </div>
    </div>
  );
}
