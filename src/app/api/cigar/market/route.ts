import { NextRequest, NextResponse } from "next/server";
import {
    buildManualBuyOptions,
    findExternalBuyOptions,
    hasCigarAiKey,
} from "@/lib/cigar-scout";
import { z } from "zod";

const identificationSchema = z.object({
    displayName: z.string().min(1),
    brand: z.string().nullable().optional(),
    line: z.string().nullable().optional(),
    vitola: z.string().nullable().optional(),
    wrapper: z.string().nullable().optional(),
    bandText: z.array(z.string()).default([]),
    confidence: z.number().min(0).max(1),
    notes: z.string().nullable().optional(),
    alternateCandidates: z.array(
        z.object({
            displayName: z.string(),
            reason: z.string(),
        })
    ).default([]),
});

const requestSchema = z.object({
    identification: identificationSchema,
    searchLocation: z.string().max(120).optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = requestSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "A cigar identification is required before searching the market." }, { status: 400 });
        }

        const { identification, searchLocation } = parsed.data;
        const external = hasCigarAiKey()
            ? await findExternalBuyOptions(identification, searchLocation)
            : buildManualBuyOptions(identification, searchLocation);

        return NextResponse.json({
            external,
            mode: hasCigarAiKey() ? "vision" : "manual",
        });
    } catch (error) {
        console.error("[CIGAR_MARKET]", error);
        const message = error instanceof Error ? error.message : "Unable to search retailers right now.";

        return NextResponse.json(
            {
                error: message,
            },
            { status: 500 }
        );
    }
}
