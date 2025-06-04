import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import AudioPlayer from "@/components/audio-player";
import { getGenres } from "@/lib/strapi";
import Markdown from "@/components/markdown";

export default async function ThemedItemsList({ language }: { language: string }) {
	const data = (await getGenres()).data.flatMap(genre => {
		const newItems = genre.items?.flatMap(item => {
			const newVersions = item.versions?.filter(({ lang }) => lang?.slug === language);
			return newVersions?.length ? [{ ...item, versions: newVersions }] : [];
		});
		return newItems?.length ? [{ ...genre, items: newItems }] : [];
	});

	if (!data.length) {
		return <Card>
			<CardContent className="p-8 text-center text-gray-500">暫無口語實例資料</CardContent>
		</Card>;
	}

	return (
		<div>
			<Tabs defaultValue={data[0]?.slug!} className="w-full">
				<TabsList className="flex flex-wrap">
					{data.map(genre => (
						<TabsTrigger key={genre.documentId} value={genre.slug!} className="mb-2">
							{genre.zhName}
						</TabsTrigger>
					))}
				</TabsList>

				{data.map(genre => (
					<TabsContent key={genre.documentId} value={genre.slug!} className="mt-6">
						{/* <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{genre.zhName}</h3> */}
						<div className="space-y-4">
							{genre.items.map(item => (
								<Card key={item.documentId}>
									<CardContent className="p-6">
										<div className="mb-2">
											<span className="text-3xl text-gray-700 font-serif font-bold">
												{item.zhTitle}
												<span className="text-gray-500 text-lg ml-3 mr-1">{item.enTitle}</span>
											</span>
											{/* TODO multiple versions audio */}
											{item.versions[0]?.audio && <AudioPlayer src={item.versions[0].audio.url} />}
										</div>
										<div className="space-y-2">
											{item.versions.map((form, index) => <Markdown key={index}>{form.annotatedText}</Markdown>)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
