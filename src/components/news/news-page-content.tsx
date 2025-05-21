"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import NewsFilters from "@/components/news/news-filters";
import NewsList from "@/components/news/news-list";
import NewsPagination from "@/components/news/news-pagination";
import { getNewsArticles, getAllTags, getNewsCategories } from "@/lib/strapi";
import { Search, X } from "lucide-react";
import DatePicker from "./date-picker";
import CategoryFilter from "./category-filter";

interface NewsPageContentProps {
	initialSearch?: string;
	initialPage?: number;
	initialTags?: string[];
	initialStartDate?: string | null;
	initialEndDate?: string | null;
	initialCategory?: string | null;
}

export default function NewsPageContent({
	initialSearch = "",
	initialPage = 1,
	initialTags = [],
	initialStartDate = null,
	initialEndDate = null,
	initialCategory = null,
}: NewsPageContentProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [search, setSearch] = useState(initialSearch);
	const [page, setPage] = useState(initialPage);
	const [tags, setTags] = useState<string[]>(initialTags);
	const [startDate, setStartDate] = useState<string | null>(initialStartDate);
	const [endDate, setEndDate] = useState<string | null>(initialEndDate);
	const [category, setCategory] = useState<string | null>(initialCategory);

	const [articles, setArticles] = useState<any[]>([]);
	const [totalArticles, setTotalArticles] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [allTags, setAllTags] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const PAGE_SIZE = 9;

	// Create a function to update URL query parameters
	const createQueryString = useCallback(
		(params: Record<string, string | string[] | number | null | undefined>) => {
			const newSearchParams = new URLSearchParams(searchParams.toString());

			Object.entries(params).forEach(([key, value]) => {
				if (value === null || value === undefined || value === "") {
					newSearchParams.delete(key);
				}
				else if (Array.isArray(value)) {
					newSearchParams.delete(key);
					value.forEach(val => {
						if (val) newSearchParams.append(key, val);
					});
				}
				else {
					newSearchParams.set(key, String(value));
				}
			});

			return newSearchParams.toString();
		},
		[searchParams],
	);

	// Update URL and fetch data
	const updateFilters = useCallback(
		(newFilters: Record<string, any>) => {
			startTransition(() => {
				const queryString = createQueryString({
					search: newFilters.search,
					page: newFilters.page === 1 ? null : newFilters.page,
					tags: newFilters.tags?.length ? newFilters.tags : null,
					startDate: newFilters.startDate,
					endDate: newFilters.endDate,
					category: newFilters.category,
				});

				router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
			});
		},
		[pathname, router, createQueryString],
	);

	// Handle search
	const handleSearch = (value: string) => {
		setSearch(value);
		setPage(1);
		updateFilters({ search: value, page: 1, tags, startDate, endDate, category });
	};

	// Handle tag selection
	const handleTagSelect = (tagId: string) => {
		const newTags = tags.includes(tagId) ? tags.filter(id => id !== tagId) : [...tags, tagId];

		setTags(newTags);
		setPage(1);
		updateFilters({ search, page: 1, tags: newTags, startDate, endDate, category });
	};

	// Handle date range selection
	const handleDateChange = (newStartDate: string | null, newEndDate: string | null) => {
		setStartDate(newStartDate);
		setEndDate(newEndDate);
		setPage(1);
		updateFilters({ search, page: 1, tags, startDate: newStartDate, endDate: newEndDate, category });
	};

	// Handle category selection
	const handleCategoryChange = (newCategory: string | null) => {
		setCategory(newCategory);
		setPage(1);
		updateFilters({ search, page: 1, tags, startDate, endDate, category: newCategory });
	};

	// Handle pagination
	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		updateFilters({ search, page: newPage, tags, startDate, endDate, category });
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// Clear all filters
	const clearAllFilters = () => {
		setSearch("");
		setTags([]);
		setStartDate(null);
		setEndDate(null);
		setCategory(null);
		setPage(1);
		updateFilters({ search: "", page: 1, tags: [], startDate: null, endDate: null, category: null });
	};

	// Fetch articles data
	const fetchArticles = useCallback(async () => {
		setIsLoading(true);
		try {
			// Build date filters
			const dateFilters: any = {};
			if (startDate) {
				dateFilters.$gte = startDate;
			}
			if (endDate) {
				dateFilters.$lte = endDate;
			}

			// Build category filter
			const categoryFilter = category ? { slug: { $eq: category } } : undefined;

			const response = await getNewsArticles({
				page,
				pageSize: PAGE_SIZE,
				search,
				tags,
				filters: {
					...(Object.keys(dateFilters).length > 0 ? { publishDate: dateFilters } : {}),
					...(categoryFilter ? { category: categoryFilter } : {}),
				},
			});

			setArticles(response.data || []);
			setTotalArticles(response.meta.pagination.total);
			setPageCount(response.meta.pagination.pageCount);
		}
		catch (error) {
			console.error("Failed to fetch articles:", error);
		}
		finally {
			setIsLoading(false);
		}
	}, [page, search, tags, startDate, endDate, category]);

	// Fetch all tags
	const fetchTags = useCallback(async () => {
		try {
			const response = await getAllTags();
			setAllTags(response.data || []);
		}
		catch (error) {
			console.error("Failed to fetch tags:", error);
		}
	}, []);

	// Fetch categories
	const fetchCategories = useCallback(async () => {
		try {
			const response = await getNewsCategories();
			setCategories([{ id: "all", name: "全部" }, ...response.data]);
		}
		catch (error) {
			console.error("Failed to fetch categories:", error);
		}
	}, []);

	// Initialize data
	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	useEffect(() => {
		fetchTags();
		fetchCategories();
	}, [fetchTags, fetchCategories]);

	// Check if any filters are applied
	const hasActiveFilters = search || tags.length > 0 || startDate || endDate || category;

	return (
		<div className="mt-12">
			{/* Search and Date Range */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
				<div>
					<h3 className="text-sm font-medium text-gray-700 mb-2">關鍵字</h3>
					<div className="relative">
						<Input
							type="search"
							placeholder="請輸入關鍵字"
							value={search}
							onChange={e => handleSearch(e.target.value)}
							className="pl-3 pr-10 py-2" />
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-0 top-0 h-full"
							onClick={() => handleSearch("")}
							disabled={!search}>
							<Search className="h-5 w-5 text-gray-400" />
						</Button>
					</div>
				</div>
				<div>
					<h3 className="text-sm font-medium text-gray-700 mb-2">日期區間</h3>
					<DatePicker startDate={startDate} endDate={endDate} onChange={handleDateChange} />
				</div>
			</div>

			{/* Category Filter */}
			<div className="mb-8">
				<CategoryFilter categories={categories} selectedCategory={category} onChange={handleCategoryChange} />
			</div>

			{/* Tag Filters */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-medium text-gray-900">標籤過濾</h2>
					{hasActiveFilters && (
						<Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-500 hover:text-red-800">
							清除所有過濾條件
							<X className="ml-1 h-4 w-4" />
						</Button>
					)}
				</div>
				<NewsFilters allTags={allTags} selectedTags={tags} onTagSelect={handleTagSelect} />
			</div>

			{/* Result count */}
			<div className="mb-6 text-sm text-gray-500">
				{isLoading ? <Skeleton className="h-5 w-32" /> : `找到 ${totalArticles} 篇文章`}
			</div>

			{/* Article list */}
			<NewsList articles={articles} isLoading={isLoading} />

			{/* Pagination */}
			{pageCount > 1 && (
				<div className="mt-10">
					<NewsPagination
						currentPage={page}
						totalPages={pageCount}
						onPageChange={handlePageChange}
						isLoading={isPending} />
				</div>
			)}
		</div>
	);
}
