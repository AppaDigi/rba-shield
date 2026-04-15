import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/knowledge/articles?q=&category=&limit=
export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q")?.trim() ?? "";
    const category = searchParams.get("category") ?? "";
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);

    const where: Record<string, unknown> = { published: true };

    if (category) where.category = category.toUpperCase();

    if (q) {
        where.OR = [
            { title: { contains: q } },
            { excerpt: { contains: q } },
            { content: { contains: q } },
            { authorName: { contains: q } },
        ];
        delete where.published; // search across all published
        where.published = true;
    }

    const articles = await prisma.article.findMany({
        where,
        orderBy: [{ views: "desc" }, { createdAt: "desc" }],
        take: limit,
        select: {
            id: true,
            slug: true,
            title: true,
            excerpt: true,
            category: true,
            coverImage: true,
            authorName: true,
            readTime: true,
            views: true,
            createdAt: true,
        },
    });

    return NextResponse.json(articles);
}
