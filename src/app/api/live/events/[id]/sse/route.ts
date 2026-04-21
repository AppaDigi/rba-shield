import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { liveEmitter, incrementViewers, decrementViewers, type SSEMessage } from "@/lib/liveEmitter";

export const dynamic = "force-dynamic";

// GET /api/live/events/[id]/sse  — Server-Sent Events stream
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: eventId } = await params;

    const event = await prisma.liveEvent.findUnique({ where: { id: eventId } });
    if (!event) {
        return new Response("Event not found", { status: 404 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            function send(payload: SSEMessage) {
                try {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
                } catch {
                    // Client disconnected
                }
            }

            // Send initial state
            const [messages, items] = await Promise.all([
                prisma.liveMessage.findMany({
                    where: { eventId },
                    orderBy: { createdAt: "asc" },
                    take: 50,
                    include: {
                        user: { select: { id: true, name: true, username: true, avatar: true } },
                    },
                }),
                prisma.auctionItem.findMany({
                    where: { eventId },
                    orderBy: { sortOrder: "asc" },
                    include: {
                        bids: {
                            orderBy: { createdAt: "desc" },
                            take: 10,
                            include: {
                                user: { select: { id: true, name: true, username: true, avatar: true } },
                            },
                        },
                    },
                }),
            ]);

            const viewerCount = incrementViewers(eventId);
            send({ type: "init", data: { messages, items, viewerCount } });

            // Subscribe to live events for this event
            const handler = (payload: SSEMessage) => send(payload);
            liveEmitter.on(`event:${eventId}`, handler);

            // Heartbeat every 25s to keep the connection alive
            const heartbeat = setInterval(() => {
                try {
                    controller.enqueue(encoder.encode(": heartbeat\n\n"));
                } catch {
                    clearInterval(heartbeat);
                }
            }, 25_000);

            // Clean up on disconnect
            req.signal.addEventListener("abort", () => {
                liveEmitter.off(`event:${eventId}`, handler);
                clearInterval(heartbeat);
                decrementViewers(eventId);
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
        },
    });
}
