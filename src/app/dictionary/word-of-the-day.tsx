import { Card, CardContent } from "@/components/ui/card";
import { getWordOfTheDay } from "@/lib/strapi";
import WordResult from "./word-result";

export default async function WordOfTheDay() {
	const wordOfTheDayData = await getWordOfTheDay();

	if (!wordOfTheDayData || !wordOfTheDayData.item) {
		return (
			<Card className="overflow-hidden border-2 border-red-100">
				<div className="bg-red-800 px-4 py-2 text-white">
					<div className="text-sm">每日一詞</div>
				</div>
				<CardContent className="p-6 text-center text-gray-500">暫無每日一詞資料</CardContent>
			</Card>
		);
	}

	const { date, item } = wordOfTheDayData;

	return <WordResult date={date as string} word={item} />;
}
