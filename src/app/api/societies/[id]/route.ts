import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
    const { id } = await params;

    const society = await prisma.society.findFirst({
        where: {
            OR: [{ id }, { slug: id }],
        },
        include: {
            _count: { select: { members: true, posts: true } },
            creator: { select: { id: true, name: true, username: true, avatar: true } },
        },
    });

    if (!society) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(society);
}
