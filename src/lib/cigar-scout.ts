import { prisma } from "@/lib/prisma";
import { z } from "zod";

const identifySchema = z.object({
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

const externalResultsSchema = z.object({
    summary: z.string().default(""),
    retailers: z.array(
        z.object({
            name: z.string(),
            url: z.string().url(),
            price: z.string().nullable().optional(),
            availability: z.string().nullable().optional(),
            notes: z.string().nullable().optional(),
        })
    ).default([]),
    localShops: z.array(
        z.object({
            name: z.string(),
            url: z.string().url().nullable().optional(),
            address: z.string().nullable().optional(),
            phone: z.string().nullable().optional(),
            notes: z.string().nullable().optional(),
        })
    ).default([]),
});

export type CigarIdentification = z.infer<typeof identifySchema>;
export type ExternalBuyOptions = z.infer<typeof externalResultsSchema> & {
    sources: { title: string; url: string }[];
};

function getOpenAIKey() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not configured on the server.");
    }
    return apiKey;
}

async function createResponse(body: object) {
    const res = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getOpenAIKey()}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`OpenAI request failed (${res.status}): ${errorText}`);
    }

    return res.json() as Promise<Record<string, unknown>>;
}

function extractOutputText(response: Record<string, unknown>) {
    if (typeof response.output_text === "string" && response.output_text.trim()) {
        return response.output_text;
    }

    const output = Array.isArray(response.output) ? response.output : [];
    const textParts: string[] = [];

    for (const item of output) {
        if (!item || typeof item !== "object") continue;
        const content = Array.isArray((item as { content?: unknown }).content)
            ? (item as { content?: Array<{ text?: string; type?: string }> }).content
            : [];

        for (const part of content) {
            if (part?.type === "output_text" && typeof part.text === "string") {
                textParts.push(part.text);
            }
        }
    }

    return textParts.join("\n").trim();
}

function parseJson<T>(raw: string) {
    const trimmed = raw.trim();
    const withoutFence = trimmed
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();

    try {
        return JSON.parse(withoutFence) as T;
    } catch {
        const start = withoutFence.indexOf("{");
        const end = withoutFence.lastIndexOf("}");
        if (start >= 0 && end > start) {
            return JSON.parse(withoutFence.slice(start, end + 1)) as T;
        }
        throw new Error("Model response was not valid JSON.");
    }
}

function uniqueTerms(input: Array<string | null | undefined>) {
    return Array.from(
        new Set(
            input
                .flatMap((value) => (value ?? "").split(/[|,/]+/))
                .map((value) => value.trim().toLowerCase())
                .filter((value) => value.length >= 3)
        )
    );
}

function buildSearchTerms(identification: CigarIdentification) {
    const lineName = [identification.brand, identification.line, identification.vitola]
        .filter(Boolean)
        .join(" ")
        .trim();

    return uniqueTerms([
        identification.displayName,
        lineName,
        identification.brand,
        identification.line,
        identification.vitola,
        identification.wrapper,
        ...identification.bandText,
    ]).slice(0, 8);
}

function scoreTextMatch(text: string, terms: string[]) {
    const haystack = text.toLowerCase();
    return terms.reduce((score, term) => score + (haystack.includes(term) ? term.length : 0), 0);
}

function parseLocation(location?: string) {
    if (!location?.trim()) return undefined;

    const [city, region] = location
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

    return {
        type: "approximate" as const,
        country: "US",
        city: city ?? location.trim(),
        ...(region ? { region } : {}),
    };
}

function extractSources(response: Record<string, unknown>) {
    const output = Array.isArray(response.output) ? response.output : [];
    const sources: { title: string; url: string }[] = [];

    for (const item of output) {
        if (!item || typeof item !== "object") continue;
        if ((item as { type?: string }).type !== "web_search_call") continue;

        const rawSources = Array.isArray((item as { action?: { sources?: unknown[] } }).action?.sources)
            ? ((item as { action?: { sources?: Array<{ title?: string; url?: string }> } }).action?.sources ?? [])
            : [];

        for (const source of rawSources) {
            if (!source?.url) continue;
            sources.push({
                title: source.title?.trim() || new URL(source.url).hostname,
                url: source.url,
            });
        }
    }

    return Array.from(new Map(sources.map((source) => [source.url, source])).values()).slice(0, 8);
}

export async function identifyCigarFromImages(images: string[]) {
    const identifyResponse = await createResponse({
        model: process.env.OPENAI_CIGAR_IDENTIFY_MODEL ?? "gpt-4.1-mini",
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text:
                            "You identify cigars from photos. Return JSON only with keys displayName, brand, line, vitola, wrapper, bandText, confidence, notes, alternateCandidates. Confidence must be between 0 and 1. bandText must be an array of text seen on cigar bands or packaging. alternateCandidates should include up to 3 objects with displayName and reason. If uncertain, still provide the best guess and explain why.",
                    },
                    ...images.map((image) => ({
                        type: "input_image",
                        image_url: image,
                        detail: "high",
                    })),
                ],
            },
        ],
    });

    return identifySchema.parse(parseJson<CigarIdentification>(extractOutputText(identifyResponse)));
}

export async function findSwapMatches(identification: CigarIdentification) {
    const terms = buildSearchTerms(identification);
    if (terms.length === 0) return [];

    const orFilters = terms.flatMap((term) => [
        { offeringName: { contains: term, mode: "insensitive" as const } },
        { wantDescription: { contains: term, mode: "insensitive" as const } },
    ]);

    const listings = await prisma.swapListing.findMany({
        where: {
            status: "OPEN",
            OR: orFilters,
        },
        take: 24,
        include: {
            author: { select: { id: true, name: true, username: true, avatar: true, xp: true } },
            _count: { select: { offers: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    return listings
        .map((listing) => ({
            listing,
            score:
                scoreTextMatch(listing.offeringName, terms) * 2 +
                scoreTextMatch(listing.wantDescription, terms) +
                (listing.offeringImage ? 4 : 0),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map((entry) => entry.listing);
}

export async function findExternalBuyOptions(identification: CigarIdentification, location?: string) {
    const cigarName = identification.displayName;
    const userLocation = parseLocation(location);

    const searchResponse = await createResponse({
        model: process.env.OPENAI_CIGAR_SEARCH_MODEL ?? "gpt-5",
        tools: [
            {
                type: "web_search",
                ...(userLocation ? { user_location: userLocation } : {}),
            },
        ],
        include: ["web_search_call.action.sources"],
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: [
                            `Find reputable current buying options for this cigar: ${cigarName}.`,
                            identification.brand ? `Brand: ${identification.brand}.` : "",
                            identification.line ? `Line: ${identification.line}.` : "",
                            identification.vitola ? `Vitola: ${identification.vitola}.` : "",
                            identification.wrapper ? `Wrapper: ${identification.wrapper}.` : "",
                            location ? `Also find nearby cigar shops for this location: ${location}.` : "No location was provided, so skip local shops.",
                            "Return JSON only with keys summary, retailers, localShops.",
                            "retailers should be an array of up to 4 objects with name, url, price, availability, notes.",
                            "localShops should be an array of up to 4 objects with name, url, address, phone, notes.",
                            "Use direct retailer or shop links when possible and prefer trusted cigar merchants over generic marketplaces.",
                        ]
                            .filter(Boolean)
                            .join(" "),
                    },
                ],
            },
        ],
    });

    const parsed = externalResultsSchema.parse(
        parseJson<z.infer<typeof externalResultsSchema>>(extractOutputText(searchResponse))
    );

    return {
        ...parsed,
        sources: extractSources(searchResponse),
    };
}
