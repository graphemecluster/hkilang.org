"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleList from "./article-list";
import Pagination from "@/components/pagination";
import { getAllTags, getNewsArticles } from "@/lib/strapi";
import { Search } from "lucide-react";
import MonthPicker from "./month-picker";
import TagFilter from "./tag-filter";

import type { Data } from "@strapi/strapi";

interface NewsPageContentProps {
	initialQuery?: string;
	initialPage?: number;
	initialTag?: string | null;
	initialMonth?: string | null;
}

export default function PageContent({
	initialQuery = "",
	initialPage = 1,
	initialTag = null,
	initialMonth = null,
}: NewsPageContentProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [searchTerm, setSearchTerm] = useState(initialQuery);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery);
	const [page, setPage] = useState(initialPage);
	const [tag, setTag] = useState<string | null>(initialTag);
	const [month, setMonth] = useState<string | null>(initialMonth);

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

	const updateFilters = useCallback((newFilters: { query: string; page: number; month: string | null; tag: string | null }) => {
		startTransition(() => {
			const queryString = createQueryString({
				query: newFilters.query,
				tag: newFilters.tag,
				month: newFilters.month,
				page: newFilters.page === 1 ? null : newFilters.page,
			});
			router.push(`${pathname}${queryString && "?"}${queryString}`, { scroll: false });
		});
	}, [createQueryString, pathname, router]);

	useEffect(() => {
		setSearchTerm(searchParams.get("query") || "");
		setPage(searchParams.get("page") ? Number.parseInt(searchParams.get("page")!, 10) : 1);
		setTag(searchParams.get("tag"));
		setMonth(searchParams.get("month"));
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
		updateFilters({ query: value, page: 1, tag, month });
	};

	const handleMonthChange = (selectedMonth: string | null) => {
		setMonth(selectedMonth);
		setPage(1);
		updateFilters({ query: debouncedSearchTerm, page: 1, tag, month: selectedMonth });
	};

	const handleTagChange = (newTag: string | null) => {
		setTag(newTag);
		setPage(1);
		updateFilters({ query: debouncedSearchTerm, page: 1, tag: newTag, month });
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		updateFilters({ query: debouncedSearchTerm, page: newPage, tag, month });
		document.querySelector("input")?.scrollIntoView({ behavior: "smooth" });
	};

	const fetchArticles = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await getNewsArticles({
				page,
				pageSize: PAGE_SIZE,
				search: debouncedSearchTerm.trim(),
				tag,
				month,
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
	}, [page, debouncedSearchTerm, tag, month]);

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
			{/* Search and Month Picker */}
			<div className="flex flex-col sm:flex-row items-stretch justify-stretch gap-4 mb-8">
				<div className="sm:flex-1">
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
				<div className="sm:basis-[calc(5rem+30%)]">
					<h3 className="text-sm font-medium text-gray-700 mb-2">月份</h3>
					<MonthPicker month={month} onChange={handleMonthChange} />
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
			<ArticleList articles={articles} isLoading={isLoading} />

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
