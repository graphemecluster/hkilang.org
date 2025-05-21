import { NextResponse } from "next/server";
import { searchDictionaryWords, searchDictionaryCharacters } from "@/lib/strapi";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("q");
	const type = searchParams.get("type") || "word";
	const language = searchParams.get("language") || undefined;

	if (!query) {
		return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
	}

	try {
		let results;

		if (type === "character") {
			results = await searchDictionaryCharacters(query, language);
		}
		else {
			results = await searchDictionaryWords(query, language);
		}

		return NextResponse.json(results);
	}
	catch (error) {
		console.error("Dictionary search error:", error);
		return NextResponse.json({ error: "Failed to search dictionary" }, { status: 500 });
	}
}
