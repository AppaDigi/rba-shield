import { useState, useRef, useCallback } from "react";

export interface MentionUser {
    id: string;
    username: string;
    name: string | null;
    avatar: string | null;
}

export function useMentionSearch() {
    const [query, setQuery] = useState<string | null>(null);   // text after @, null = no active mention
    const [mentionStart, setMentionStart] = useState(-1);      // index of @ in the string
    const [results, setResults] = useState<MentionUser[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const detect = useCallback((value: string, cursorPos: number) => {
        const textBefore = value.slice(0, cursorPos);
        // Match @ followed by valid username chars, anchored to end of textBefore
        const match = textBefore.match(/@([a-z0-9_]*)$/i);

        if (match && match.index !== undefined) {
            const q = match[1];
            setMentionStart(match.index);
            setQuery(q);
            setSelectedIndex(0);

            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(async () => {
                if (q.length === 0) { setResults([]); return; }
                try {
                    const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`);
                    const data = await res.json();
                    setResults(Array.isArray(data) ? data : []);
                } catch {
                    setResults([]);
                }
            }, 180);
        } else {
            setQuery(null);
            setMentionStart(-1);
            setResults([]);
        }
    }, []);

    const insert = useCallback((value: string, username: string, currentQuery: string, start: number) => {
        const before = value.slice(0, start);
        const after = value.slice(start + 1 + currentQuery.length);
        const newValue = `${before}@${username} ${after}`;
        const newCursor = before.length + username.length + 2; // after "@username "
        return { newValue, newCursor };
    }, []);

    const dismiss = useCallback(() => {
        setQuery(null);
        setMentionStart(-1);
        setResults([]);
    }, []);

    const open = query !== null && results.length > 0;

    return { query, mentionStart, results, selectedIndex, setSelectedIndex, open, detect, insert, dismiss };
}
