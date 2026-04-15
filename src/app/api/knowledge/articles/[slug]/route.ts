import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/knowledge/articles/[slug]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const article = await prisma.article.findUnique({ where: { slug, published: true } });
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Increment view count
    await prisma.article.update({ where: { slug }, data: { views: { increment: 1 } } });

    return NextResponse.json(article);
}
