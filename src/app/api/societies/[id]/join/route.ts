import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

// GET /api/societies/[id]/join — check membership status
export async function GET(_req: NextRequest, { params }: { params: Params }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ joined: false });

    const { id } = await params;

    const society = await prisma.society.findFirst({
        where: { OR: [{ id }, { slug: id }] },
        select: { id: true },
    });
    if (!society) return NextResponse.json({ joined: false });

    const membership = await prisma.societyMember.findUnique({
        where: { societyId_userId: { societyId: society.id, userId: session.user.id } },
    });

    const count = await prisma.societyMember.count({ where: { societyId: society.id } });
    return NextResponse.json({ joined: !!membership, memberCount: count });
}

// POST /api/societies/[id]/join — toggle join/leave
export async function POST(_req: NextRequest, { params }: { params: Params }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const society = await prisma.society.findFirst({
        where: { OR: [{ id }, { slug: id }] },
    });
    if (!society) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const existing = await prisma.societyMember.findUnique({
        where: { societyId_userId: { societyId: society.id, userId: session.user.id } },
    });

    if (existing) {
        // Cannot leave if you're the only admin
        if (existing.role === "ADMIN") {
            const adminCount = await prisma.societyMember.count({
                where: { societyId: society.id, role: "ADMIN" },
            });
            if (adminCount <= 1) {
                return NextResponse.json({ error: "Cannot leave — you are the only admin" }, { status: 400 });
            }
        }
        await prisma.societyMember.delete({
            where: { societyId_userId: { societyId: society.id, userId: session.user.id } },
        });
        const count = await prisma.societyMember.count({ where: { societyId: society.id } });
        return NextResponse.json({ joined: false, memberCount: count });
    } else {
        await prisma.societyMember.create({
            data: { societyId: society.id, userId: session.user.id, role: "MEMBER" },
        });
        const count = await prisma.societyMember.count({ where: { societyId: society.id } });
        return NextResponse.json({ joined: true, memberCount: count });
    }
}
