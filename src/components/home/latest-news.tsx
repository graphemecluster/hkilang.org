import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getNewsArticles } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

export default async function LatestNews() {
	// Fetch regular articles (excluding those already in the carousel)
	const regularArticlesData = await getNewsArticles({
		pageSize: 3,
		filters: {
			priority: {
				$eq: 0,
			},
		},
	});

	return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
		{regularArticlesData.data?.map(article => {
			const imageUrl = getStrapiMedia(article.heading?.coverImage?.data?.url);
			return (
				<Link key={article.id} href={`/news/${article.slug}`}>
					<Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
						<div className="aspect-w-16 aspect-h-9 relative">
							<Image
								src={imageUrl || "/placeholder.svg"}
								alt={article.heading.title}
								width={0}
								height={0}
								className="w-full h-full object-cover" />
						</div>
						<CardContent className="p-4">
							<div className="text-sm text-gray-500 mb-2">{formatDate(article.publishDate)}</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">{article.heading.title}</h3>
							<p className="text-gray-600 text-sm line-clamp-3">{article.heading.summary || ""}</p>
						</CardContent>
					</Card>
				</Link>
			);
		})}
	</div>;
}
