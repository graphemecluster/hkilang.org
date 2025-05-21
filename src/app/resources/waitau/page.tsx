import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LanguageMap from "@/components/resources/language-map"
import PronunciationGuide from "@/components/resources/pronunciation-guide"
import VocabularyList from "@/components/resources/vocabulary-list"
import AudioPhrases from "@/components/resources/audio-phrases"
import CulturalContext from "@/components/resources/cultural-context"

export const metadata: Metadata = {
  title: "圍頭話 - 香港本土語言保育協會",
  description: "了解香港圍頭話的歷史、特點、發音和詞彙，探索這個珍貴的本土語言",
}

export default function WaitauPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-red-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <h1 className="mt-2 text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">
              圍頭話
              <span className="text-2xl ml-3 text-gray-600">Waitau Dialect</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              圍頭話是香港新界西北部原居民的方言，屬於粵語的一個分支。圍頭話保留了許多古老的語音和詞彙特點，
              是研究粵語歷史發展的重要資源，也是香港珍貴的非物質文化遺產。
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="bg-red-800 hover:bg-red-700">
                <Link href="/dictionary?language=waitau">查詢圍頭話字典</Link>
              </Button>
              <Link href="#pronunciation" className="text-sm font-semibold leading-6 text-gray-900">
                學習發音 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-0 top-0 -translate-y-12 translate-x-1/2 transform">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="傳統紙張紋理"
              width={600}
              height={600}
              className="opacity-20"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">概述</TabsTrigger>
            <TabsTrigger value="pronunciation" id="pronunciation">
              發音
            </TabsTrigger>
            <TabsTrigger value="vocabulary">詞彙</TabsTrigger>
            <TabsTrigger value="phrases">常用語句</TabsTrigger>
            <TabsTrigger value="culture">文化背景</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">歷史背景</h2>
                <div className="prose prose-red max-w-none">
                  <p>
                    圍頭話是香港新界西北部原居民使用的方言，主要分佈在元朗、屯門、天水圍等地區的圍村。「圍頭」一詞源於這些村落的建築特色——為防禦海盜而建的圍牆，因此居住在這些圍村的居民被稱為「圍頭人」，他們說的話則被稱為「圍頭話」。
                  </p>
                  <p>
                    圍頭話的形成可追溯至宋元時期，當時大量中原漢族南遷至珠江三角洲地區，與當地居民融合，逐漸形成了獨特的語言和文化。明清時期，圍頭話進一步發展，形成了現今的基本面貌。
                  </p>
                  <p>
                    隨著香港城市化進程加速，特別是20世紀後半葉，圍頭話的使用範圍逐漸縮小，使用人數減少。目前，圍頭話主要由中老年原居民使用，年輕一代多轉用標準粵語，圍頭話面臨傳承危機。
                  </p>
                </div>

                <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">語言特點</h2>
                <div className="prose prose-red max-w-none">
                  <p>圍頭話雖然屬於粵語的一個分支，但與香港通行的標準粵語（廣州話）有明顯差異：</p>
                  <ul>
                    <li>保留了更多古音，如入聲韻尾「-p」、「-t」、「-k」發音清晰</li>
                    <li>聲調系統與標準粵語不同，保留了一些古老的聲調特點</li>
                    <li>詞彙中保留了許多古漢語詞，這些詞在標準粵語中已不常用</li>
                    <li>有獨特的語法結構和表達方式，反映了早期粵語的特點</li>
                    <li>受到客家話等周邊方言的影響，形成了獨特的混合特色</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">地理分佈</h2>
                <div className="prose prose-red max-w-none mb-4">
                  <p>
                    圍頭話主要分佈在香港新界西北部的原居民村落，包括元朗、屯門、天水圍等地區的圍村。這些地區歷史上形成了獨特的「圍頭文化圈」，圍頭話是這一文化圈的重要組成部分。
                  </p>
                </div>

                <LanguageMap language="waitau" />

                <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">保育現狀</h2>
                <div className="prose prose-red max-w-none">
                  <p>
                    隨著社會變遷和城市化進程，圍頭話的使用範圍不斷縮小，目前主要由中老年原居民使用，年輕一代多轉用標準粵語。根據調查，能流利使用圍頭話的人口不足10萬，且多為50歲以上的居民。
                  </p>
                  <p>
                    近年來，隨著對非物質文化遺產保護意識的提高，香港政府和民間組織開始重視圍頭話的保育工作。本會積極開展圍頭話的記錄、研究和推廣工作，包括：
                  </p>
                  <ul>
                    <li>建立圍頭話語音資料庫，記錄原居民的口述歷史</li>
                    <li>編纂圍頭話詞典，保存珍貴的語言資源</li>
                    <li>舉辦圍頭話工作坊和講座，向公眾推廣圍頭話</li>
                    <li>與學���合作，開展圍頭話教學活動，培養年輕一代對本土語言的興趣</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Pronunciation Tab */}
          <TabsContent value="pronunciation" className="mt-6">
            <PronunciationGuide language="waitau" />
          </TabsContent>

          {/* Vocabulary Tab */}
          <TabsContent value="vocabulary" className="mt-6">
            <VocabularyList language="waitau" />
          </TabsContent>

          {/* Phrases Tab */}
          <TabsContent value="phrases" className="mt-6">
            <AudioPhrases language="waitau" />
          </TabsContent>

          {/* Culture Tab */}
          <TabsContent value="culture" className="mt-6">
            <CulturalContext language="waitau" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Resources Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">相關資源</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">探索更多關於圍頭話的學習資源和研究材料</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <Image
                  className="h-48 w-full object-cover"
                  src="/placeholder.svg?height=200&width=400"
                  alt="圍頭話教材"
                  width={400}
                  height={200}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">圍頭話入門教材</h3>
                  <p className="mt-3 text-base text-gray-500">
                    專為初學者設計的圍頭話學習教材，包含基礎發音、常用詞彙和日常對話，適合自學或課堂使用。
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
                    下載教材
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <Image
                  className="h-48 w-full object-cover"
                  src="/placeholder.svg?height=200&width=400"
                  alt="圍頭話研究論文"
                  width={400}
                  height={200}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">圍頭話研究論文集</h3>
                  <p className="mt-3 text-base text-gray-500">
                    收錄近年來關於圍頭話的學術研究成果，涵蓋語音、詞彙、語法和社會語言學等多個方面。
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
                    查看論文
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <Image
                  className="h-48 w-full object-cover"
                  src="/placeholder.svg?height=200&width=400"
                  alt="圍頭話口述歷史"
                  width={400}
                  height={200}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">圍頭話口述歷史計劃</h3>
                  <p className="mt-3 text-base text-gray-500">
                    記錄圍頭村原居民的生活故事和語言使用情況，保存珍貴的語言資料和文化記憶。
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
                    聆聽故事
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-800">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-4xl">參與圍頭話保育工作</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
              無論您是語言學者、本土語言使用者，還是對香港本土文化感興趣的人士，都歡迎加入我們的行列，共同保育圍頭話這一珍貴的語言遺產。
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-white text-red-800 hover:bg-red-50">
                <Link href="/contact">聯絡我們</Link>
              </Button>
              <Link href="/events" className="text-sm font-semibold leading-6 text-white">
                參加活動 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
