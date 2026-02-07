"use client";

import styles from "./DesktopLayout.module.css";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
    showRightSidebar?: boolean;
}

export default function DesktopLayout({ children, showRightSidebar = false }: LayoutProps) {
    return (
        <div className={styles.desktopGrid}>
            {/* Left Sidebar */}
            <div className={styles.leftSidebarWrapper}>
                <div style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
                    <div className={styles.logo}>
                        CIGAR<br /><span className="text-gold text-sm font-normal tracking-wide">CONNOISSEUR</span>
                    </div>
                    <SidebarLeft />
                </div>
            </div>

            {/* Main Content */}
            <div className={showRightSidebar ? styles.mainContent : styles.fullWidthContent} style={{ maxWidth: showRightSidebar ? '800px' : '100%' }}>
                {children}
            </div>

            {/* Right Sidebar (Optional) */}
            {showRightSidebar && (
                <div className={styles.rightSidebarWrapper}>
                    <div style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', paddingTop: '1rem' }}>
                        <SidebarRight />
                    </div>
                </div>
            )}

            {/* Mobile Nav (Only visible on mobile via media query in Navbar/CSS) */}
            <div className="lg:hidden">
                <Navbar />
            </div>
        </div>
    );
}
