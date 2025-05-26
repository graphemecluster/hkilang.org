import { strapi } from "@strapi/client";

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

export async function getAboutData() {
	const data = await strapiClient.single("about-page").find({
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

	return data;
}

export async function getFAQData() {
	return strapiClient.single("faq-page").find({
		populate: ["heading", "questions"],
	});
}

export async function getContactData() {
	return strapiClient.single("contact-section").find();
}

export async function getNewsArticles({
	page = 1,
	pageSize = 9,
	search = "",
	tags = [] as string[],
	year = "",
	month = "",
	sort = ["publishDate:desc"],
	filters: customFilters = {},
} = {}) {
	// Build filters
	const filters: any = {
		category: {
			slug: {
				$eq: "news",
			},
		},
		...customFilters,
	};

	// Add search condition
	if (search) {
		filters.$or = [
			{
				heading: {
					title: {
						$containsi: search,
					},
				},
			},
			{
				content: {
					$containsi: search,
				},
			},
		];
	}

	// Add tag filters
	if (tags && tags.length > 0) {
		filters.tags = {
			slug: {
				$in: tags,
			},
		};
	}

	// Add date filters
	if (year) {
		const startDate = new Date(Date.UTC(Number.parseInt(year, 10), month ? Number.parseInt(month, 10) - 1 : 0, 1));
		const endDate = month
			? new Date(Date.UTC(Number.parseInt(year, 10), Number.parseInt(month, 10), 0))
			: new Date(Date.UTC(Number.parseInt(year, 10) + 1, 0, 0));

		filters.publishDate = {
			$gte: startDate.toISOString(),
			$lte: endDate.toISOString(),
		};
	}

	return strapiClient.collection("articles").find({
		filters,
		sort,
		pagination: {
			page,
			pageSize,
		},
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			tags: true,
			category: true,
		},
	});
}

export async function getPriorityNewsArticles() {
	return strapiClient.collection("articles").find({
		filters: {
			category: {
				slug: {
					$eq: "news",
				},
			},
			priority: {
				// TODO uncomment after demo
				// $gt: 0,
			},
		},
		sort: ["priority:desc", "publishDate:desc"],
		pagination: {
			limit: 10,
		},
		populate: {
			heading: {
				populate: ["coverImage"],
			},
			tags: true,
			category: true,
		},
	});
}

export async function getAllTags() {
	return strapiClient.collection("tags").find({
		pagination: {
			limit: 100,
		},
	});
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
			tags: true,
			category: true,
		},
	});

	return data?.data?.[0] || null;
}

export async function getRelatedArticles(articleId: string, tagIds: string[], limit = 3) {
	if (!tagIds.length) return [];
	// Get articles with the same tags, excluding the current article
	const data = await strapiClient.collection("articles").find({
		filters: {
			id: {
				$ne: articleId,
			},
			tags: {
				id: {
					$in: tagIds,
				},
			},
			category: {
				slug: {
					$eq: "news",
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
			tags: true,
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
			overview: true,
			distribution: {
				populate: {
					heading: {
						populate: ["coverImage"],
					},
					villages: true,
				},
			},
			culturalContext: {
				populate: {
					sections: {
						populate: ["coverImage"],
					},
				},
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
					domain: true,
					words: {
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
					chars: {
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
			chars: {
				populate: ["lang", "audio", "examples"],
			},
			collocation: true,
		},
	});

	// Then search for words
	const wordsData = await strapiClient.collection("surveyed-lexical-items").find({
		filters: {
			$or: [
				{ zhGloss: { $containsi: query } },
				{ enGloss: { $containsi: query } },
				{
					words: {
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
			domain: true,
			words: {
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

export async function getLexicalItemsByDomain(domainId: number, page = 1, pageSize = 10) {
	return strapiClient.collection("surveyed-lexical-items").find({
		filters: {
			domain: {
				id: {
					$eq: domainId,
				},
			},
		},
		pagination: {
			page,
			pageSize,
		},
		populate: {
			domain: true,
			words: {
				populate: ["lang", "audio", "examples"],
			},
		},
	});
}

export async function getNewsCategories() {
	return strapiClient.collection("categories").find({
		filters: {
			slug: {
				$eq: "news",
			},
		},
		pagination: {
			limit: 100,
		},
	});
}
