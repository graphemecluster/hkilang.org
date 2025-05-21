import { NextResponse } from "next/server";
import { getWordsByCategory } from "@/lib/strapi";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const categoryId = searchParams.get("categoryId");
	const subcategoryId = searchParams.get("subcategoryId") || undefined;

	if (!categoryId) {
		return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
	}

	try {
		const results = await getWordsByCategory(categoryId, subcategoryId);
		return NextResponse.json(results);
	}
	catch (error) {
		console.error("Category fetch error:", error);
		return NextResponse.json({ error: "Failed to fetch words by category" }, { status: 500 });
	}
}
