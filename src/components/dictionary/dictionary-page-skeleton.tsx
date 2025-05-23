import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { ReactElement } from "react";

export default function DictionaryPageSkeleton({ wordOfTheDayComponent }: { wordOfTheDayComponent: ReactElement }) {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">語言辭典</h1>
					<p className="mt-4 text-lg text-gray-600">探索香港本土語言的豐富詞彙，包括圍頭話、客家話、汀角話及東平洲話</p>
				</div>

				<div className="mx-auto mt-12 max-w-3xl">
					{/* Word of the Day Section */}
					<div className="mb-12">
						<h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">每日一詞</h2>
						{wordOfTheDayComponent}
					</div>

					{/* Dictionary Tabs */}
					<Tabs defaultValue="search" className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger value="search">字詞搜尋</TabsTrigger>
							<TabsTrigger value="categories">按類別瀏覽</TabsTrigger>
						</TabsList>

						<TabsContent value="search">
							<Skeleton className="h-12 w-full mb-6" />
						</TabsContent>

						<TabsContent value="categories">
							<Skeleton className="h-12 w-full mb-6" />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
