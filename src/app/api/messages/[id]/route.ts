import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

// GET /api/messages/[id] — get messages for a conversation
export async function GET(_req: NextRequest, { params }: { params: Params }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    // Verify user is a participant
    const participant = await prisma.conversationParticipant.findUnique({
        where: { conversationId_userId: { conversationId: id, userId: session.user.id } },
    });
    if (!participant) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Mark all unread messages as read
    await prisma.directMessage.updateMany({
        where: { conversationId: id, senderId: { not: session.user.id }, readAt: null },
        data: { readAt: new Date() },
    });

    const messages = await prisma.directMessage.findMany({
        where: { conversationId: id },
        orderBy: { createdAt: "asc" },
        take: 100,
        include: { sender: { select: { id: true, name: true, username: true, avatar: true } } },
    });

    return NextResponse.json(messages);
}

// POST /api/messages/[id] — send a message
export async function POST(req: NextRequest, { params }: { params: Params }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { body } = await req.json();
    if (!body?.trim()) return NextResponse.json({ error: "Empty message" }, { status: 400 });

    const participant = await prisma.conversationParticipant.findUnique({
        where: { conversationId_userId: { conversationId: id, userId: session.user.id } },
    });
    if (!participant) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const [message] = await prisma.$transaction([
        prisma.directMessage.create({
            data: { conversationId: id, senderId: session.user.id, body: body.trim() },
            include: { sender: { select: { id: true, name: true, username: true, avatar: true } } },
        }),
        prisma.conversation.update({ where: { id }, data: { updatedAt: new Date() } }),
    ]);

    return NextResponse.json(message);
}
