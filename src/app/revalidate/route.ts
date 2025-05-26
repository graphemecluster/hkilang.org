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
		switch (event.split(".")[0]) {
			case "entry":
				switch (model) {
					// Collection types
					case "article": {
						const category = entry?.category?.slug;
						if (category !== "news") return new NextResponse("Not a news article, revalidation not needed");
						revalidatePath("/");
						revalidatePath(`/${category}`);
						revalidatePath(`/${category}/${entry?.slug}`);
						break;
					}
					case "category": {
						const category = entry?.slug;
						if (category !== "news") return new NextResponse("Not the news category, revalidation not needed");
						revalidatePath(`/${category}`);
						// Revalidate all news pages
						revalidatePath(`/${category}/[slug]`, "page");
						break;
					}
					case "language": {
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
					case "listed-character":
					case "surveyed-lexical-domain":
					case "surveyed-lexical-item": {
						revalidatePath("/dictionary");
						break;
					}
					case "tag": {
						revalidatePath("/news");
						// Revalidate all news pages
						revalidatePath(`/news/[slug]`, "page");
						// TODO only revalidate news with this tag
						break;
					}
					case "word-of-the-day": {
						// Do not revalidate if it's a future entry
						if (new Date(`${entry?.date}T00:00:00+08:00`) > new Date()) return new NextResponse("Future entry, revalidation not needed");
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
						// Revalidate ALL pages
						revalidatePath("/", "layout");
						break;
					}
					case "dictionary-page": {
						revalidatePath("/dictionary");
						break;
					}
					case "faq": {
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
					case "news-page": {
						revalidatePath("/news");
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
