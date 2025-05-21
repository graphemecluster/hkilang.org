import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "語言資源 - 香港本土語言保育協會",
  description: "探索香港本土語言的豐富資源，包括圍頭話、客家話、汀角話及東平洲話",
}

// This would normally be fetched from Strapi, but we're inlining the content
const languages = [
  {
    id: "waitau",
    name: "圍頭話",
    englishName: "Waitau Dialect",
    description:
      "圍頭話是香港新界西北部原居民的方言，屬於粵語的一個分支。圍頭話保留了許多古老的語音和詞彙特點，是研究粵語歷史發展的重要資源。",
    image: "/placeholder.svg?height=400&width=600",
    link: "/resources/waitau",
    speakerCount: "約5,000人",
    region: "新界西北部",
    status: "嚴重瀕危",
  },
  {
    id: "hakka",
    name: "客家話",
    englishName: "Hakka",
    description:
      "客家話是客家人使用的漢語方言，在香港新界地區有著悠久的歷史。香港的客家話主要分佈在新界東北部和中部地區，保留了許多古老的語言特點。",
    image: "/placeholder.svg?height=400&width=600",
    link: "/resources/hakka",
    speakerCount: "約100,000人",
    region: "新界東北部和中部",
    status: "嚴重瀕危",
  },
  {
    id: "tingkok",
    name: "汀角話",
    englishName: "Ting Kok Dialect",
    description:
      "汀角話是香港東北部汀角村的方言，具有獨特的語音和詞彙特點。汀角話融合了客家話和粵語的特點，是研究香港語言多樣性的重要資源。",
    image: "/placeholder.svg?height=400&width=600",
    link: "/resources/tingkok",
    speakerCount: "少於100人",
    region: "新界東北部",
    status: "極度瀕危",
  },
  {
    id: "tungpingchau",
    name: "東平洲話",
    englishName: "Tung Ping Chau Dialect",
    description:
      "東平洲話是香港東平洲島上居民使用的方言，現已瀕臨消失。東平洲話受到閩南語和粵語的影響，形成了獨特的語言特點，是香港語言多樣性的重要組成部分。",
    image: "/placeholder.svg?height=400&width=600",
    link: "/resources/tungpingchau",
    speakerCount: "少於100人",
    region: "東平洲島",
    status: "極度瀕危",
  },
]

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">語言資源</h1>
          <p className="mt-4 text-lg text-gray-600">
            探索香港本土語言的豐富資源，了解這些珍貴語言的特點、歷史和文化背景
          </p>
        </div>

        <div className="mt-16 space-y-20">
          {languages.map((language, index) => (
            <div
              key={language.id}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <Image src={language.image || "/placeholder.svg"} alt={language.name} fill className="object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  {language.name}
                  <span className="ml-3 text-xl text-gray-500">{language.englishName}</span>
                </h2>
                <div className="mt-4 flex flex-wrap gap-4">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    使用人數: {language.speakerCount}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    分佈地區: {language.region}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                    保育狀況: {language.status}
                  </span>
                </div>
                <p className="mt-4 text-lg text-gray-600">{language.description}</p>
                <div className="mt-6">
                  <Button className="bg-red-800 hover:bg-red-700">
                    <Link href={language.link}>了解更多</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources Section */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">其他語言資源</h2>
            <p className="mt-4 text-lg text-gray-600">除了上述主要語言外，我們還提供以下資源</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">語言學習材料</h3>
                <p className="text-gray-600 mb-4">包括教材、詞典、語音指南和練習材料，適合不同程度的學習者使用。</p>
                <Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
                  瀏覽學習材料
                </Button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">口述歷史檔案</h3>
                <p className="text-gray-600 mb-4">收錄本土語言使用者的口述歷史，保存珍貴的語言資料和文化記憶。</p>
                <Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
                  聆聽口述歷史
                </Button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">研究論文集</h3>
                <p className="text-gray-600 mb-4">
                  收錄關於香港本土語言的學術研究成果，涵蓋語音、詞彙、語法和社會語言學等多個方面。
                </p>
                <Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
                  查看研究論文
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
