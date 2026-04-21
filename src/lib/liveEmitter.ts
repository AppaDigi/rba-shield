import EventEmitter from "events";

// Global singleton so it survives Next.js hot-reloads in dev
const g = global as typeof globalThis & { __liveEmitter?: EventEmitter };
if (!g.__liveEmitter) {
    g.__liveEmitter = new EventEmitter();
    g.__liveEmitter.setMaxListeners(500);
}
export const liveEmitter = g.__liveEmitter;

// Per-event viewer tracking
const viewerMap = new Map<string, number>();

export function incrementViewers(eventId: string): number {
    const count = (viewerMap.get(eventId) ?? 0) + 1;
    viewerMap.set(eventId, count);
    liveEmitter.emit(`event:${eventId}`, { type: "viewer_count", data: { count } });
    return count;
}

export function decrementViewers(eventId: string): number {
    const count = Math.max(0, (viewerMap.get(eventId) ?? 1) - 1);
    viewerMap.set(eventId, count);
    liveEmitter.emit(`event:${eventId}`, { type: "viewer_count", data: { count } });
    return count;
}

export function getViewerCount(eventId: string): number {
    return viewerMap.get(eventId) ?? 0;
}

export interface SSEMessage {
    type: "init" | "message" | "bid" | "item_change" | "viewer_count";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}
