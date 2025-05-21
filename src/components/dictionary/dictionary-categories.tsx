"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft } from "lucide-react"
import { getLexicalDomains, getLexicalItemsByDomain } from "@/lib/strapi"
import DictionaryWordResult from "./dictionary-word-result"
import NewsPagination from "@/components/news/news-pagination"

export default function DictionaryCategories() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get initial values from URL parameters
  const initialCategoryId = searchParams.get("category") || ""
  const initialPage = searchParams.get("page") ? Number.parseInt(searchParams.get("page") as string, 10) : 1

  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId)
  const [selectedCategoryName, setSelectedCategoryName] = useState("")
  const [wordResults, setWordResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const PAGE_SIZE = 10

  // Create a function to update URL query parameters
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      })

      // Always preserve the tab parameter
      newSearchParams.set("tab", "categories")

      return newSearchParams.toString()
    },
    [searchParams],
  )

  // Update URL when category or page changes
  useEffect(() => {
    const queryString = createQueryString({
      category: selectedCategoryId || null,
      page: currentPage === 1 ? null : currentPage,
    })
    router.push(`${pathname}?${queryString}`, { scroll: false })
  }, [selectedCategoryId, currentPage, createQueryString, pathname, router])

  // Fetch all categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getLexicalDomains()
        setCategories(response.data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        if (!selectedCategoryId) {
          setIsLoading(false)
        }
      }
    }

    fetchCategories()
  }, [])

  // Fetch words by category
  useEffect(() => {
    async function fetchWordsByCategory() {
      if (!selectedCategoryId) return

      setIsLoading(true)
      try {
        const response = await getLexicalItemsByDomain(Number.parseInt(selectedCategoryId, 10))

        // Find the selected category name
        const category = categories.find((cat) => cat.id.toString() === selectedCategoryId)
        if (category) {
          setSelectedCategoryName(category.zhName || category.enName || "")
        }

        // Get all words
        const allWords = response.data || []
        setTotalResults(allWords.length)

        // Calculate total pages
        const calculatedTotalPages = Math.ceil(allWords.length / PAGE_SIZE)
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1)

        // Paginate the results
        const startIndex = (currentPage - 1) * PAGE_SIZE
        const endIndex = startIndex + PAGE_SIZE
        setWordResults(allWords.slice(startIndex, endIndex))
      } catch (error) {
        console.error("Error fetching words by category:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWordsByCategory()
  }, [selectedCategoryId, categories, currentPage])

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setCurrentPage(1) // Reset to first page when changing category
  }

  // Handle back button click
  const handleBackClick = () => {
    setSelectedCategoryId("")
    setCurrentPage(1)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Show category list if no category is selected
  if (!selectedCategoryId) {
    return (
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">按類別瀏覽</h3>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCategorySelect(category.id.toString())}
              >
                <CardContent className="p-4">
                  <h4 className="text-lg font-medium text-gray-900">{category.zhName || category.enName}</h4>
                  {category.enName && category.zhName && <p className="text-sm text-gray-500">{category.enName}</p>}
                  <p className="text-sm text-gray-500 mt-2">{category.items?.data?.length || 0} 個詞條</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Show words in the selected category
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBackClick} className="mr-2">
          <ChevronLeft className="h-4 w-4 mr-1" />
          返回類別列表
        </Button>
        <h3 className="text-lg font-medium text-gray-900">
          類別：{selectedCategoryName}
          {totalResults > 0 && <span className="text-gray-500 text-sm ml-2">（共 {totalResults} 項）</span>}
        </h3>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <div className="space-y-6">
          {wordResults.length > 0 ? (
            <>
              <div className="space-y-4">
                {wordResults.map((word) => (
                  <DictionaryWordResult key={word.id} word={word} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <NewsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">此類別中沒有詞條。</CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
