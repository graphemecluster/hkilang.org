import { strapi } from "@strapi/client";

// Initialize the Strapi client
const strapiClient = strapi({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api",
	// auth: process.env.STRAPI_API_TOKEN,
});

/**
 * Get the URL for Strapi media
 */
export function getStrapiMedia(url: string | null) {
	if (!url) return null;
	if (url.startsWith("http") || url.startsWith("//")) return url;
	return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
}

/**
 * Get about page data
 */
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

/**
 * Get FAQ data
 */
export async function getFAQData() {
	return strapiClient.single("faq-page").find({
		populate: ["heading", "questions"],
	});
}

/**
 * Get contact information
 */
export async function getContactData() {
	return strapiClient.single("contact-section").find();
}

/**
 * Get news articles
 */
export async function getNewsArticles({
	page = 1,
	pageSize = 9,
	search = "",
	tags = [],
	year,
	month,
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
			id: {
				$in: tags,
			},
		};
	}

	// Add date filters
	if (year) {
		const startDate = new Date(Number.parseInt(year), month ? Number.parseInt(month) - 1 : 0, 1);
		const endDate = month
			? new Date(Number.parseInt(year), Number.parseInt(month), 0)
			: new Date(Number.parseInt(year) + 1, 0, 0);

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

/**
 * Get priority news articles for the home page
 */
export async function getPriorityNewsArticles() {
	return strapiClient.collection("articles").find({
		filters: {
			category: {
				slug: {
					$eq: "news",
				},
			},
			priority: {
				$gt: 0,
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

/**
 * Get all tags
 */
export async function getAllTags() {
	return strapiClient.collection("tags").find({
		pagination: {
			limit: 100,
		},
	});
}

/**
 * Get a single article
 */
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

/**
 * Get related articles
 */
export async function getRelatedArticles(articleId: string, tagIds: string[], limit = 3) {
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

	return data?.data || [];
}

/**
 * Get all languages
 */
export async function getLanguages() {
	return strapiClient.collection("languages").find({
		populate: ["introPage"],
	});
}

/**
 * Get language by slug
 */
export async function getLanguageBySlug(slug: string) {
	const data = await strapiClient.collection("languages").find({
		filters: {
			slug: {
				$eq: slug,
			},
		},
		populate: ["introPage"],
	});

	return data?.data?.[0] || null;
}

/**
 * Get language intro page
 */
export async function getLanguageIntroPage(id: number) {
	return strapiClient.collection("language-intro-pages").findOne(id, {
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
}

/**
 * Get word of the day
 */
export async function getWordOfTheDay() {
	const data = await strapiClient.collection("word-of-the-days").find({
		filters: {
			date: { $lte: new Date().toISOString().split("T")[0] },
		},
		sort: ["date:desc"],
		pagination: {
			limit: 1,
		},
		populate: {
			item: {
				populate: {
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
						$or: [{ glyph: { $containsi: query } }, { pron: { $containsi: query } }, { notes: { $containsi: query } }],
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
						$or: [{ glyph: { $containsi: query } }, { pron: { $containsi: query } }, { notes: { $containsi: query } }],
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

/**
 * Get lexical domains
 */
export async function getLexicalDomains() {
	return strapiClient.collection("surveyed-lexical-domains").find({
		pagination: {
			limit: 100,
		},
		populate: ["items"],
	});
}

/**
 * Get lexical items by domain
 */
export async function getLexicalItemsByDomain(domainId: number) {
	return strapiClient.collection("surveyed-lexical-items").find({
		filters: {
			domain: {
				id: {
					$eq: domainId,
				},
			},
		},
		populate: {
			domain: true,
			words: {
				populate: ["lang", "audio", "examples"],
			},
		},
	});
}

// Add this function to get news categories
export async function getNewsCategories() {
	return strapiClient.collection("categories").find({
		filters: {
			type: {
				$eq: "news",
			},
		},
		pagination: {
			limit: 100,
		},
	});
}
