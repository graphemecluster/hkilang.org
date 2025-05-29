import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/strapi";
import AudioPlayer from "./audio-player";

import type { Data } from "@strapi/strapi";

export default function CharacterResult({ character }: { character: Data.ContentType<"api::listed-character.listed-character"> }) {
	const { codepoint, chars, notes } = character;

	const formsByLang = Object.groupBy(chars!, form => form.lang!.zhName!);

	return (
		<Card className="overflow-hidden border-2 border-red-100">
			<div className="bg-red-800 px-4 py-2 text-white">
				<div className="text-lg font-medium">{codepoint}</div>
			</div>
			<CardContent className="p-6">
				<div className="space-y-4">
					{Object.entries(formsByLang).map(([langName, forms]) => (
						<div key={langName} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
							<h3 className="text-lg font-medium text-gray-900 mb-2">{langName}</h3>
							{forms!.map(form =>
								<div key={form.id}>
									<div className="flex items-baseline justify-between mb-2">
										<div>
											{form.pron && <div className="text-base">{form.pron}</div>}
											{form.glyph && form.glyph !== codepoint && (
												<div className="mb-3">
													<span className="text-sm font-medium text-gray-500">字形：</span>
													<span className="text-lg">{form.glyph}</span>
												</div>
											)}
										</div>
										{form.audio && <AudioPlayer src={getStrapiMedia(form.audio.url) || ""} language={langName} />}
									</div>
									{form.notes && (
										<div className="mb-3">
											<span className="text-sm font-medium text-gray-500">備註：</span>
											<span>{form.notes}</span>
										</div>
									)}
									{form.examples && form.examples.length > 0 && (
										<div>
											<span className="text-sm font-medium text-gray-500">配詞：</span>
											<div className="mt-1 space-y-2">
												{form.examples.map((example, idx) => (
													<div key={idx} className="pl-3 border-l-2 border-gray-200">
														<div className="flex items-center justify-between">
															<div>
																{example.glyph && <span className="text-gray-900 mr-2">{example.glyph.replace(/~/g, "～")}</span>}
																<span className="text-gray-600">[{example.pron}]</span>
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
										</div>
									)}
								</div>
							)}
						</div>
					))}

					{character.collocation && character.collocation.length > 0 && (
						<div>
							<span className="text-sm font-medium text-gray-500">配詞：</span>
							<div className="mt-1 space-y-2">
								{character.collocation.map((vocab, idx) => (
									<div key={idx}>
										<div className="flex items-center justify-between">
											<div>
												{vocab.glyph && <span className="text-gray-900 mr-2">{vocab.glyph.replace(/~/g, "～")}</span>}
												{vocab.pron && <span className="text-gray-600">[{vocab.pron}]</span>}
											</div>
										</div>
										{vocab.notes && <p className="text-gray-500 text-sm mt-1">{vocab.notes}</p>}
									</div>
								))}
							</div>
						</div>
					)}

					{notes && (
						<div className="mt-4">
							<span className="text-sm font-medium text-gray-500">備註：</span>
							<p className="text-gray-700">{notes}</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
