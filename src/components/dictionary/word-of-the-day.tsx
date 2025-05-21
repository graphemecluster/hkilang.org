import { Card, CardContent } from "@/components/ui/card";
import { getWordOfTheDay } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import DictionaryAudioPlayer from "./dictionary-audio-player";

export default async function WordOfTheDay() {
	const wordOfTheDayData = await getWordOfTheDay();

	if (!wordOfTheDayData) {
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
	const formattedDate = new Date(date).toLocaleDateString("zh-HK");

	// Group words by language
	const wordsByLang = item.words.reduce((acc: any, word: any) => {
		if (word.lang) {
			const langName = word.lang.zhName;
			if (!acc[langName]) {
				acc[langName] = word;
			}
		}
		return acc;
	}, {});

	return (
		<Card className="overflow-hidden border-2 border-red-100">
			<div className="bg-red-800 px-4 py-2 text-white">
				<div className="text-sm">{formattedDate}</div>
			</div>
			<CardContent className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-2xl font-serif font-bold text-gray-900">{item.zhGloss}</h3>
						<div className="mt-4 space-y-3">
							{Object.entries(wordsByLang).map(([langName, word]: [string, any]) => (
								<div key={langName}>
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium text-gray-500">{langName}</span>
										{word.audio && (
											<DictionaryAudioPlayer src={getStrapiMedia(word.audio.url) || ""} language={langName} />
										)}
									</div>
									<div className="text-lg">{word.pron}</div>
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="space-y-2">
							<div>
								<span className="text-sm font-medium text-gray-500">普通話</span>
								<div>{item.zhGloss}</div>
							</div>
							{item.enGloss && (
								<div>
									<span className="text-sm font-medium text-gray-500">英文</span>
									<div>{item.enGloss}</div>
								</div>
							)}
							{Object.values(wordsByLang).some((word: any) => word.examples?.length > 0) && (
								<div className="pt-2">
									<span className="text-sm font-medium text-gray-500">例句</span>
									<div className="mt-1 space-y-1">
										{Object.entries(wordsByLang).map(([langName, word]: [string, any]) =>
											word.examples?.map((example: any, idx: number) => (
												<div key={`${langName}-example-${idx}`} className="mt-2">
													<p className="text-sm font-medium text-gray-500">{langName}:</p>
													<p className="text-gray-900">{example.glyph || example.pron}</p>
												</div>
											))
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
