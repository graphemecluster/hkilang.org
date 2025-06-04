import { Suspense } from "react";
import PageContent from "./page-content";
import PageSkeleton from "./page-skeleton";
import WordOfTheDay from "./word-of-the-day";
import { getDictionaryPageData } from "@/lib/strapi";
import { getMetadataFromHeading } from "@/lib/utils";
import type { PageProps } from "@/lib/types";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const { data: { heading } } = await getDictionaryPageData();
	return getMetadataFromHeading(heading!);
}

export default async function DictionaryPage({ searchParams }: PageProps) {
	const { data: { heading } } = await getDictionaryPageData();

	const search = await searchParams;
	const initialTab = search["tab"] === "categories" || "category" in search ? "categories" : "search";

	const wordOfTheDayComponent = <div className="mt-12">
		<h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">每日一詞</h2>
		<WordOfTheDay />
	</div>;

	return <Suspense fallback={<PageSkeleton heading={heading!} initialTab={initialTab} wordOfTheDayComponent={wordOfTheDayComponent} />}>
		<PageContent heading={heading!} initialTab={initialTab} wordOfTheDayComponent={wordOfTheDayComponent} />
	</Suspense>;
}
