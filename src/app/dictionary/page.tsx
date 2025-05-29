import type { Metadata } from "next";
import { Suspense } from "react";
import PageContent from "./page-content";
import PageSkeleton from "./page-skeleton";
import WordOfTheDay from "./word-of-the-day";

export const metadata: Metadata = {
	title: "語言辭典 - 香港本土語言保育協會",
	description: "探索香港本土語言的豐富詞彙，包括圍頭話、客家話、汀角話及東平洲話",
};

export default function DictionaryPage() {
	const wordOfTheDayComponent = <div className="mt-12">
		<h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">每日一詞</h2>
		{<WordOfTheDay />}
	</div>;
	return <Suspense fallback={<PageSkeleton wordOfTheDayComponent={wordOfTheDayComponent} />}>
		<PageContent wordOfTheDayComponent={wordOfTheDayComponent} />
	</Suspense>;
}
