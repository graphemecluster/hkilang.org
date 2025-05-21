import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getStrapiMedia } from "@/lib/strapi"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsListProps {
  articles: any[]
  isLoading: boolean
}

export default function NewsList({ articles, isLoading }: NewsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="aspect-w-16 aspect-h-9 h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">沒有找到文章</h3>
        <p className="text-gray-500">請嘗試調整搜尋條件</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => {
        const { id } = article
        const imageUrl = getStrapiMedia(article.coverImage?.data?.url)
        const tags = article.tags?.data || []
        const publishDate = new Date(article.publishDate)

        return (
          <Link key={id} href={`/news/${article.slug}`}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 relative">
                {imageUrl ? (
                  <Image src={imageUrl || "/placeholder.svg"} alt={article.heading.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">無圖片</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-2">{publishDate.toLocaleDateString("zh-HK")}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{article.heading.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{article.heading.summary || ""}</p>
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag: any) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
                      >
                        {tag.name}
                      </span>
                    ))}
                    {tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
