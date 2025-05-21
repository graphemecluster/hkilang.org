import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface CulturalContextProps {
  language: string
}

export default function CulturalContext({ language }: CulturalContextProps) {
  // This would normally be fetched from Strapi, but we're inlining the content
  const culturalData = {
    waitau: {
      introduction:
        "圍頭話不僅是一種語言，更是承載著豐富文化內涵的非物質文化遺產。了解圍頭話的文化背景，有助於更深入地理解這門語言。",
      sections: [
        {
          title: "圍頭文化的歷史淵源",
          content:
            "圍頭文化可追溯至宋元時期，當時大量中原漢族南遷至珠江三角洲地區。明清時期，為抵禦海盜侵擾，新界西北部的居民修建了帶有防禦性質的圍牆村落，這些村落被稱為「圍村」，居民則被稱為「圍頭人」。圍頭人在長期的生產生活中，形成了獨特的語言、習俗和文化傳統，圍頭話正是這一文化的重要組成部分。",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "圍頭話與宗族文化",
          content:
            "圍頭村落多以宗族為單位，同一宗族的成員居住在同一個圍村內。這���宗族聚居的生活方式，使得圍頭話在不同的村落間形成了細微的差異，形成了不同的「土語」。同時，宗族文化也深刻影響了圍頭話的詞彙系統，特別是在稱謂、禮儀和祭祀等方面的詞彙尤為豐富。",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "圍頭話與傳統節慶",
          content:
            "圍頭地區保留了許多傳統節慶活動，如太平清醮、盂蘭勝會、春秋二祭等。在這些節慶活動中，圍頭話扮演著重要的角色，特別是在祭祀儀式、戲曲表演和民間歌謠中。這些活動不僅豐富了圍頭話的詞彙，也為圍頭話的傳承提供了重要場域。",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "圍頭話與民間文學",
          content:
            "圍頭地區有豐富的民間文學傳統，包括民間故事、諺語、謎語和歌謠等。這些民間文學作品多以圍頭話口頭傳承，反映了圍頭人的生活智慧和價值觀念。例如，圍頭話中有大量與農業、天氣和人際關係相關的諺語，這些諺語簡潔明了，富有哲理，是圍頭文化的精華所在。",
          image: "/placeholder.svg?height=300&width=500",
        },
        {
          title: "圍頭話與傳統手工藝",
          content:
            "圍頭地區有多種傳統手工藝，如紮作、剪紙、編織和陶瓷等。這些手工藝活動形成了一套專業詞彙，豐富了圍頭話的詞彙系統。同時，手工藝人在製作過程中的交流和技藝傳承，也為圍頭話的傳承提供了重要途徑。",
          image: "/placeholder.svg?height=300&width=500",
        },
      ],
      proverbs: [
        {
          proverb: "天光雞啼，天黑雞歸。",
          explanation: "形容農村生活的規律性，天亮時雞啼，天黑時雞回窩。",
        },
        {
          proverb: "好心得好報，種瓜得瓜，種豆得豆。",
          explanation: "善有善報，種什麼收穫什麼，比喻行為與結果的對應關係。",
        },
        {
          proverb: "一日之計在於晨，一年之計在於春。",
          explanation: "強調早晨和春季是開始計劃和行動的最佳時機。",
        },
        {
          proverb: "三日打魚，兩日曬網。",
          explanation: "形容工作不持續，時做時停。",
        },
        {
          proverb: "有米自然有雞來。",
          explanation: "有了資源自然會吸引人來，比喻有條件就會有結果。",
        },
      ],
    },
  }

  const data = culturalData[language as keyof typeof culturalData]

  return (
    <div>
      <div className="prose prose-red max-w-none mb-8">
        <p>{data.introduction}</p>
      </div>

      <div className="space-y-12">
        {data.sections.map((section, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{section.title}</h3>
              <div className="prose prose-red max-w-none">
                <p>{section.content}</p>
              </div>
            </div>
            <div className={`relative h-64 rounded-lg overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}>
              <Image src={section.image || "/placeholder.svg"} alt={section.title} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">圍頭話諺語精選</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.proverbs.map((proverb, index) => (
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
