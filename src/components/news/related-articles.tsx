import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

import type { Data } from "@strapi/strapi";

interface RelatedArticlesProps {
	articles: Data.ContentType<"api::article.article">[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{articles.map(article => {
				const imageUrl = getStrapiMedia(article.heading?.coverImage?.url);

				return (
					<Link key={article.id} href={`/news/${article.slug}`}>
						<Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
							<div className="aspect-w-16 aspect-h-9 relative">
								<Image src={imageUrl || "/placeholder.svg"} alt={article.heading.title} width={0} height={0} className="w-full h-full object-cover" />
							</div>
							<CardContent className="p-4">
								<div className="text-sm text-gray-500 mb-2">{formatDate(article.publishDate)}</div>
								<h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">{article.heading.title}</h3>
							</CardContent>
						</Card>
					</Link>
				);
			})}
		</div>
	);
}
