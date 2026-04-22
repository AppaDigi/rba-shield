import type { Metadata } from "next";
import { Oswald, Quattrocento } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  variable: "--font-quattrocento",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RBA Shield | Legal Defense & Advocacy for the Reformed",
  description: "A member-supported legal defense and advocacy program for Reformed Christian business owners and leaders. Built for protection, courage, and solidarity.",
  openGraph: {
    title: "RBA Shield | Legal Defense for the Reformed",
    description: "Legal support and advocacy with a theological backbone. Standing with those who stand.",
    type: "website",
    locale: "en_US",
    siteName: "RBA Shield",
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA Shield | Legal Defense & Advocacy",
    description: "Protection and solidarity for the Reformed business community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${quattrocento.variable} selection-gold`}
    >
      <body className="bg-background text-foreground antialiased min-h-screen">
        <div className="grain-overlay" />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
