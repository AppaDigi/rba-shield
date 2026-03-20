import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-cormorant',
  display: 'swap',
});

const crimson = Crimson_Pro({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-crimson',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Brian Sauvé | For the New Christendom",
  description: "Brian Sauvé — Reformed pastor, psalm musician, author, podcaster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${crimson.variable}`}>
      <body className="min-h-screen flex flex-col bg-parchment text-ink antialiased">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
