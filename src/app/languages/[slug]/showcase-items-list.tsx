import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioPlayer from "@/components/audio-player";
import { getShowcaseLexicalDomains } from "@/lib/strapi";

export default async function ShowcaseItemsList({ language }: { language: string }) {
	const data = (await getShowcaseLexicalDomains()).data.flatMap(domain => {
		const newItems = domain.items?.flatMap(item => {
			const newForms = item.forms?.filter(({ lang }) => lang?.slug === language);
			return newForms?.length ? [{ ...item, forms: newForms }] : [];
		});
		return newItems?.length ? [{ ...domain, items: newItems }] : [];
	});

	if (!data.length) {
		return <Card>
			<CardContent className="p-8 text-center text-gray-500">暫無詞句資料</CardContent>
		</Card>;
	}

	return (
		<div>
			<Tabs defaultValue={data[0]?.slug!} className="w-full">
				<TabsList className="flex flex-wrap">
					{data.map(domain => (
						<TabsTrigger key={domain.documentId} value={domain.slug!} className="mb-2">
							{domain.zhName}
						</TabsTrigger>
					))}
				</TabsList>

				{data.map(domain => (
					<TabsContent key={domain.documentId} value={domain.slug!} className="mt-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{domain.items?.map(item => (
								<Card key={item.documentId} className="md:col-span-2">
									{item.forms.some(({ glyph }) => [...(glyph || "")].length > 6)
										? <CardContent className="p-4">
											<div className="flex items-baseline justify-between">
												<div className="flex-1">
													{item.forms.map((form, index) =>
														<div key={index}>
															<div className="flex items-center">
																{form.glyph && <span className="text-lg font-medium text-gray-900">{form.glyph}</span>}
																{form.audio && <AudioPlayer src={form.audio} />}
															</div>
															{form.pron && <div className="text-gray-500 text-sm mt-1">[{form.pron}]</div>}
														</div>
													)}
												</div>
												<div className="text-right">
													<div className="text-gray-700">{item.zhGloss}</div>
													<div className="text-gray-500 text-sm mt-1">{item.enGloss}</div>
												</div>
											</div>
										</CardContent>
										: <CardContent className="p-4">
											{item.forms.map((form, index) =>
												<div key={index} className="flex items-center">
													<div>
														{form.glyph && <span className="text-lg font-medium text-gray-900">{form.glyph}</span>}
														{form.pron && <span className="ml-2 text-gray-500">[{form.pron}]</span>}
													</div>
													{form.audio && <AudioPlayer src={form.audio.url} />}
												</div>
											)}
											<div className="mt-1">
												<p className="text-gray-600">
													{item.zhGloss}
													{item.zhGloss && item.enGloss && " / "}
													{item.enGloss}
												</p>
											</div>
										</CardContent>}
								</Card>
							))}
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
