import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getStrapiMedia } from "@/lib/strapi"

interface RelatedArticlesProps {
  articles: any[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article) => {
        const imageUrl = getStrapiMedia(article.heading?.coverImage?.data?.url)
        const publishDate = new Date(article.publishDate)

        return (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image src={imageUrl || "/placeholder.svg"} alt={article.heading.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-2">{publishDate.toLocaleDateString("zh-HK")}</div>
                <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">{article.heading.title}</h3>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
