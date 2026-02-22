// src/app/api/search/route.ts
import { NextResponse } from "next/server";
import { buildSearchIndexes } from "@/lib/postService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("tag")?.toLowerCase().trim() || "";

  if (!query) return NextResponse.json({ results: [] });

  try {
    const searchIndex = await buildSearchIndexes();

    // Split the user search (e.g., "Art of Doing Less")
    // and try searching for the first significant word
    const queryWords = query.split(/\s+/).filter((w) => w.length > 2);

    let allResults: any[] = [];

    // Search the tree for each word in the query
    queryWords.forEach((word) => {
      const wordResults = searchIndex.search(word);
      if (wordResults) allResults = [...allResults, ...wordResults];
    });

    // Remove duplicates (since one post might match multiple words)
    const uniqueResults = Array.from(
      new Map(allResults.map((p) => [p.id, p])).values(),
    );

    return NextResponse.json({ results: uniqueResults });
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
