import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { ReactElement } from "react";
import type { Data } from "@strapi/strapi";
import Heading from "@/components/heading";

export default function PageSkeleton({ heading, initialTab, wordOfTheDayComponent }: {
	heading: Data.Component<"shared.heading">;
	initialTab: "categories" | "search";
	wordOfTheDayComponent: ReactElement;
}) {
	return (
		<div>
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<Heading>{heading}</Heading>
				<div className="mx-auto mt-12 max-w-3xl">
					{/* Dictionary Tabs */}
					<Tabs defaultValue={initialTab} className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger value="search">字詞搜尋</TabsTrigger>
							<TabsTrigger value="categories">按類別瀏覽</TabsTrigger>
						</TabsList>

						<TabsContent value="search">
							<Skeleton className="h-12 w-full mb-6" />
							{wordOfTheDayComponent}
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
