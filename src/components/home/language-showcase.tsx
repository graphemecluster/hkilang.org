import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// This is mock language data
// In a real application, this data should be fetched from Strapi CMS
const languages = [
  {
    id: "waitau",
    name: "圍頭話",
    description: "圍頭話是香港新界西北部原居民的方言，屬於粵語的一個分支。",
    image: "/placeholder.svg?height=300&width=400",
    link: "/resources/waitau",
  },
  {
    id: "hakka",
    name: "客家話",
    description: "客家話是客家人使用的漢語方言，在香港新界地區有著悠久的歷史。",
    image: "/placeholder.svg?height=300&width=400",
    link: "/resources/hakka",
  },
  {
    id: "tingkok",
    name: "汀角話",
    description: "汀角話是香港東北部汀角村的方言，具有獨特的語音和詞彙特點。",
    image: "/placeholder.svg?height=300&width=400",
    link: "/resources/tingkok",
  },
  {
    id: "tungpingchau",
    name: "東平洲話",
    description: "東平洲話是香港東平洲島上居民使用的方言，現已瀕臨消失。",
    image: "/placeholder.svg?height=300&width=400",
    link: "/resources/tungpingchau",
  },
]

export default function LanguageShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {languages.map((language) => (
        <div key={language.id} className="group relative overflow-hidden rounded-lg">
          <div className="aspect-w-3 aspect-h-4 relative">
            <Image
              src={language.image || "/placeholder.svg"}
              alt={language.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <h3 className="text-xl font-serif font-bold text-white">{language.name}</h3>
              <p className="mt-2 text-sm text-gray-200 line-clamp-3">{language.description}</p>
              <Link href={language.link} className="mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
