"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchTab from "./search-tab";
import CategoriesTab from "./categories-tab";

import type { ReactElement } from "react";

export default function PageContent({ wordOfTheDayComponent }: { wordOfTheDayComponent: ReactElement }) {
	const searchParams = useSearchParams();
	const initialTab = searchParams.get("tab") === "categories" || searchParams.has("category") ? "categories" : "search";
	const [activeTab, setActiveTab] = useState(initialTab);

	// Parameter updates are handled individually in <DictionarySearch> and <DictionaryCategories>, no need to handle it here
	/*
	const router = useRouter();
	const pathname = usePathname();

	// Handle tab change
	const handleTabChange = (value: string) => {
		// Create a new URLSearchParams object
		const newParams = new URLSearchParams(searchParams.toString());

		// Update the tab parameter
		newParams.set("tab", value);

		// Update the URL without refreshing the page
		router.push(`${pathname}?${newParams.toString()}`, { scroll: false });

		setActiveTab(value);
	};
	*/

	// Update active tab when URL parameters change
	useEffect(() => {
		setActiveTab(searchParams.get("tab") === "categories" || searchParams.has("category") ? "categories" : "search");
	}, [searchParams]);

	return (
		<div>
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-serif font-bold text-gray-900 sm:text-5xl">語言辭典</h1>
					<p className="mt-4 text-lg text-gray-600">探索香港本土語言的豐富詞彙，包括圍頭話、客家話、汀角話及東平洲話</p>
				</div>

				<div className="mx-auto mt-12 max-w-3xl">
					{/* Word of the Day Section */}
					<div className="mb-12">
						<h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">每日一詞</h2>
						{wordOfTheDayComponent}
					</div>

					{/* Dictionary Tabs */}
					<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger value="search">字詞搜尋</TabsTrigger>
							<TabsTrigger value="categories">按類別瀏覽</TabsTrigger>
						</TabsList>

						<TabsContent value="search">
							<Suspense fallback={<Skeleton className="h-12 w-full mb-6" />}>
								<SearchTab />
							</Suspense>
						</TabsContent>

						<TabsContent value="categories">
							<Suspense fallback={<Skeleton className="h-12 w-full mb-6" />}>
								<CategoriesTab />
							</Suspense>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
