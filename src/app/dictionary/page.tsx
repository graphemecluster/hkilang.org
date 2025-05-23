import type { Metadata } from "next";
import DictionaryPageContent from "@/components/dictionary/dictionary-page-content";
import WordOfTheDay from "@/components/dictionary/word-of-the-day";

export const metadata: Metadata = {
	title: "語言辭典 - 香港本土語言保育協會",
	description: "探索香港本土語言的豐富詞彙，包括圍頭話、客家話、汀角話及東平洲話",
};

export default function DictionaryPage() {
	return <DictionaryPageContent wordOfTheDayComponent={<WordOfTheDay />} />;
}
