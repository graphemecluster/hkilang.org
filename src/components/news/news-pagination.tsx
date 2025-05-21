"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewsPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export default function NewsPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: NewsPaginationProps) {
  // Generate page number array
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to max pages to show, display all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Otherwise, display page numbers around the current page
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
      let endPage = startPage + maxPagesToShow - 1

      if (endPage > totalPages) {
        endPage = totalPages
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
      }

      // Add first page
      if (startPage > 1) {
        pageNumbers.push(1)
        if (startPage > 2) {
          pageNumbers.push("...")
        }
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...")
        }
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-center">
      <ul className="flex items-center -space-x-px">
        <li>
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-md"
            disabled={currentPage === 1 || isLoading}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span className="sr-only">Previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 border border-gray-300 bg-white text-gray-500">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                className={`rounded-none ${currentPage === page ? "bg-red-800 hover:bg-red-700" : ""}`}
                disabled={isLoading}
                onClick={() => typeof page === "number" && onPageChange(page)}
              >
                {page}
              </Button>
            )}
          </li>
        ))}
        <li>
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-md"
            disabled={currentPage === totalPages || isLoading}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="sr-only">Next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
