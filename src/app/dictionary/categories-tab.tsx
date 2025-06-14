"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { getLexicalDomains, getLexicalItemsByDomain } from "@/lib/strapi";
import WordResult from "./word-result";
import Pagination from "@/components/pagination";

import type { Data } from "@strapi/strapi";

export default function CategoriesTab() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Get initial values from URL parameters
	const initialCategory = searchParams.get("category") || "";
	const initialPage = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!, 10) : 1;

	const [categories, setCategories] = useState<Data.ContentType<"api::surveyed-lexical-domain.surveyed-lexical-domain">[]>([]);
	const [selectedCategory, setSelectedCategory] = useState(initialCategory);
	const [selectedCategoryName, setSelectedCategoryName] = useState("");
	const [wordResults, setWordResults] = useState<Data.ContentType<"api::lexical-item.lexical-item">[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	const PAGE_SIZE = 10;

	// Create a function to update URL query parameters
	const createQueryString = useCallback((params: Record<string, string | number | null>) => {
		const newSearchParams = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value === null) {
				newSearchParams.delete(key);
			}
			else {
				newSearchParams.set(key, String(value));
			}
		});

		return newSearchParams.toString();
	}, []);

	// Update URL when category or page changes
	useEffect(() => {
		const queryString = createQueryString({
			tab: selectedCategory ? null : "categories",
			category: selectedCategory || null,
			page: selectedCategory && currentPage > 1 ? currentPage : null,
			// query: null,
		});
		router.push(`${pathname}${queryString && "?"}${queryString}`, { scroll: false });
	}, [selectedCategory, currentPage, createQueryString, pathname, router]);

	useEffect(() => {
		setSelectedCategory(searchParams.get("category") || "");
		setCurrentPage(searchParams.get("page") ? Number.parseInt(searchParams.get("page")!, 10) : 1);
	}, [searchParams]);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await getLexicalDomains();
				setCategories(response.data);
			}
			catch (error) {
				console.error("Error fetching categories:", error);
			}
			finally {
				if (!selectedCategory) {
					setIsLoading(false);
				}
			}
		}

		fetchCategories();
	}, []);

	useEffect(() => {
		async function fetchWordsByCategory() {
			if (!selectedCategory) return;

			setIsLoading(true);
			try {
				const response = await getLexicalItemsByDomain(selectedCategory, currentPage, PAGE_SIZE);

				// Find the selected category name
				const category = categories.find(({ slug }) => slug === selectedCategory);
				if (category) {
					setSelectedCategoryName(category.zhName || category.enName || "");
				}

				// Get all words
				const allWords = response.data;
				setWordResults(allWords);
				setTotalResults(response.meta?.pagination?.total || 0);
				setTotalPages(response.meta?.pagination?.pageCount || 0);
			}
			catch (error) {
				console.error("Error fetching words by category:", error);
			}
			finally {
				setIsLoading(false);
			}
		}

		fetchWordsByCategory();
	}, [selectedCategory, categories, currentPage]);

	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category);
		setCurrentPage(1); // Reset to first page when changing category
	};

	const handleBackClick = () => {
		setSelectedCategory("");
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		document.querySelector("[role=tablist]")?.scrollIntoView({ behavior: "smooth" });
	};

	if (!selectedCategory) {
		return (
			<div>
				<h3 className="text-lg font-medium text-gray-900 mb-4">按類別瀏覽</h3>

				{isLoading
					? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{Array.from({ length: 9 }, (_, index) => (
							<Skeleton key={index} className="h-24 w-full" />
						))}
					</div>
					: <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{categories.map(category => (
							<Card
								key={category.documentId}
								className="cursor-pointer hover:shadow-md transition-shadow"
								onClick={() => handleCategorySelect(category.slug!)}>
								<CardContent className="p-4">
									<h4 className="text-lg font-medium text-gray-900">{category.zhName || category.enName}</h4>
									{category.enName && category.zhName && <p className="text-sm text-gray-500">{category.enName}</p>}
									<p className="text-sm text-gray-500 mt-2">{category.items?.count || 0} 個詞條</p>
								</CardContent>
							</Card>
						))}
					</div>}
			</div>
		);
	}

	return (
		<div>
			<div className="mb-6">
				<Button variant="ghost" onClick={handleBackClick} className="flex items-center text-base">
					<ChevronLeft className="!h-5 !w-5 -mx-1" />
					返回類別列表
				</Button>
				<h3 className="text-xl font-medium text-gray-900 mt-3">
					類別：{selectedCategoryName}
					{!!totalResults && <span className="text-gray-500 text-sm">
						（顯示第 {(currentPage - 1) * PAGE_SIZE + 1}
						{(currentPage - 1) * PAGE_SIZE + 1 === totalResults ? "" : ` ~ ${Math.min(currentPage * PAGE_SIZE, totalResults)}`} 項，共 {totalResults} 項）
					</span>}
				</h3>
			</div>

			{isLoading
				? <div className="space-y-6">
					<Skeleton className="h-64 w-full" />
					<Skeleton className="h-64 w-full" />
				</div>
				: <div className="space-y-6">
					{wordResults.length
						? <>
							<div className="space-y-4">
								{wordResults.map(word => (
									<WordResult key={word.documentId} word={word} />
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="mt-8">
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
										isLoading={isLoading} />
								</div>
							)}
						</>
						: <Card>
							<CardContent className="p-6 text-center text-gray-500">此類別中沒有詞條。</CardContent>
						</Card>}
				</div>}
		</div>
	);
}
