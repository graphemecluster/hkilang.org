import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getArticle, getStrapiMedia, getRelatedArticles } from "@/lib/strapi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import Markdown from "@/components/markdown";
import ShareButtons from "./share-buttons";
import RelatedArticles from "./related-articles";
import { formatDate, getMetadataFromHeading } from "@/lib/utils";
import type { PageProps } from "@/lib/types";
import { articleCategories } from "@/lib/consts";

export async function generateMetadata({ params }: PageProps<"category" | "slug">): Promise<Metadata> {
	const { category, slug } = await params;

	if (!articleCategories.has(category)) {
		notFound();
	}

	const article = await getArticle(slug);

	if (!article) {
		notFound();
	}

	if (category !== article.category?.slug) {
		permanentRedirect(`/${article.category?.slug}/${article.slug}`);
	}

	return getMetadataFromHeading(article.heading!);
}

export default async function ArticleDetailPage({ params }: PageProps<"category" | "slug">) {
	const { category, slug } = await params;

	if (!articleCategories.has(category)) {
		notFound();
	}

	const article = await getArticle(slug);

	if (!article) {
		notFound();
	}

	if (category !== article.category?.slug) {
		permanentRedirect(`/${article.category?.slug}/${article.slug}`);
	}

	const imageUrl = getStrapiMedia(article.heading?.coverImage?.url);
	const tags = article.tags || [];

	// Format reading time (assuming 100 words per minute)
	const wordCount = [...new Intl.Segmenter("zh-HK", { granularity: "word" }).segment(article.content || "")].filter(({ isWordLike }) => isWordLike).length;
	const readingTime = Math.max(1, Math.ceil(wordCount / 100));

	// Get related articles
	const relatedArticles = await getRelatedArticles(article.id, article.category.slug, tags.map(tag => tag.id));

	return (
		<div>
			<div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mb-8">
					<Link href={`/${article.category.slug}`}>
						<Button variant="ghost" className="text-gray-600 hover:text-red-800 flex items-center text-base">
							<ChevronLeft className="!h-5 !w-5 -mx-1" />
							返回{article.category.name}
						</Button>
					</Link>
				</div>

				<article>
					<header className="mb-8">
						{/* Title */}
						<h1 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl mb-4">
							{article.heading.title}
						</h1>

						{/* Meta information */}
						<div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
							<div className="flex items-center">
								<Calendar className="mr-1 h-4 w-4" />
								{formatDate(article.publishDate)}
							</div>
							<div className="flex items-center">
								<Clock className="mr-1 h-4 w-4" />
								閱讀時間：約 {readingTime} 分鐘
							</div>
							{
								/* <div className="flex items-center">
									<Eye className="mr-1 h-4 w-4" />
									瀏覽次數：{article.viewCount || 0}
								</div> */
							}
						</div>

						{/* Tags */}
						{!!tags.length && (
							<div className="flex flex-wrap gap-2 mb-6">
								{tags.map(tag => (
									<Link key={tag.id} href={`/${article.category.slug}?tag=${tag.slug}`}>
										<Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{tag.name}</Badge>
									</Link>
								))}
							</div>
						)}

						{/* Summary */}
						{article.heading.summary && (
							<div className="bg-gray-50 p-4 rounded-lg mb-6 text-gray-700">{article.heading.summary}</div>
						)}

						{/* Cover Image */}
						{imageUrl && (
							<div className="relative mb-8 overflow-hidden rounded-lg">
								<Image
									src={imageUrl || "/placeholder.svg"}
									alt={article.heading.title}
									width={0}
									height={0}
									className="w-full h-full object-cover"
									priority />
							</div>
						)}
					</header>

					{/* Article Content */}
					<Markdown className="prose-lg prose-img:rounded-lg prose-headings:font-serif">{article.content}</Markdown>

					{/* Share and Bookmark */}
					<div className="mt-12 pt-6 border-t border-gray-200">
						<div className="flex flex-wrap justify-between items-center">
							<ShareButtons title={article.heading.title} />

							{
								/* <Button variant="outline" size="sm" className="text-gray-600">
									<Bookmark className="mr-2 h-4 w-4" />
									收藏文章
								</Button> */
							}
						</div>
					</div>
				</article>

				{/* Related Articles */}
				{!!relatedArticles.length && (
					<div className="mt-16">
						<h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">相關文章</h2>
						<RelatedArticles articles={relatedArticles} />
					</div>
				)}
			</div>
		</div>
	);
}
