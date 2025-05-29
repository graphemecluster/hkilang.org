import Image from "next/image";
import Markdown from "@/components/markdown";
import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/strapi";

import type { Data } from "@strapi/strapi";

interface CulturalContextProps {
	language: string;
	culturalContext: Data.Component<"language-intro-page.cultural-context">;
}

// This is a mock proverb data
// In a real application, this data should be fetched from Strapi CMS
const proverbs = [
	{
		proverb: "天光雞啼，天黑雞歸。",
		explanation: "形容農村生活的規律性，天亮時雞啼，天黑時雞回窩。",
	},
	{
		proverb: "好心得好報，種瓜得瓜，種豆得豆。",
		explanation: "善有善報，種什麼收穫什麼，比喻行為與結果的對應關係。",
	},
	{
		proverb: "一日之計在於晨，一年之計在於春。",
		explanation: "強調早晨和春季是開始計劃和行動的最佳時機。",
	},
	{
		proverb: "三日打魚，兩日曬網。",
		explanation: "形容工作不持續，時做時停。",
	},
	{
		proverb: "有米自然有雞來。",
		explanation: "有了資源自然會吸引人來，比喻有條件就會有結果。",
	},
];

export default function CulturalContext({ language, culturalContext }: CulturalContextProps) {
	return (
		<div>
			<div className="prose prose-red max-w-none mb-8">
				<p>{culturalContext.summary}</p>
			</div>

			<div className="space-y-12">
				{culturalContext.sections?.map((section, index) => {
					const imageUrl = section.coverImage?.url
						? getStrapiMedia(section.coverImage.url)
						: null;

					return (
						<div
							key={index}
							className="flex items-stretch md:even:flex-row-reverse gap-8">
							<div className="flex-1">
								<h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{section.title}</h3>
								<Markdown>{section.summary}</Markdown>
							</div>
							<div className="flex-1 relative h-64 rounded-lg overflow-hidden">
								<Image
									src={imageUrl || "/placeholder.svg?height=300&width=500"}
									alt={section.title}
									width={0}
									height={0}
									className="w-full h-full object-cover" />
							</div>
						</div>
					);
				})}
			</div>

			{proverbs && <div className="mt-12">
				<h3 className="text-xl font-serif font-bold text-gray-900 mb-6">{language}諺語精選</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{proverbs.map((proverb, index) => (
						<Card key={index}>
							<CardContent className="p-4">
								<p className="text-lg font-medium text-red-800 mb-2">「{proverb.proverb}」</p>
								<p className="text-gray-600">{proverb.explanation}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>}
		</div>
	);
}
