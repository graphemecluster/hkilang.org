import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/strapi";

import type { Data } from "@strapi/strapi";

interface CulturalContextProps {
	language: string;
	culturalContext: Data.Component<"language-intro-page.cultural-context">;
}

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
							className="grid grid-cols-1 md:grid-cols-2 gap-8 odd:md:flex-row-reverse">
							<div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
								<h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{section.title}</h3>
								<div className="prose prose-red max-w-none">
									<div dangerouslySetInnerHTML={{ __html: section.summary || "" }} />
								</div>
							</div>
							<div className="relative h-64 rounded-lg overflow-hidden odd:md:order-1">
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

			{culturalContext.proverbs && <div className="mt-12">
				<h3 className="text-xl font-serif font-bold text-gray-900 mb-6">{language}諺語精選</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{culturalContext.proverbs.map((proverb, index) => (
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
