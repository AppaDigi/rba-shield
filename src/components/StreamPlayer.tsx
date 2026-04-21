"use client";

import styles from "./StreamPlayer.module.css";

interface StreamPlayerProps {
    muxPlaybackId?: string | null;
    youtubeId?: string | null;
    title: string;
    status: string;
    viewerCount: number;
}

export default function StreamPlayer({
    muxPlaybackId,
    youtubeId,
    title,
    status,
    viewerCount,
}: StreamPlayerProps) {
    const isLive = status === "LIVE";

    return (
        <div className={styles.wrapper}>
            <div className={styles.playerBox}>
                {muxPlaybackId ? (
                    // Mux player — activate by setting NEXT_PUBLIC_MUX_PLAYBACK_ID
                    // Install: npm install @mux/mux-player-react
                    // Then replace this iframe with: <MuxPlayer playback-id={muxPlaybackId} ... />
                    <iframe
                        src={`https://stream.mux.com/${muxPlaybackId}.m3u8`}
                        className={styles.iframe}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        title={title}
                    />
                ) : youtubeId ? (
                    <iframe
                        className={styles.iframe}
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={title}
                    />
                ) : (
                    <div className={styles.offline}>
                        <div className={styles.offlineIcon}>📡</div>
                        <p className={styles.offlineText}>
                            {isLive ? "Stream starting soon…" : "Stream not yet started"}
                        </p>
                    </div>
                )}

                {/* Overlays */}
                <div className={styles.topLeft}>
                    {isLive ? (
                        <div className={styles.liveBadge}>
                            <span className={styles.liveDot} />
                            LIVE
                        </div>
                    ) : (
                        <div className={styles.scheduledBadge}>UPCOMING</div>
                    )}
                </div>

                <div className={styles.topRight}>
                    <div className={styles.viewerBadge}>
                        👁 {viewerCount.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
