"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface MonthPickerProps {
	month: string | null;
	onChange: (month: string | null) => void;
}

export default function MonthPicker({ month, onChange }: MonthPickerProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useLayoutEffect(() => {
		setView("hidden");
		setSelectedYear(null);
		setYearRange([2020, 2029]);
	}, [pathname, searchParams]);

	const [view, setView] = useState<"hidden" | "years" | "months">("hidden");
	const [selectedYear, setSelectedYear] = useState<number | null>(null);
	const [yearRange, setYearRange] = useState<[number, number]>([2020, 2029]);
	const [displayValue, setDisplayValue] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Update display value when month changes
	useEffect(() => {
		if (month) {
			const [y, m] = month.split(/-0?/);
			setDisplayValue(`${y}年${m}月`);
		}
		else {
			setDisplayValue("");
		}
	}, [month]);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setView("hidden");
				setSelectedYear(null);
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
		years.push(startYear - 1);
		for (let year = startYear; year <= endYear; year++) {
			years.push(year);
		}
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
		if (selectedYear) {
			const m = String(monthIndex + 1).padStart(2, "0");
			onChange(`${selectedYear}-${m}`);
		}
		setView("hidden");
		setSelectedYear(null);
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
			setYearRange([2020, 2029]);
		}
	};

	// Clear selected month
	const clearMonth = () => {
		setView("hidden");
		onChange(null);
		setSelectedYear(null);
		setYearRange([2020, 2029]);
		setDisplayValue("");
	};

	// Navigate back to years view
	const backToYears = () => {
		setSelectedYear(null);
		setView("years");
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<div className="relative">
				<Input
					type="text"
					placeholder="選擇月份"
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
										const isSelectedYear = month && year === Number.parseInt(month.split("-")[0]!, 10);
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
									{generateMonthsGrid().map((monthLabel, index) => {
										const isSelectedMonth = month && selectedYear === Number.parseInt(month.split("-")[0]!, 10) && index + 1 === Number.parseInt(month.split("-")[1]!, 10);
										const isCurrentMonth = selectedYear === new Date().getFullYear() && index === new Date().getMonth();

										return (
											<Button
												key={index}
												variant="ghost"
												size="sm"
												className={`text-sm ${isSelectedMonth ? "bg-red-100 text-red-800" : isCurrentMonth ? "text-red-800" : ""}`}
												onClick={() => handleMonthClick(index)}>
												{monthLabel}
											</Button>
										);
									})}
								</div>
							</>
						)}

						<div className="mt-2 flex flex-row-reverse justify-between">
							<Button variant="ghost" size="sm" onClick={clearMonth}>
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
