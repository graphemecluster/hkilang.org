"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import NewsFilters from "@/components/news/news-filters";
import NewsList from "@/components/news/news-list";
import Pagination from "@/components/pagination";
import { getNewsArticles, getAllTags, getNewsCategories } from "@/lib/strapi";
import { Search, X } from "lucide-react";
import DatePicker from "./date-picker";
// import CategoryFilter from "./category-filter";

import type { Data } from "@strapi/strapi";

interface NewsPageContentProps {
	initialQuery?: string;
	initialPage?: number;
	initialTags?: string[];
	initialStartDate?: string | null;
	initialEndDate?: string | null;
	initialCategory?: string | null;
}

export default function NewsPageContent({
	initialQuery = "",
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

	const [searchTerm, setSearchTerm] = useState(initialQuery);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery);
	const [page, setPage] = useState(initialPage);
	const [tags, setTags] = useState<string[]>(initialTags);
	const [startDate, setStartDate] = useState<string | null>(initialStartDate);
	const [endDate, setEndDate] = useState<string | null>(initialEndDate);
	const [category, setCategory] = useState<string | null>(initialCategory);

	const [articles, setArticles] = useState<Data.ContentType<"api::article.article">[]>([]);
	const [totalArticles, setTotalArticles] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [allTags, setAllTags] = useState<Pick<Data.ContentType<"api::tag.tag">, "slug" | "name">[]>([]);
	const [categories, setCategories] = useState<Pick<Data.ContentType<"api::category.category">, "slug" | "name">[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const PAGE_SIZE = 9;

	// Create a function to update URL query parameters
	const createQueryString = useCallback((params: Record<string, string | string[] | number | null | undefined>) => {
		const newSearchParams = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value === null || value === undefined || value === "") {
				newSearchParams.delete(key);
			}
			else if (Array.isArray(value)) {
				newSearchParams.delete(key);
				for (const val of value) {
					if (val) newSearchParams.append(key, val);
				}
			}
			else {
				newSearchParams.set(key, String(value));
			}
		});

		return newSearchParams.toString();
	}, []);

	// Update URL and fetch data
	const updateFilters = useCallback((newFilters: { query: string; page: number; tags: string[]; startDate: string | null; endDate: string | null; category: string | null }) => {
		startTransition(() => {
			const queryString = createQueryString({
				query: newFilters.query,
				category: newFilters.category,
				tags: newFilters.tags?.length ? newFilters.tags : null,
				startDate: newFilters.startDate,
				endDate: newFilters.endDate,
				page: newFilters.page === 1 ? null : newFilters.page,
			});
			router.push(`${pathname}${queryString && "?"}${queryString}`, { scroll: false });
		});
	}, [createQueryString, pathname, router]);

	useEffect(() => {
		setSearchTerm(searchParams.get("query") || "");
		setPage(searchParams.get("page") ? Number.parseInt(searchParams.get("page")!, 10) : 1);
		const newTags = searchParams.getAll("tags").sort();
		if (newTags.length !== tags.length || tags.some((tag, i) => tag !== newTags[i])) setTags(newTags);
		setStartDate(searchParams.get("startDate"));
		setEndDate(searchParams.get("endDate"));
		setCategory(searchParams.get("category"));
	}, [searchParams]);

	// Debounce search term
	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
			if (searchTerm !== debouncedSearchTerm) {
				setPage(1); // Reset to first page when search term changes
			}
		}, 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [searchTerm, debouncedSearchTerm]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		setPage(1);
		updateFilters({ query: value, page: 1, tags, startDate, endDate, category });
	};

	const handleTagSelect = (tagId: string) => {
		const newTags = tags.includes(tagId) ? tags.filter(id => id !== tagId) : [...tags, tagId].sort();
		setTags(newTags);
		setPage(1);
		updateFilters({ query: debouncedSearchTerm, page: 1, tags: newTags, startDate, endDate, category });
	};

	const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
		const newStartDate = startDate?.toISOString().split("T")[0]!;
		const newEndDate = endDate?.toISOString().split("T")[0]!;
		setStartDate(newStartDate);
		setEndDate(newEndDate);
		setPage(1);
		updateFilters({ query: debouncedSearchTerm, page: 1, tags, startDate: newStartDate, endDate: newEndDate, category });
	};

	const handleCategoryChange = (newCategory: string) => {
		setCategory(newCategory);
		setPage(1);
		updateFilters({ query: debouncedSearchTerm, page: 1, tags, startDate, endDate, category: newCategory });
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		updateFilters({ query: debouncedSearchTerm, page: newPage, tags, startDate, endDate, category });
		document.querySelector("input")?.scrollIntoView({ behavior: "smooth" });
	};

	const clearAllFilters = () => {
		setSearchTerm("");
		setDebouncedSearchTerm("");
		setTags([]);
		setStartDate(null);
		setEndDate(null);
		setCategory(null);
		setPage(1);
		updateFilters({ query: "", page: 1, tags: [], startDate: null, endDate: null, category: null });
	};

	const fetchArticles = useCallback(async () => {
		setIsLoading(true);
		try {
			const dateFilters: { $gte?: string; $lte?: string } = {};
			if (startDate) {
				dateFilters.$gte = startDate;
			}
			if (endDate) {
				dateFilters.$lte = endDate;
			}

			const categoryFilter = category ? { slug: { $eq: category } } : undefined;

			const response = await getNewsArticles({
				page,
				pageSize: PAGE_SIZE,
				search: debouncedSearchTerm.trim(),
				tags,
				filters: {
					...(Object.keys(dateFilters).length > 0 ? { publishDate: dateFilters } : {}),
					...(categoryFilter ? { category: categoryFilter } : {}),
				},
			});

			setArticles(response.data);
			setTotalArticles(response.meta.pagination.total);
			setPageCount(response.meta.pagination.pageCount);
		}
		catch (error) {
			console.error("Failed to fetch articles:", error);
		}
		finally {
			setIsLoading(false);
		}
	}, [page, debouncedSearchTerm, tags, startDate, endDate, category]);

	const fetchTags = useCallback(async () => {
		try {
			const response = await getAllTags();
			setAllTags(response.data);
		}
		catch (error) {
			console.error("Failed to fetch tags:", error);
		}
	}, []);

	const fetchCategories = useCallback(async () => {
		try {
			const response = await getNewsCategories();
			setCategories([{ slug: null, name: "全部" }, ...response.data]);
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
		// fetchCategories();
	}, [fetchTags, fetchCategories]);

	// Check if any filters are applied
	const hasActiveFilters = searchTerm || tags.length > 0 || startDate || endDate || category;

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
							value={searchTerm}
							onChange={e => handleSearch(e.target.value)}
							className="pl-3 pr-10 py-2" />
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-0 top-0 h-full"
							onClick={fetchArticles}
							disabled={!searchTerm}>
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
			{
				/* <div className="mb-8">
					<CategoryFilter categories={categories} selectedCategory={category} onChange={handleCategoryChange} />
				</div> */
			}

			{/* Tag Filters */}
			<div className="mb-8">
				<div className="relative mb-4">
					<h2 className="text-lg font-medium text-gray-900">標籤過濾</h2>
					{hasActiveFilters && (
						<Button variant="ghost" size="sm" onClick={clearAllFilters} className="absolute top-0 right-0 text-gray-500 hover:text-red-800">
							清除所有過濾條件
							<X className="ml-1 h-4 w-4" />
						</Button>
					)}
				</div>
				<NewsFilters allTags={allTags} selectedTags={tags} onTagSelect={handleTagSelect} />
			</div>

			{/* Result count */}
			<div className="mb-6 text-sm text-gray-500">
				{isLoading
					? <Skeleton className="h-5 w-32" />
					: totalArticles
					? `顯示第 ${(page - 1) * PAGE_SIZE + 1}${page * PAGE_SIZE === totalArticles ? "" : ` ~ ${Math.min(page * PAGE_SIZE, totalArticles)}`} 項，共 ${totalArticles} 項`
					: undefined}
			</div>

			{/* Article list */}
			<NewsList articles={articles} isLoading={isLoading} />

			{/* Pagination */}
			{pageCount > 1 && (
				<div className="mt-10">
					<Pagination
						currentPage={page}
						totalPages={pageCount}
						onPageChange={handlePageChange}
						isLoading={isPending} />
				</div>
			)}
		</div>
	);
}
