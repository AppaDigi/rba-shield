import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const createSocietyCategories = ["Social", "Exclusive", "Regional", "Educational", "Pairing", "Vintage", "Brand Specific"];

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export async function GET() {
    const societies = await prisma.society.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { members: true } },
        },
    });

    return NextResponse.json(societies);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, category, coverImage } = await req.json();
    if (!name?.trim()) {
        return NextResponse.json({ error: "Society name is required" }, { status: 400 });
    }

    const safeCategory = createSocietyCategories.includes(category) ? category : "Social";
    const baseSlug = slugify(name);
    if (!baseSlug) {
        return NextResponse.json({ error: "Society name must include letters or numbers" }, { status: 400 });
    }

    let slug = baseSlug;
    let suffix = 1;
    while (await prisma.society.findUnique({ where: { slug } })) {
        suffix += 1;
        slug = `${baseSlug}-${suffix}`;
    }

    const society = await prisma.society.create({
        data: {
            name: name.trim(),
            slug,
            description: description?.trim() || null,
            coverImage: coverImage?.trim() || null,
            category: safeCategory,
            creatorId: session.user.id,
            members: {
                create: {
                    userId: session.user.id,
                    role: "ADMIN",
                },
            },
        },
        include: {
            _count: { select: { members: true } },
        },
    });

    return NextResponse.json(society, { status: 201 });
}
