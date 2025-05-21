import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/strapi";
import DictionaryAudioPlayer from "./dictionary-audio-player";

interface DictionaryWordResultProps {
	word: any;
}

export default function DictionaryWordResult({ word }: DictionaryWordResultProps) {
	const { zhGloss, enGloss, words, notes, domain } = word;

	// Group forms by language
	const formsByLang = words.reduce((acc: any, form: any) => {
		if (form.lang) {
			const langName = form.lang.zhName;
			if (!acc[langName]) {
				acc[langName] = form;
			}
		}
		return acc;
	}, {});

	return (
		<Card className="overflow-hidden border-2 border-red-100">
			<div className="bg-red-800 px-4 py-2 text-white flex justify-between items-center">
				<div className="text-lg font-medium">{zhGloss}</div>
				{domain && <div className="text-sm bg-white/20 px-2 py-0.5 rounded">{domain.zhName}</div>}
			</div>
			<CardContent className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-lg font-medium text-gray-900 mb-4">發音</h3>
						<div className="space-y-4">
							{Object.entries(formsByLang).map(([langName, form]: [string, any]) => (
								<div key={langName}>
									<div className="flex items-center justify-between mb-1">
										<span className="text-sm font-medium text-gray-500">{langName}</span>
										{form.audio && (
											<DictionaryAudioPlayer src={getStrapiMedia(form.audio.url) || ""} language={langName} />
										)}
									</div>
									<div className="text-base">{form.pron}</div>
									{form.glyph && <div className="text-gray-700 mt-1">字形: {form.glyph}</div>}
									{form.notes && <div className="text-gray-500 text-sm mt-1">{form.notes}</div>}
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="space-y-4">
							<div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">翻譯</h3>
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

							{Object.entries(formsByLang).some(([_, form]: [string, any]) => form.examples?.length > 0) && (
								<div>
									<h3 className="text-lg font-medium text-gray-900 mb-2">例句</h3>
									<div className="space-y-4">
										{Object.entries(formsByLang).map(
											([langName, form]: [string, any]) =>
												form.examples?.length > 0 && (
													<div key={`${langName}-examples`} className="space-y-2">
														<h4 className="text-sm font-medium text-gray-700">{langName}</h4>
														{form.examples.map((example: any, idx: number) => (
															<div key={idx} className="pl-3 border-l-2 border-gray-200">
																<div className="flex items-center justify-between">
																	<div>
																		{example.glyph && <span className="text-gray-900 mr-2">{example.glyph}</span>}
																		<span className="text-gray-600">[{example.pron}]</span>
																	</div>
																	{example.audio && (
																		<DictionaryAudioPlayer
																			src={getStrapiMedia(example.audio.url) || ""}
																			language={langName}
																			small />
																	)}
																</div>
																{example.notes && <p className="text-gray-500 text-sm mt-1">{example.notes}</p>}
															</div>
														))}
													</div>
												),
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
