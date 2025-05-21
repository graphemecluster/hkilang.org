"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { searchDictionary } from "@/lib/strapi";
import DictionaryCharacterResult from "./dictionary-character-result";
import DictionaryWordResult from "./dictionary-word-result";
import { Skeleton } from "@/components/ui/skeleton";
import NewsPagination from "@/components/news/news-pagination";

export default function DictionarySearch() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Get initial values from URL parameters
	const initialQuery = searchParams.get("q") || "";
	const initialPage = searchParams.get("page") ? Number.parseInt(searchParams.get("page") as string, 10) : 1;

	const [searchTerm, setSearchTerm] = useState(initialQuery);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery);
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(!!initialQuery);
	const [characterResults, setCharacterResults] = useState<any[]>([]);
	const [wordResults, setWordResults] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	const PAGE_SIZE = 10;

	// Create a function to update URL query parameters
	const createQueryString = useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams.toString());

			Object.entries(params).forEach(([key, value]) => {
				if (value === null) {
					newSearchParams.delete(key);
				}
				else {
					newSearchParams.set(key, String(value));
				}
			});

			// Always preserve the tab parameter
			if (!newSearchParams.has("tab")) {
				newSearchParams.set("tab", "search");
			}

			return newSearchParams.toString();
		},
		[searchParams],
	);

	// Update URL when search term or page changes
	useEffect(() => {
		if (debouncedSearchTerm || currentPage > 1) {
			const queryString = createQueryString({
				q: debouncedSearchTerm || null,
				page: currentPage === 1 ? null : currentPage,
			});
			router.push(`${pathname}?${queryString}`, { scroll: false });
		}
	}, [debouncedSearchTerm, currentPage, createQueryString, pathname, router]);

	// Debounce search term
	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
			if (searchTerm !== debouncedSearchTerm) {
				setCurrentPage(1); // Reset to first page when search term changes
			}
		}, 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [searchTerm, debouncedSearchTerm]);

	// Perform search when debounced search term changes or page changes
	const performSearch = useCallback(async () => {
		if (!debouncedSearchTerm.trim()) {
			setCharacterResults([]);
			setWordResults([]);
			setHasSearched(false);
			setTotalPages(1);
			setTotalResults(0);
			return;
		}

		setIsSearching(true);
		try {
			const results = await searchDictionary(debouncedSearchTerm, currentPage, PAGE_SIZE);
			setCharacterResults(results.characters?.data || []);
			setWordResults(results.words?.data || []);

			// Calculate total pages and results
			const characterTotal = results.characters?.meta?.pagination?.total || 0;
			const wordTotal = results.words?.meta?.pagination?.total || 0;
			const totalItems = characterTotal + wordTotal;
			setTotalResults(totalItems);

			// Calculate total pages based on combined results
			const calculatedTotalPages = Math.ceil(totalItems / PAGE_SIZE);
			setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);

			setHasSearched(true);
		}
		catch (error) {
			console.error("Error searching dictionary:", error);
		}
		finally {
			setIsSearching(false);
		}
	}, [debouncedSearchTerm, currentPage]);

	useEffect(() => {
		performSearch();
	}, [performSearch]);

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentPage(1); // Reset to first page on manual search
		performSearch();
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const hasResults = characterResults.length > 0 || wordResults.length > 0;

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					type="text"
					placeholder="輸入字符或詞語進行搜尋..."
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="flex-1" />
				<Button type="submit" disabled={isSearching || !searchTerm.trim()}>
					{isSearching ? "搜尋中..." : "搜尋"}
					{!isSearching && <Search className="ml-2 h-4 w-4" />}
				</Button>
			</form>

			{isSearching && (
				<div className="mt-6 space-y-6">
					<Skeleton className="h-64 w-full" />
					<Skeleton className="h-64 w-full" />
				</div>
			)}

			{hasSearched && !isSearching && (
				<div className="mt-6">
					<h3 className="text-lg font-medium text-gray-900 mb-4">
						搜尋結果 {totalResults > 0 && <span className="text-gray-500 text-sm">（共 {totalResults} 項）</span>}
					</h3>

					{hasResults
						? (
							<div className="space-y-6">
								{characterResults.length > 0 && (
									<div>
										<h4 className="text-md font-medium text-gray-700 mb-3">字符 ({characterResults.length})</h4>
										<div className="space-y-4">
											{characterResults.map(character => (
												<DictionaryCharacterResult key={character.id} character={character} />
											))}
										</div>
									</div>
								)}

								{wordResults.length > 0 && (
									<div>
										<h4 className="text-md font-medium text-gray-700 mb-3">詞語 ({wordResults.length})</h4>
										<div className="space-y-4">
											{wordResults.map(word => (
												<DictionaryWordResult key={word.id} word={word} />
											))}
										</div>
									</div>
								)}

								{/* Pagination */}
								{totalPages > 1 && (
									<div className="mt-8">
										<NewsPagination
											currentPage={currentPage}
											totalPages={totalPages}
											onPageChange={handlePageChange}
											isLoading={isSearching} />
									</div>
								)}
							</div>
						)
						: (
							<Card>
								<CardContent className="p-6 text-center text-gray-500">
									找不到與「{debouncedSearchTerm}」相關的字符或詞語。請嘗試其他關鍵詞。
								</CardContent>
							</Card>
						)}
				</div>
			)}
		</div>
	);
}
