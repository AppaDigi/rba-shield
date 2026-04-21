import { NextRequest, NextResponse } from "next/server";
import {
    buildManualBuyOptions,
    findExternalBuyOptions,
    findSwapMatches,
    hasOpenAIKey,
    identifyCigarFromImages,
    identifyCigarFromQuery,
} from "@/lib/cigar-scout";
import { z } from "zod";

const requestSchema = z.object({
    images: z.array(z.string().startsWith("data:image/")).max(3).default([]),
    query: z.string().max(200).optional(),
    searchLocation: z.string().max(120).optional(),
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

        const { images, query, searchLocation } = parsed.data;
        const canUseVision = images.length > 0 && hasOpenAIKey();
        const identification = canUseVision
            ? await identifyCigarFromImages(images)
            : identifyCigarFromQuery(query?.trim() || "Unknown cigar");

        const [swapMatches, external] = await Promise.all([
            findSwapMatches(identification),
            canUseVision
                ? findExternalBuyOptions(identification, searchLocation)
                : Promise.resolve(buildManualBuyOptions(identification, searchLocation)),
        ]);

        return NextResponse.json({
            identification,
            swapMatches,
            external,
            mode: canUseVision ? "vision" : "manual",
        });
    } catch (error) {
        console.error("[CIGAR_IDENTIFY]", error);
        const message = error instanceof Error ? error.message : "Unable to analyze this cigar right now.";
        const status = message.includes("OPENAI_API_KEY") ? 500 : 500;

        return NextResponse.json(
            {
                error: message,
            },
            { status }
        );
    }
}
