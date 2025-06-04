"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { searchDictionary } from "@/lib/strapi";
import CharacterResult from "./character-result";
import WordResult from "./word-result";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/pagination";

import type { ReactElement } from "react";
import type { Data } from "@strapi/strapi";

export default function SearchTab({ wordOfTheDayComponent }: { wordOfTheDayComponent: ReactElement }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Get initial values from URL parameters
	const initialQuery = searchParams.get("query") || "";
	const initialPage = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!, 10) : 1;

	const [searchTerm, setSearchTerm] = useState(initialQuery);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery);
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(!!initialQuery);
	const [characterResults, setCharacterResults] = useState<Data.ContentType<"api::listed-character.listed-character">[]>([]);
	const [wordResults, setWordResults] = useState<Data.ContentType<"api::lexical-item.lexical-item">[]>([]);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(1);
	const [totalResults, setTotalResults] = useState({ characters: 0, words: 0 });

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

	// Update URL when search term or page changes
	useEffect(() => {
		const queryString = createQueryString({
			query: debouncedSearchTerm || null,
			page: debouncedSearchTerm && currentPage > 1 ? currentPage : null,
			// tab: null,
			// category: null,
		});
		router.push(`${pathname}${queryString && "?"}${queryString}`, { scroll: false });
	}, [debouncedSearchTerm, currentPage, createQueryString, pathname, router]);

	useEffect(() => {
		setSearchTerm(searchParams.get("query") || "");
		setCurrentPage(searchParams.get("page") ? Number.parseInt(searchParams.get("page")!, 10) : 1);
	}, [searchParams]);

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
			setTotalResults({ characters: 0, words: 0 });
			return;
		}

		setIsSearching(true);
		try {
			const results = await searchDictionary(debouncedSearchTerm.trim(), currentPage, PAGE_SIZE);
			setCharacterResults(results.characters.data);
			setWordResults(results.words.data);

			// Calculate total pages and results
			const characterTotal = results.characters?.meta?.pagination?.total || 0;
			const wordTotal = results.words?.meta?.pagination?.total || 0;
			setTotalResults({ characters: characterTotal, words: wordTotal });

			// Calculate total pages based on combined results
			const totalItems = characterTotal + wordTotal;
			const calculatedTotalPages = Math.ceil(totalItems / PAGE_SIZE);
			setTotalPages(calculatedTotalPages || 1);

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentPage(1); // Reset to first page on manual search
		performSearch();
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		document.querySelector("[role=tablist]")?.scrollIntoView({ behavior: "smooth" });
	};

	const totalItems = totalResults.characters + totalResults.words;

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					type="text"
					placeholder="輸入漢字或詞語進行搜尋……"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="flex-1" />
				<Button type="submit" disabled={isSearching || !searchTerm.trim()}>
					{isSearching ? "搜尋中……" : "搜尋"}
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
						搜尋結果{!!totalItems && <span className="text-gray-500 text-sm">
							（顯示第 {(currentPage - 1) * PAGE_SIZE + 1}
							{(currentPage - 1) * PAGE_SIZE + 1 === totalItems ? "" : ` ~ ${Math.min(currentPage * PAGE_SIZE, totalItems)}`} 項，共 {totalItems} 項）
						</span>}
					</h3>

					{totalItems
						? <div className="space-y-6">
							{!!totalResults.characters && (
								<div>
									<h4 className="font-medium text-gray-700 mb-3">
										漢字<span className="text-gray-500 text-sm">（{totalResults.characters}）</span>
									</h4>
									<div className="space-y-4">
										{characterResults.map(character => (
											<CharacterResult key={character.documentId} character={character} />
										))}
									</div>
								</div>
							)}

							{!!totalResults.words && (
								<div>
									<h4 className="font-medium text-gray-700 mb-3">
										詞語<span className="text-gray-500 text-sm">（{totalResults.words}）</span>
									</h4>
									<div className="space-y-4">
										{wordResults.map(word => (
											<WordResult key={word.documentId} word={word} />
										))}
									</div>
								</div>
							)}

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="mt-8">
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
										isLoading={isSearching} />
								</div>
							)}
						</div>
						: <Card>
							<CardContent className="p-6 text-center text-gray-500">
								找不到與「{debouncedSearchTerm}」相關的漢字或詞語。請嘗試其他關鍵詞。
							</CardContent>
						</Card>}
				</div>
			)}
			{!totalItems && wordOfTheDayComponent}
		</div>
	);
}
