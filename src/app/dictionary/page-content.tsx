"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchTab from "./search-tab";
import CategoriesTab from "./categories-tab";

import type { Dispatch, ReactElement } from "react";
import type { Data } from "@strapi/strapi";
import Heading from "@/components/heading";

export default function PageContent({ heading, initialTab, wordOfTheDayComponent }: {
	heading: Data.Component<"shared.heading">;
	initialTab: "categories" | "search";
	wordOfTheDayComponent: ReactElement;
}) {
	const searchParams = useSearchParams();
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
				<Heading>{heading}</Heading>
				<div className="mx-auto mt-12 max-w-3xl">
					{/* Dictionary Tabs */}
					<Tabs value={activeTab} onValueChange={setActiveTab as Dispatch<string>} className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger value="search">字詞搜尋</TabsTrigger>
							<TabsTrigger value="categories">按類別瀏覽</TabsTrigger>
						</TabsList>

						<TabsContent value="search">
							<Suspense
								fallback={
									<div>
										<Skeleton className="h-12 w-full mb-6" />
										{wordOfTheDayComponent}
									</div>
								}>
								<SearchTab wordOfTheDayComponent={wordOfTheDayComponent} />
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
