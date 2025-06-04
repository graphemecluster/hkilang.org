import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const REVALIDATE_WEBHOOK_SECRET = process.env["REVALIDATE_WEBHOOK_SECRET"];

export async function POST(request: NextRequest) {
	// TODO Hash secret
	if (request.headers.get("Authorization") !== `Bearer ${REVALIDATE_WEBHOOK_SECRET}`) {
		return new NextResponse("Invalid authorization token", { status: 401 });
	}

	try {
		const body = await request.json();
		const { event, entry, model } = body;
		const isEntryCreation = event === "entry.create";
		switch (event.split(".")[0]) {
			case "entry":
				switch (model) {
					// Collection types
					case "article": {
						const category = entry?.category?.slug;
						revalidatePath("/");
						revalidatePath(`/${category}`);
						revalidatePath(`/${category}/${entry?.slug}`);
						break;
					}
					case "category": {
						if (isEntryCreation) return new NextResponse("Revalidation not needed for category creation"); // New categories won't be visible at all because navigation items are currently hard coded.
						revalidatePath(`/${entry?.slug}`);
						revalidatePath("/[category]/[slug]", "page"); // Revalidate all article detail pages (TODO only revalidate articles with this category)
						break;
					}
					case "genre": {
						if (isEntryCreation) return new NextResponse("Revalidation not needed for genre creation"); // because genres without themed items are hidden. The language pages will be revalidated upon creation of themed items with this genre.
						revalidatePath("/languages/[slug]", "page"); // Revalidate all language detail pages
						break;
					}
					case "language": {
						if (isEntryCreation) return new NextResponse("Revalidation not needed for language creation"); // because languages without any references are not visible at all.
						revalidatePath("/");
						revalidatePath("/languages");
						revalidatePath(`/languages/${entry?.slug}`);
						break;
					}
					case "language-intro-page": {
						revalidatePath("/");
						revalidatePath("/languages");
						revalidatePath(`/languages/${entry?.lang?.slug}`);
						break;
					}
					case "lexical-item": {
						// We don't know if a surveyed/showcase lexical domain is being added/removed or not, so we'll have to revalidate both for safety
						revalidatePath("/dictionary");
						revalidatePath("/languages/[slug]", "page"); // Revalidate all language detail pages
						break;
					}
					case "listed-character":
					case "listed-syllable":
					case "surveyed-lexical-domain": {
						revalidatePath("/dictionary");
						break;
					}
					case "showcase-lexical-domain": {
						if (isEntryCreation) return new NextResponse("Revalidation not needed for showcase lexical domain creation"); // because domains without lexical items are hidden. The language pages will be revalidated upon creation of lexical items with this domain.
						revalidatePath("/languages/[slug]", "page"); // Revalidate all language detail pages
						break;
					}
					case "tag": {
						if (isEntryCreation) return new NextResponse("Revalidation not needed for tag creation"); // because tags without articles are hidden. The article pages will be revalidated upon creation of articles with this tag.
						revalidatePath("/[category]", "page"); // Revalidate all article pages
						revalidatePath("/[category]/[slug]", "page"); // Revalidate all article detail pages (TODO only revalidate articles with this tag)
						break;
					}
					case "themed-item": {
						revalidatePath("/languages/[slug]", "page"); // Revalidate all language detail pages
						break;
					}
					case "word-of-the-day": {
						if (new Date(`${entry?.date}T00:00:00+08:00`) > new Date()) return new NextResponse("Revalidation not needed for future word of the day entry");
						revalidatePath("/");
						revalidatePath("/dictionary");
						break;
					}
					// Single types
					case "about-page": {
						revalidatePath("/about");
						break;
					}
					case "contact-section": {
						revalidatePath("/", "layout"); // Revalidate ALL pages
						break;
					}
					case "dictionary-page": {
						revalidatePath("/dictionary");
						break;
					}
					case "faq-page": {
						revalidatePath("/faq");
						break;
					}
					case "home-page": {
						revalidatePath("/");
						break;
					}
					case "languages-page": {
						revalidatePath("/languages");
						break;
					}
				}
				return new NextResponse("Content successfully revalidated");
			default:
				return new NextResponse(`Invalid event: "${event}"`, { status: 400 });
		}
	}
	catch (err) {
		return new NextResponse("Error revalidating", { status: 500 });
	}
}
