import { NextRequest, NextResponse } from "next/server";
import {
    findSwapMatches,
    hasCigarAiKey,
    identifyCigarFromImages,
    identifyCigarFromQuery,
} from "@/lib/cigar-scout";
import { z } from "zod";

const requestSchema = z.object({
    images: z.array(z.string().startsWith("data:image/")).max(3).default([]),
    query: z.string().max(200).optional(),
}).superRefine((value, ctx) => {
    if (value.images.length === 0 && !value.query?.trim()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Upload images or enter a cigar name to search.",
            path: ["images"],
        });
    }
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = requestSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Upload images or enter a cigar name to search." }, { status: 400 });
        }

        const { images, query } = parsed.data;
        const canUseVision = images.length > 0 && hasCigarAiKey();
        const identification = canUseVision
            ? await identifyCigarFromImages(images)
            : identifyCigarFromQuery(query?.trim() || "Unknown cigar");
        const { directMatches, suggestedMatches } = await findSwapMatches(identification);

        return NextResponse.json({
            identification,
            swapMatches: directMatches,
            similarSwapMatches: suggestedMatches,
            mode: canUseVision ? "vision" : "manual",
        });
    } catch (error) {
        console.error("[CIGAR_IDENTIFY]", error);
        const message = error instanceof Error ? error.message : "Unable to analyze this cigar right now.";
        const status = message.includes("OPENROUTER_API_KEY") ? 500 : 500;

        return NextResponse.json(
            {
                error: message,
            },
            { status }
        );
    }
}
