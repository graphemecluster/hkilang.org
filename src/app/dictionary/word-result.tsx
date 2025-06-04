import { Card, CardContent } from "@/components/ui/card";
import AudioPlayer from "@/components/audio-player";
import type { Data } from "@strapi/strapi";
import { formatDate } from "@/lib/utils";

export default function WordResult({ date, word }: { date?: string; word: Data.ContentType<"api::lexical-item.lexical-item"> }) {
	const { zhGloss, enGloss, words, notes, surveyedDomain } = word;

	const formsByLang = Object.groupBy(words!, form => form.lang!.zhName!);

	return (
		<Card className="overflow-hidden border-2 border-red-100">
			<div className="bg-red-800 px-4 py-2 text-white flex justify-between items-center">
				{date ? <div className="text-sm">{formatDate(date)}</div> : <div className="text-lg font-medium">{zhGloss}</div>}
				{surveyedDomain && <div className="text-sm bg-white/20 px-2 py-0.5 rounded">{surveyedDomain.zhName}</div>}
			</div>
			<CardContent className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						{date && <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">{zhGloss}</h2>}
						<div className="space-y-4">
							{Object.entries(formsByLang).map(([langName, forms]) => (
								<div key={langName}>
									<span className="text-sm font-medium text-gray-500">{langName}</span>
									{forms!.map((form, index) =>
										<div key={index}>
											<div className="flex items-center">
												<div>
													{form.pron && <div className="text-base">{form.pron}</div>}
													{form.glyph && <div className="text-lg text-gray-700">{form.glyph}</div>}
												</div>
												{form.audio && <AudioPlayer src={form.audio.url} />}
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
							{enGloss && <div>
								<span className="text-sm font-medium text-gray-500">英文</span>
								<div>{enGloss}</div>
							</div>}

							{words?.some(form => form?.examples?.length) && (
								<div>
									<h3 className="text-lg font-medium text-gray-900 mb-2">例句</h3>
									<div className="space-y-4">
										{Object.entries(formsByLang).map(([langName, forms]) =>
											<div key={langName}>
												<div className="text-sm font-medium text-gray-500 mb-1">{langName}</div>
												{forms!.map((form, index) =>
													!!form?.examples?.length && (
														<div key={index} className="space-y-2">
															{form!.examples!.map((example, idx) => (
																<div key={idx} className="pl-3 border-l-2 border-gray-200">
																	<div className="flex items-center">
																		<div>
																			{example.glyph && <span className="text-gray-900 mr-2">{example.glyph}</span>}
																			{example.pron && <span className="text-gray-600">[{example.pron}]</span>}
																		</div>
																		{example.audio && <AudioPlayer src={example.audio.url} small />}
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
