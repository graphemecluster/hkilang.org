import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getStrapiMedia, getRelatedArticles } from "@/lib/strapi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Clock, Bookmark, Eye } from "lucide-react";
import ShareButtons from "@/components/news/share-buttons";
import RelatedArticles from "@/components/news/related-articles";

interface NewsDetailPageProps {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
	const article = await getArticle(params.slug);

	if (!article) {
		return {
			title: "文章未找到 - 香港本土語言保育協會",
		};
	}

	return {
		title: `${article.heading.title} - 香港本土語言保育協會`,
		description: article.heading.summary || "",
		openGraph: {
			title: article.heading.title,
			description: article.heading.summary || "",
			images: article.heading.coverImage?.data?.url ? [getStrapiMedia(article.heading.coverImage.data.url) || ""] : [],
		},
	};
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
	const article = await getArticle(params.slug);

	if (!article) {
		notFound();
	}

	const imageUrl = getStrapiMedia(article.heading.coverImage?.data?.url);
	const tags = article.tags || [];
	const publishDate = new Date(article.publishDate);
	const category = article.category;

	// Format reading time (assuming 200 words per minute)
	const wordCount = article.content.split(/\s+/).length;
	const readingTime = Math.max(1, Math.ceil(wordCount / 200));

	// Get related articles
	const relatedArticles = await getRelatedArticles(
		article.id,
		tags.map((tag: any) => tag.id),
	);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mb-8">
					<Link href="/news">
						<Button variant="ghost" className="text-gray-600 hover:text-red-800">
							<ChevronLeft className="mr-2 h-4 w-4" />
							返回最新消息
						</Button>
					</Link>
				</div>

				<article>
					<header className="mb-8">
						{/* Category */}
						{category && (
							<Link href={`/news?category=${category.slug}`}>
								<Badge className="mb-3 bg-red-100 text-red-800 hover:bg-red-200">{category.name}</Badge>
							</Link>
						)}

						{/* Title */}
						<h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
							{article.heading.title}
						</h1>

						{/* Meta information */}
						<div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
							<div className="flex items-center">
								<Calendar className="mr-1 h-4 w-4" />
								{publishDate.toLocaleDateString("zh-HK")}
							</div>
							<div className="flex items-center">
								<Clock className="mr-1 h-4 w-4" />
								閱讀時間：約 {readingTime} 分鐘
							</div>
							<div className="flex items-center">
								<Eye className="mr-1 h-4 w-4" />
								瀏覽次數：{article.viewCount || 0}
							</div>
						</div>

						{/* Tags */}
						{tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-6">
								{tags.map((tag: any) => (
									<Link key={tag.id} href={`/news?tags=${tag.id}`}>
										<Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{tag.name}</Badge>
									</Link>
								))}
							</div>
						)}

						{/* Summary */}
						{article.heading.summary && (
							<div className="bg-gray-50 p-4 rounded-lg mb-6 text-gray-700 italic">{article.heading.summary}</div>
						)}

						{/* Cover Image */}
						{imageUrl && (
							<div className="relative aspect-w-16 aspect-h-9 mb-8 overflow-hidden rounded-lg">
								<Image
									src={imageUrl || "/placeholder.svg"}
									alt={article.heading.title}
									fill
									className="object-cover"
									priority />
							</div>
						)}
					</header>

					{/* Article Content */}
					<div className="prose prose-lg max-w-none">
						<div
							dangerouslySetInnerHTML={{ __html: article.content }}
							className="prose prose-red prose-img:rounded-lg prose-headings:font-serif max-w-none" />
					</div>

					{/* Share and Bookmark */}
					<div className="mt-12 pt-6 border-t border-gray-200">
						<div className="flex flex-wrap justify-between items-center">
							<ShareButtons title={article.heading.title} />

							<Button variant="outline" size="sm" className="text-gray-600">
								<Bookmark className="mr-2 h-4 w-4" />
								收藏文章
							</Button>
						</div>
					</div>
				</article>

				{/* Related Articles */}
				{relatedArticles.length > 0 && (
					<div className="mt-16">
						<h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">相關文章</h2>
						<RelatedArticles articles={relatedArticles} />
					</div>
				)}
			</div>
		</div>
	);
}
