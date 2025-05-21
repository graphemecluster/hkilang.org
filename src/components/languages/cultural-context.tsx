import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getStrapiMedia } from "@/lib/strapi"

interface Section {
  title: string
  content: string
  image?: {
    data?: {
      attributes?: {
        url: string
      }
    }
  }
}

interface Proverb {
  proverb: string
  explanation: string
}

interface CulturalContextProps {
  language: string
  introduction: string
  sections: Section[]
  proverbs: Proverb[]
}

export default function CulturalContext({ language, introduction, sections, proverbs }: CulturalContextProps) {
  return (
    <div>
      <div className="prose prose-red max-w-none mb-8">
        <p>{introduction}</p>
      </div>

      <div className="space-y-12">
        {sections.map((section, index) => {
          const imageUrl = section.image?.data?.attributes?.url
            ? getStrapiMedia(section.image.data.attributes.url)
            : null

          return (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{section.title}</h3>
                <div className="prose prose-red max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              </div>
              <div className={`relative h-64 rounded-lg overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <Image
                  src={imageUrl || "/placeholder.svg?height=300&width=500"}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">圍頭話諺語精選</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proverbs.map((proverb, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="text-lg font-medium text-red-800 mb-2">「{proverb.proverb}」</p>
                <p className="text-gray-600">{proverb.explanation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
