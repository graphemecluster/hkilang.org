"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DictionarySearch from "@/components/dictionary/dictionary-search"
import DictionaryCategories from "@/components/dictionary/dictionary-categories"
import WordOfTheDay from "@/components/dictionary/word-of-the-day"

export default function DictionaryClientPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "search"
  const [activeTab, setActiveTab] = useState(initialTab)

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Create a new URLSearchParams object
    const newParams = new URLSearchParams(searchParams.toString())

    // Update the tab parameter
    newParams.set("tab", value)

    // Update the URL without refreshing the page
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  // Update active tab when URL parameters change
  useEffect(() => {
    const tab = searchParams.get("tab") || "search"
    if (tab !== activeTab) {
      setActiveTab(tab)
    }
  }, [searchParams, activeTab])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">語言字典</h1>
          <p className="mt-4 text-lg text-gray-600">探索香港本土語言的豐富詞彙，包括圍頭話、客家話、汀角話及東平洲話</p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {/* Word of the Day Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">每日一詞</h2>
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <WordOfTheDay />
            </Suspense>
          </div>

          {/* Dictionary Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="search">字詞搜尋</TabsTrigger>
              <TabsTrigger value="categories">按類別瀏覽</TabsTrigger>
            </TabsList>

            <TabsContent value="search">
              <Suspense fallback={<Skeleton className="h-12 w-full mb-6" />}>
                <DictionarySearch />
              </Suspense>
            </TabsContent>

            <TabsContent value="categories">
              <Suspense fallback={<Skeleton className="h-12 w-full mb-6" />}>
                <DictionaryCategories />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
