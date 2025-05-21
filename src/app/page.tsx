import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import WordOfTheDay from "@/components/home/word-of-the-day"
import LatestNews from "@/components/home/latest-news"
import LanguageShowcase from "@/components/home/language-showcase"

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-red-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <h1 className="mt-2 text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">
              保育香港本土語言
              <br />
              傳承珍貴文化遺產
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              香港本土語言保育協會致力於保育香港本土語言，包括圍頭話、客家話、汀角話及東平洲話，
              透過研究、記錄和教育活動，推廣本土語言文化，防止珍貴的語言遺產消失。
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="bg-red-800 hover:bg-red-700">了解更多</Button>
              <Link href="/languages" className="text-sm font-semibold leading-6 text-gray-900">
                瀏覽語言介紹 <span aria-hidden="true">→</span>
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

      {/* Word of the Day Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">每日一詞</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">每天學習一個本土語言詞彙，逐步認識香港獨特的語言文化</p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <WordOfTheDay />
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">最新消息</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">了解協會的最新活動和資訊</p>
          </div>
          <div className="mx-auto mt-10 max-w-7xl">
            <LatestNews />
          </div>
          <div className="mt-10 text-center">
            <Link href="/news">
              <Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
                查看更多消息
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Language Showcase */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">本土語言</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">探索香港豐富多元的本土語言</p>
          </div>
          <div className="mx-auto mt-10">
            <LanguageShowcase />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-800">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-4xl">
              加入我們，共同保育香港本土語言
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
              無論您是語言學者、本土語言使用者，還是對香港本土文化感興趣的人士，都歡迎加入我們的行列。
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-white text-red-800 hover:bg-red-50">聯絡我們</Button>
              <Link href="/languages" className="text-sm font-semibold leading-6 text-white">
                瀏覽語言介紹 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
