"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface DatePickerProps {
  startDate: string | null
  endDate: string | null
  onChange: (startDate: string | null, endDate: string | null) => void
}

export default function DatePicker({ startDate, endDate, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<"years" | "months">("years")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [yearRange, setYearRange] = useState<[number, number]>([2020, 2029])
  const [displayValue, setDisplayValue] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Update display value when dates change
  useEffect(() => {
    if (startDate && endDate) {
      setDisplayValue(`${startDate} - ${endDate}`)
    } else if (startDate) {
      setDisplayValue(`${startDate} 之後`)
    } else if (endDate) {
      setDisplayValue(`${endDate} 之前`)
    } else {
      setDisplayValue("")
    }
  }, [startDate, endDate])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Generate years grid
  const generateYearsGrid = () => {
    const [startYear, endYear] = yearRange
    const years = []
    const currentYear = new Date().getFullYear()

    // Add years before current decade
    years.push(startYear - 1)

    // Add current decade
    for (let year = startYear; year <= endYear; year++) {
      years.push(year)
    }

    // Add year after current decade
    years.push(endYear + 1)

    return years
  }

  // Generate months grid
  const generateMonthsGrid = () => {
    const months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    return months
  }

  // Handle year selection
  const handleYearClick = (year: number) => {
    setSelectedYear(year)
    setView("months")
  }

  // Handle month selection
  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex)

    if (selectedYear) {
      // Format date as YYYY-MM-DD
      const date = `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-01`

      // Set as either start or end date based on current selection
      if (!startDate || (startDate && endDate)) {
        onChange(date, null)
      } else {
        // If the selected date is before the start date, swap them
        const newEndDate = date
        if (new Date(newEndDate) < new Date(startDate)) {
          onChange(newEndDate, startDate)
        } else {
          onChange(startDate, newEndDate)
        }
      }
    }

    setIsOpen(false)
    setView("years")
  }

  // Navigate to previous decade
  const prevDecade = () => {
    setYearRange([yearRange[0] - 10, yearRange[1] - 10])
  }

  // Navigate to next decade
  const nextDecade = () => {
    setYearRange([yearRange[0] + 10, yearRange[1] + 10])
  }

  // Navigate to previous year
  const prevYear = () => {
    if (selectedYear) setSelectedYear(selectedYear - 1)
  }

  // Navigate to next year
  const nextYear = () => {
    if (selectedYear) setSelectedYear(selectedYear + 1)
  }

  // Clear selected dates
  const clearDates = () => {
    onChange(null, null)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Input
          type="text"
          placeholder="選擇日期範圍"
          value={displayValue}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer pr-10"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Calendar className="h-5 w-5 text-gray-400" />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            {view === "years" && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <Button variant="ghost" size="sm" onClick={prevDecade}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium">
                    {yearRange[0]} - {yearRange[1]}
                  </div>
                  <Button variant="ghost" size="sm" onClick={nextDecade}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {generateYearsGrid().map((year) => (
                    <Button
                      key={year}
                      variant="ghost"
                      size="sm"
                      className={`text-sm ${year === selectedYear ? "bg-red-100 text-red-800" : ""}`}
                      onClick={() => handleYearClick(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {view === "months" && selectedYear && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <Button variant="ghost" size="sm" onClick={prevYear}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium">{selectedYear}</div>
                  <Button variant="ghost" size="sm" onClick={nextYear}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {generateMonthsGrid().map((month, index) => {
                    const isCurrentMonth = selectedYear === new Date().getFullYear() && index === new Date().getMonth()

                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className={`text-sm ${isCurrentMonth ? "text-red-800" : ""}`}
                        onClick={() => handleMonthClick(index)}
                      >
                        {month}
                      </Button>
                    )
                  })}
                </div>
              </>
            )}

            <div className="mt-2 flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setView("years")}>
                返回年份
              </Button>
              <Button variant="ghost" size="sm" onClick={clearDates}>
                清除
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
