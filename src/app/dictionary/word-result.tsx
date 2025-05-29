import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/strapi";
import AudioPlayer from "./audio-player";
import type { Data } from "@strapi/strapi";
import { formatDate } from "@/lib/utils";

export default function WordResult({ date, word }: { date?: string; word: Data.ContentType<"api::surveyed-lexical-item.surveyed-lexical-item"> }) {
	const { zhGloss, enGloss, words, notes, domain } = word;

	const formsByLang = Object.groupBy(words!, form => form.lang!.zhName!);

	// This is a mock word of the day data
	// In a real application, this data should be fetched from Strapi CMS
	const wordOfTheDayExamples: typeof formsByLang = {
		圍頭話: [{ id: 0, examples: [{ id: 0, glyph: "聽日天光就要出發。" }] }],
		客家話: [{ id: 0, examples: [{ id: 0, glyph: "晨朝日天光就要出發。" }] }],
	};

	return (
		<Card className="overflow-hidden border-2 border-red-100">
			<div className="bg-red-800 px-4 py-2 text-white flex justify-between items-center">
				{date ? <div className="text-sm">{formatDate(date)}</div> : <div className="text-lg font-medium">{zhGloss}</div>}
				{domain && <div className="text-sm bg-white/20 px-2 py-0.5 rounded">{domain.zhName}</div>}
			</div>
			<CardContent className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						{date && <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">{zhGloss}</h2>}
						{/* <h3 className="text-lg font-medium text-gray-900 mb-4">發音</h3> */}
						<div className="space-y-4">
							{Object.entries(formsByLang).map(([langName, forms]) => (
								<div key={langName}>
									<span className="text-sm font-medium text-gray-500">{langName}</span>
									{forms!.map(form =>
										<div key={form.id}>
											<div className="flex items-baseline justify-between">
												<div>
													{form.pron && <div className="text-base">{form.pron}</div>}
													{form.glyph && <div className="text-lg text-gray-700">{form.glyph}</div>}
												</div>
												{form.audio && <AudioPlayer src={getStrapiMedia(form.audio.url) || ""} language={langName} />}
											</div>
											{form.notes && <div className="text-gray-500 text-sm mt-1">{form.notes}</div>}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="space-y-4">
							<div>
								{/* <h3 className="text-lg font-medium text-gray-900 mb-2">翻譯</h3> */}
								<div className="space-y-2">
									<div>
										<span className="text-sm font-medium text-gray-500">普通話</span>
										<div>{zhGloss}</div>
									</div>
									{enGloss && (
										<div>
											<span className="text-sm font-medium text-gray-500">英文</span>
											<div>{enGloss}</div>
										</div>
									)}
								</div>
							</div>

							{/* TODO: Remove `date ||` after demo */}
							{(date || words?.some(form => form?.examples?.length)) && (
								<div>
									<h3 className="text-lg font-medium text-gray-900 mb-2">例句</h3>
									<div className="space-y-4">
										{/* TODO: wordOfTheDayExamples -> formsByLang after demo */}
										{Object.entries(date ? wordOfTheDayExamples : formsByLang).map(([langName, forms]) =>
											<div key={langName}>
												<div className="text-sm font-medium text-gray-500 mb-1">{langName}</div>
												{forms!.map(form =>
													!!form?.examples?.length && (
														<div key={form.id} className="space-y-2">
															{form!.examples!.map((example, idx) => (
																<div key={idx} className="pl-3 border-l-2 border-gray-200">
																	<div className="flex items-center justify-between">
																		<div>
																			{example.glyph && <span className="text-gray-900 mr-2">{example.glyph}</span>}
																			{example.pron && <span className="text-gray-600">[{example.pron}]</span>}
																		</div>
																		{example.audio && (
																			<AudioPlayer
																				src={getStrapiMedia(example.audio.url) || ""}
																				language={langName}
																				small />
																		)}
																	</div>
																	{example.notes && <p className="text-gray-500 text-sm mt-1">{example.notes}</p>}
																</div>
															))}
														</div>
													)
												)}
											</div>
										)}
									</div>
								</div>
							)}

							{notes && (
								<div>
									<h3 className="text-lg font-medium text-gray-900 mb-2">備註</h3>
									<p className="text-gray-600">{notes}</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
