import React from "react";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 space-y-2">
            <nav className="flex flex-col gap-2">
              <div className="text-[10px] uppercase tracking-widest text-parchment/30 mb-2 px-4">Member Portal</div>
              <a href="/dashboard" className="px-4 py-3 bg-brand-gold/10 text-brand-gold border-l-2 border-brand-gold text-xs uppercase tracking-widest">Overview</a>
              <a href="/dashboard/membership" className="px-4 py-3 hover:bg-white/5 text-parchment/60 text-xs uppercase tracking-widest transition-colors">Membership</a>
              <a href="/dashboard/requests" className="px-4 py-3 hover:bg-white/5 text-parchment/60 text-xs uppercase tracking-widest transition-colors">Legal Requests</a>
              <a href="/dashboard/resources" className="px-4 py-3 hover:bg-white/5 text-parchment/60 text-xs uppercase tracking-widest transition-colors">Resources</a>
            </nav>
          </aside>
          <main className="flex-grow panel-solid p-8 border-brand-gold/10 min-h-[600px]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
