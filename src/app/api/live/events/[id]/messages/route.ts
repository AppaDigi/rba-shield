import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { liveEmitter } from "@/lib/liveEmitter";

// POST /api/live/events/[id]/messages  — send a chat message
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: eventId } = await params;
    const session = await auth();

    const event = await prisma.liveEvent.findUnique({ where: { id: eventId } });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const { content, guestName } = await req.json();
    if (!content || typeof content !== "string" || content.trim().length === 0) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    if (content.trim().length > 300) {
        return NextResponse.json({ error: "Message too long (max 300 chars)" }, { status: 400 });
    }

    const message = await prisma.liveMessage.create({
        data: {
            eventId,
            userId: session?.user?.id ?? null,
            guestName: session ? null : (guestName?.trim() ?? "Guest"),
            content: content.trim(),
            type: "CHAT",
        },
        include: {
            user: { select: { id: true, name: true, username: true, avatar: true } },
        },
    });

    liveEmitter.emit(`event:${eventId}`, { type: "message", data: message });

    return NextResponse.json(message, { status: 201 });
}
