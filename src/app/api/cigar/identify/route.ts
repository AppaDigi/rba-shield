import { NextRequest, NextResponse } from "next/server";
import { findExternalBuyOptions, findSwapMatches, identifyCigarFromImages } from "@/lib/cigar-scout";
import { z } from "zod";

const requestSchema = z.object({
    images: z.array(z.string().startsWith("data:image/")).min(1).max(3),
    searchLocation: z.string().max(120).optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = requestSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Upload 1 to 3 images to analyze." }, { status: 400 });
        }

        const { images, searchLocation } = parsed.data;
        const identification = await identifyCigarFromImages(images);
        const [swapMatches, external] = await Promise.all([
            findSwapMatches(identification),
            findExternalBuyOptions(identification, searchLocation),
        ]);

        return NextResponse.json({
            identification,
            swapMatches,
            external,
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
