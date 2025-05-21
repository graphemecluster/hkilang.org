import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getPriorityNewsArticles, getNewsArticles } from "@/lib/strapi"
import { getStrapiMedia } from "@/lib/strapi"
import NewsCarousel from "./news-carousel"

export default async function LatestNews() {
  // Fetch priority articles for the carousel
  const priorityArticlesData = await getPriorityNewsArticles()
  const priorityArticles = priorityArticlesData.data || []

  // Fetch regular articles (excluding those already in the carousel)
  const regularArticlesData = await getNewsArticles({
    pageSize: 3,
    filters: {
      priority: {
        $eq: 0,
      },
    },
  })
  const regularArticles = regularArticlesData.data || []

  return (
    <div className="space-y-12">
      {/* Priority Articles Carousel */}
      {priorityArticles.length > 0 && (
        <div>
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">焦點新聞</h3>
          <NewsCarousel articles={priorityArticles} />
        </div>
      )}

      {/* Regular Articles */}
      <div>
        {priorityArticles.length > 0 && <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">最新消息</h3>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regularArticles.map((article) => {
            const imageUrl = getStrapiMedia(article.heading?.coverImage?.data?.url)
            const publishDate = new Date(article.publishDate)

            return (
              <Link key={article.id} href={`/news/${article.slug}`}>
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={article.heading.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-2">{publishDate.toLocaleDateString("zh-HK")}</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{article.heading.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{article.heading.summary || ""}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
