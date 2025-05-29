"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import NewsList from "@/components/news/news-list";
import Pagination from "@/components/pagination";
import { getAllTags, getNewsArticles } from "@/lib/strapi";
import { Search } from "lucide-react";
import DatePicker from "./date-picker";
import TagFilter from "./tag-filter";

import type { Data } from "@strapi/strapi";

interface NewsPageContentProps {
	initialQuery?: string;
	initialPage?: number;
	initialTag?: string | null;
	initialStartDate?: string | null;
	initialEndDate?: string | null;
}

export default function NewsPageContent({
	initialQuery = "",
	initialPage = 1,
	initialTag = null,
	initialStartDate = null,
	initialEndDate = null,
}: NewsPageContentProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [searchTerm, setSearchTerm] = useState(initialQuery);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery);
	const [page, setPage] = useState(initialPage);
	const [tag, setTag] = useState<string | null>(initialTag);
	const [startDate, setStartDate] = useState<string | null>(initialStartDate);
	const [endDate, setEndDate] = useState<string | null>(initialEndDate);

	const [articles, setArticles] = useState<Data.ContentType<"api::article.article">[]>([]);
	const [totalArticles, setTotalArticles] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [tags, setTags] = useState<Pick<Data.ContentType<"api::tag.tag">, "slug" | "name">[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const PAGE_SIZE = 9;

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

	const updateFilters = useCallback((newFilters: { query: string; page: number; startDate: string | null; endDate: string | null; tag: string | null }) => {
		startTransition(() => {
			const queryString = createQueryString({
				query: newFilters.query,
				tag: newFilters.tag,
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
		setTag(searchParams.get("tag"));
		setStartDate(searchParams.get("startDate"));
		setEndDate(searchParams.get("endDate"));
	}, [searchParams]);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
			if (searchTerm !== debouncedSearchTerm) {
				setPage(1);
			}
		}, 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [searchTerm, debouncedSearchTerm]);

	const handleSearch = (value: string) => {
		setSearchTerm(value);
		setPage(1);
		updateFilters({ query: value, page: 1, tag, startDate, endDate });
	};

	const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
		const newStartDate = startDate?.toISOString().split("T")[0]!;
		const newEndDate = endDate?.toISOString().split("T")[0]!;
		setStartDate(newStartDate);
		setEndDate(newEndDate);
		setPage(1);
		updateFilters({ query: debouncedSearchTerm, page: 1, tag, startDate: newStartDate, endDate: newEndDate });
	};

	const handleTagChange = (newTag: string | null) => {
		setTag(newTag);
		setPage(1);
		updateFilters({ query: debouncedSearchTerm, page: 1, tag: newTag, startDate, endDate });
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		updateFilters({ query: debouncedSearchTerm, page: newPage, tag, startDate, endDate });
		document.querySelector("input")?.scrollIntoView({ behavior: "smooth" });
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

			const tagFilter = tag ? { slug: { $eq: tag } } : undefined;

			const response = await getNewsArticles({
				page,
				pageSize: PAGE_SIZE,
				search: debouncedSearchTerm.trim(),
				filters: {
					...(Object.keys(dateFilters).length > 0 ? { publishDate: dateFilters } : {}),
					...(tagFilter ? { tag: tagFilter } : {}),
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
	}, [page, debouncedSearchTerm, tag, startDate, endDate]);

	const fetchTags = useCallback(async () => {
		try {
			const response = await getAllTags();
			setTags([{ slug: null, name: "全部" }, ...response.data]);
		}
		catch (error) {
			console.error("Failed to fetch categories:", error);
		}
	}, []);

	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	useEffect(() => {
		fetchTags();
	}, [fetchTags]);

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

			{/* Tag Filter */}
			<div className="mb-8">
				<TagFilter tags={tags} selectedTag={tag} onChange={handleTagChange} />
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
