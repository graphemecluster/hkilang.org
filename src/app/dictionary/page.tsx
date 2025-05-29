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
	return <Suspense fallback={<PageSkeleton wordOfTheDayComponent={<WordOfTheDay />} />}>
		<PageContent wordOfTheDayComponent={<WordOfTheDay />} />
	</Suspense>;
}
