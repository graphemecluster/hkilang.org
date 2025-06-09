import { strapi } from "@strapi/client";

import type { Data } from "@strapi/strapi";

const STRAPI_URL = process.env["VERCEL_PROJECT_PRODUCTION_URL"] ? `https://${process.env["VERCEL_PROJECT_PRODUCTION_URL"]}/api` : typeof location === "undefined" ? "http://localhost:3000/api" : `${location.origin}/api`;

// Initialize the Strapi client
const strapiClient = strapi({
	baseURL: STRAPI_URL,
	// auth: process.env.STRAPI_API_TOKEN,
});

export function getStrapiMedia(url: string | null) {
	// The URL is rewritten by the `rewrites` function in `next.config.ts`
	return url;
	// if (!url) return null;
	// This automatically handles both relative and absolute URLs
	// return `${new URL(url, STRAPI_URL)}`;
}

export async function getHomePageData() {
	return strapiClient.single("home-page").find({
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			wordOfTheDaySection: {
				populate: ["coverImage"],
			},
			languageShowcaseSection: {
				populate: ["coverImage"],
			},
			callToActionSection: {
				populate: {
					heading: {
						populate: ["coverImage"],
					},
					applicationForm: true,
				},
			},
		},
	});
}

export async function getAboutPageData() {
	return strapiClient.single("about-page").find({
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			sections: true,
			members: {
				populate: ["image"],
			},
			timeline: true,
		},
	});
}

export async function getLanguagesPageData() {
	return strapiClient.single("languages-page").find({
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			relatedResources: {
				populate: {
					heading: {
						populate: ["coverImage"],
					},
					resources: {
						populate: {
							heading: {
								populate: ["coverImage"],
							},
						},
					},
				},
			},
		},
	});
}

export async function getDictionaryPageData() {
	return strapiClient.single("dictionary-page").find({
		populate: {
			heading: {
				populate: ["coverImage"],
			},
		},
	});
}

export async function getFAQPageData() {
	return strapiClient.single("faq-page").find({
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			questions: true,
		},
	});
}

export async function getContactSectionData() {
	return strapiClient.single("contact-section").find();
}

export async function getArticles({ category, page, pageSize, query, tag, month }: { category: string; page: number; pageSize: number; query: string; tag: string | null; month: string | null }) {
	// Build filters
	const filters: any = {
		category: {
			slug: {
				$eq: category,
			},
		},
	};

	// Add search condition
	if (query) {
		filters.$or = [
			{
				heading: {
					$or: [
						{ title: { $containsi: query } },
						{ summary: { $containsi: query } },
					],
				},
			},
			{
				content: { $containsi: query },
			},
		];
	}

	// Add tag filter
	if (tag) {
		filters.tags = {
			slug: {
				$eq: tag,
			},
		};
	}

	// Add month filter
	if (month) {
		const [y, m] = month.split("-");
		const start = `${month}-01`;
		const end = new Date(Date.UTC(Number.parseInt(y!, 10), Number.parseInt(m!, 10), 0));
		filters.publishDate = {
			$gte: start,
			$lte: end.toISOString().split("T")[0],
		};
	}

	return strapiClient.collection("articles").find({
		filters,
		sort: ["publishDate:desc"],
		pagination: {
			page,
			pageSize,
		},
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			category: true,
			tags: true,
		},
	});
}

export async function getCarouselArticles() {
	return strapiClient.collection("articles").find({
		filters: {
			category: {
				$notNull: true,
			},
			priority: {
				$gt: 0,
			},
		},
		sort: ["priority:desc", "publishDate:desc"],
		pagination: {
			limit: 100,
		},
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			category: true,
		},
	});
}

export async function getCategory(slug: string) {
	const data = await strapiClient.collection("categories").find({
		filters: {
			slug: {
				$eq: slug,
			},
		},
	});

	return data?.data?.[0] || null;
}

export async function getTags(category: string) {
	// TODO Use strapiClient.collection("tags")
	const articles = await strapiClient.collection("articles").find({
		filters: {
			category: {
				slug: {
					$eq: category,
				},
			},
		},
		pagination: {
			limit: 100000, // TODO this is useless, limit is clamped to 100
		},
		populate: ["tags"],
	});

	const tags = new Map<string, Data.ContentType<"api::tag.tag">>();
	for (const article of articles?.data || []) {
		for (const tag of article.tags || []) {
			tags.set(tag.slug!, tag);
		}
	}

	return [...tags.values()].sort((a, b) => +(a.slug! > b.slug!) || -(a.slug! < b.slug!));
}

export async function getArticle(slug: string) {
	const data = await strapiClient.collection("articles").find({
		filters: {
			slug: {
				$eq: slug,
			},
		},
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			category: true,
			tags: true,
		},
	});

	return data?.data?.[0] || null;
}

export async function getRelatedArticles(articleId: string, category: string, tagIds: string[], limit = 3) {
	if (!tagIds.length) return [];
	// Get articles with the same tags, excluding the current article
	const data = await strapiClient.collection("articles").find({
		filters: {
			documentId: {
				$ne: articleId,
			},
			category: {
				slug: {
					$eq: category,
				},
			},
			tags: {
				documentId: {
					$in: tagIds,
				},
			},
		},
		sort: ["publishDate:desc"],
		pagination: {
			limit,
		},
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			category: true,
		},
	});

	return data?.data;
}

export async function getLanguageIntroPages() {
	return strapiClient.collection("language-intro-pages").find({
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			lang: {
				fields: ["slug"],
			},
		},
		sort: ["lang.zhName:asc"],
	});
}

export async function getLanguageIntroPage(slug: string) {
	const data = await strapiClient.collection("language-intro-pages").find({
		filters: {
			lang: {
				slug: {
					$eq: slug,
				},
			},
		},
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			lang: true,
			relatedResources: {
				populate: {
					heading: {
						populate: ["coverImage"],
					},
					resources: {
						populate: {
							heading: {
								populate: ["coverImage"],
							},
						},
					},
				},
			},
		},
	});

	return data?.data?.[0] || null;
}

const TIMEZONE_OFFSET = -480;

export async function getWordOfTheDay() {
	const data = await strapiClient.collection("word-of-the-days").find({
		filters: {
			date: { $lte: new Date(Date.now() - TIMEZONE_OFFSET * 60000).toISOString().split("T")[0]! },
		},
		sort: ["date:desc"],
		pagination: {
			limit: 1,
		},
		populate: {
			item: {
				populate: {
					surveyedDomain: true,
					forms: {
						populate: ["lang", "audio", "examples"],
					},
				},
			},
		},
	});

	return data?.data?.[0] || null;
}

// Update the searchDictionary function to better handle pagination
export async function searchDictionary(query: string, page = 1, pageSize = 10) {
	// Calculate page sizes for characters and words
	const characterPageSize = Math.floor(pageSize / 2);
	const wordPageSize = pageSize - characterPageSize;

	// First search for characters
	const charactersData = await strapiClient.collection("listed-characters").find({
		filters: {
			$or: [
				{ codepoint: { $containsi: query } },
				{
					forms: {
						$or: [
							{ glyph: { $containsi: query } },
							{ pron: { $containsi: query } },
							{ notes: { $containsi: query } },
						],
					},
				},
				{ notes: { $containsi: query } },
			],
		},
		pagination: {
			page,
			pageSize: characterPageSize,
		},
		populate: {
			forms: {
				populate: ["lang", "audio", "examples"],
			},
			collocation: true,
		},
	});

	// Then search for words
	const wordsData = await strapiClient.collection("lexical-items").find({
		filters: {
			$or: [
				{ zhGloss: { $containsi: query } },
				{ enGloss: { $containsi: query } },
				{
					forms: {
						$or: [
							{ glyph: { $containsi: query } },
							{ pron: { $containsi: query } },
							{ notes: { $containsi: query } },
						],
					},
				},
				{ notes: { $containsi: query } },
			],
		},
		pagination: {
			page,
			pageSize: wordPageSize,
		},
		populate: {
			surveyedDomain: true,
			forms: {
				populate: ["lang", "audio", "examples"],
			},
		},
	});

	return {
		characters: charactersData,
		words: wordsData,
	};
}

export async function getLexicalDomains() {
	return strapiClient.collection("surveyed-lexical-domains").find({
		pagination: {
			limit: 100,
		},
		populate: ["items"],
	});
}

export async function getLexicalItemsByDomain(domain: string, page = 1, pageSize = 10) {
	return strapiClient.collection("lexical-items").find({
		filters: {
			surveyedDomain: {
				slug: {
					$eq: domain,
				},
			},
		},
		pagination: {
			page,
			pageSize,
		},
		populate: {
			surveyedDomain: true,
			forms: {
				populate: ["lang", "audio", "examples"],
			},
		},
	});
}

export async function getSyllableAudio(language: string, pron: string) {
	const data = await strapiClient.collection("listed-syllables").find({
		filters: {
			lang: {
				slug: {
					$eq: language,
				},
			},
			pron: {
				$eq: pron,
			},
		},
		populate: ["audio"],
	});

	return data?.data?.[0]?.audio || null;
}

export async function getShowcaseLexicalDomains() {
	return strapiClient.collection("showcase-lexical-domains").find({
		pagination: {
			limit: 100,
		},
		populate: {
			items: {
				populate: {
					forms: {
						populate: ["lang", "audio", "examples"],
					},
				},
			},
		},
		sort: ["slug:asc"],
	});
}

export async function getGenres() {
	return strapiClient.collection("genres").find({
		pagination: {
			limit: 100,
		},
		populate: {
			items: {
				populate: {
					versions: {
						populate: ["lang", "audio"],
					},
				},
			},
		},
		sort: ["slug:asc"],
	});
}
