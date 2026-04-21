import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getViewerCount } from "@/lib/liveEmitter";

// GET /api/live/events/[id]  — event detail + items + last 50 messages
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const event = await prisma.liveEvent.findUnique({
        where: { id },
        include: {
            items: {
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
            },
            messages: {
                orderBy: { createdAt: "asc" },
                take: 50,
                include: {
                    user: { select: { id: true, name: true, username: true, avatar: true } },
                },
            },
        },
    });

    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({
        ...event,
        viewerCount: Math.max(event.viewerCount, getViewerCount(id)),
    });
}
