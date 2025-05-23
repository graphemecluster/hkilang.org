"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { formatYearMonth } from "@/lib/utils";

interface DatePickerProps {
	startDate: string | null;
	endDate: string | null;
	onChange: (startDate: Date | null, endDate: Date | null) => void;
}

export default function DatePicker({ startDate, endDate, onChange }: DatePickerProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useLayoutEffect(() => {
		setView("hidden");
		setSelectedYear(null);
		setSelectedMonth(null);
		setYearRange([2020, 2029]);
	}, [pathname, searchParams]);

	const [view, setView] = useState<"hidden" | "years" | "months">("hidden");
	const [selectedYear, setSelectedYear] = useState<number | null>(null);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
	const [yearRange, setYearRange] = useState<[number, number]>([2020, 2029]);
	const [displayValue, setDisplayValue] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Update display value when dates change
	useEffect(() => {
		if (startDate && endDate) {
			setDisplayValue(`${formatYearMonth(startDate)} – ${formatYearMonth(endDate)}`);
		}
		else if (startDate) {
			setDisplayValue(`${formatYearMonth(startDate)}之後`);
		}
		else if (endDate) {
			setDisplayValue(`${formatYearMonth(endDate)}之前`);
		}
		else {
			setDisplayValue("");
		}
	}, [startDate, endDate]);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setView("hidden");
				setSelectedYear(null);
				setSelectedMonth(null);
				setYearRange([2020, 2029]);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Generate years grid
	const generateYearsGrid = () => {
		const [startYear, endYear] = yearRange;
		const years = [];

		// Add years before current decade
		years.push(startYear - 1);

		// Add current decade
		for (let year = startYear; year <= endYear; year++) {
			years.push(year);
		}

		// Add year after current decade
		years.push(endYear + 1);

		return years;
	};

	// Generate months grid
	const generateMonthsGrid = () => {
		// return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
		return Array.from({ length: 12 }, (_, i) => i + 1 + "月");
	};

	// Handle year selection
	const handleYearClick = (year: number) => {
		setSelectedYear(year);
		setView("months");
	};

	// Handle month selection
	const handleMonthClick = (monthIndex: number) => {
		setSelectedYear(null);
		setSelectedMonth(monthIndex);

		if (selectedYear) {
			// Format date as YYYY-MM-DD
			const date = new Date(Date.UTC(selectedYear, monthIndex, 1));

			// Set as either start or end date based on current selection
			if (!startDate || (startDate && endDate)) {
				onChange(date, null);
			}
			else {
				// If the selected date is before the start date, swap them
				const oldStartDate = new Date(startDate);
				const newEndDate = date;
				if (newEndDate < oldStartDate) {
					onChange(newEndDate, new Date(Date.UTC(oldStartDate.getFullYear(), oldStartDate.getMonth() + 1, 0)));
				}
				else {
					onChange(new Date(Date.UTC(oldStartDate.getFullYear(), oldStartDate.getMonth(), 1)), new Date(Date.UTC(selectedYear, monthIndex + 1, 0)));
				}
			}
		}

		setView("hidden");
	};

	// Navigate to previous decade
	const prevDecade = () => {
		setYearRange([yearRange[0] - 10, yearRange[1] - 10]);
	};

	// Navigate to next decade
	const nextDecade = () => {
		setYearRange([yearRange[0] + 10, yearRange[1] + 10]);
	};

	// Navigate to previous year
	const prevYear = () => {
		if (selectedYear) setSelectedYear(selectedYear - 1);
	};

	// Navigate to next year
	const nextYear = () => {
		if (selectedYear) setSelectedYear(selectedYear + 1);
	};

	// Toggle view visibility
	const toggleView = () => {
		if (view === "hidden") setView("years");
		else {
			setView("hidden");
			setSelectedYear(null);
			setSelectedMonth(null);
			setYearRange([2020, 2029]);
		}
	};

	// Clear selected dates
	const clearDates = () => {
		setView("hidden");
		onChange(null, null);
		setSelectedYear(null);
		setSelectedMonth(null);
		setYearRange([2020, 2029]);
		setDisplayValue("");
	};

	// Navigate back to years view
	const backToYears = () => {
		setSelectedYear(null);
		setSelectedMonth(null);
		setView("years");
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<div className="relative">
				<Input
					type="text"
					placeholder="選擇日期範圍"
					value={displayValue}
					readOnly
					onClick={toggleView}
					className="cursor-pointer pr-10" />
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-0 top-0 h-full"
					onClick={toggleView}>
					<Calendar className="h-5 w-5 text-gray-400" />
				</Button>
			</div>

			{view !== "hidden" && (
				<div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
					<div className="p-2">
						{view === "years" && (
							<>
								<div className="flex items-center justify-between mb-2">
									<Button variant="ghost" size="sm" onClick={prevDecade} disabled={yearRange[0] < 2010}>
										<ChevronLeft className="!h-5 !w-5" />
									</Button>
									<div className="text-sm font-medium">
										{yearRange[0]} – {yearRange[1]}
									</div>
									<Button variant="ghost" size="sm" onClick={nextDecade} disabled={yearRange[1] > 2039}>
										<ChevronRight className="!h-5 !w-5" />
									</Button>
								</div>
								<div className="grid grid-cols-4 gap-1">
									{generateYearsGrid().map(year => {
										const isSelectedYear = startDate && !endDate && year === new Date(startDate).getFullYear();
										const isCurrentYear = year === new Date().getFullYear();

										return (
											<Button
												key={year}
												variant="ghost"
												size="sm"
												className={`text-sm ${isSelectedYear ? "bg-red-100 text-red-800" : isCurrentYear ? "text-red-800" : ""}`}
												onClick={() => handleYearClick(year)}>
												{year}
											</Button>
										);
									})}
								</div>
							</>
						)}

						{view === "months" && selectedYear && (
							<>
								<div className="flex items-center justify-between mb-2">
									<Button variant="ghost" size="sm" onClick={prevYear} disabled={selectedYear < 2000}>
										<ChevronLeft className="!h-5 !w-5" />
									</Button>
									<div className="text-sm font-medium">{selectedYear}年</div>
									<Button variant="ghost" size="sm" onClick={nextYear} disabled={selectedYear > 2049}>
										<ChevronRight className="!h-5 !w-5" />
									</Button>
								</div>
								<div className="grid grid-cols-4 gap-1">
									{generateMonthsGrid().map((month, index) => {
										const isSelectedMonth = startDate && !endDate && selectedYear === new Date(startDate).getFullYear() && index === new Date(startDate).getMonth();
										const isCurrentMonth = selectedYear === new Date().getFullYear() && index === new Date().getMonth();

										return (
											<Button
												key={index}
												variant="ghost"
												size="sm"
												className={`text-sm ${isSelectedMonth ? "bg-red-100 text-red-800" : isCurrentMonth ? "text-red-800" : ""}`}
												onClick={() => handleMonthClick(index)}>
												{month}
											</Button>
										);
									})}
								</div>
							</>
						)}

						<div className="mt-2 flex flex-row-reverse justify-between">
							<Button variant="ghost" size="sm" onClick={clearDates}>
								清除
							</Button>
							{view === "months" && selectedYear && <Button variant="ghost" size="sm" onClick={backToYears}>
								返回年份
							</Button>}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
