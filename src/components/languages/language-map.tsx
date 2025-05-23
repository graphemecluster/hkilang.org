import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";

import type { Data } from "@strapi/strapi";

interface LanguageMapProps {
	language: string;
	distribution: Data.Component<"language-intro-page.language-map">;
}

export default function LanguageMap({ language, distribution }: LanguageMapProps) {
	const title = distribution.heading?.title || "";
	const mapImage = getStrapiMedia(distribution.heading?.coverImage?.url) || "";

	return (
		<div className="rounded-lg overflow-hidden border border-gray-200">
			<div className="relative h-64 w-full">
				<Image src={mapImage || "/placeholder.svg?height=400&width=600"} alt={title} width={0} height={0} className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
					<h3 className="text-white text-xl font-bold">{title}</h3>
				</div>
			</div>
			<div className="p-4 bg-white">
				<p className="text-gray-600 mb-4">{distribution.heading?.summary}</p>
				<h4 className="font-medium text-gray-900 mb-2">主要分佈村落</h4>
				<ul className="space-y-1">
					{distribution.villages?.map((village, index) => (
						<li key={index} className="flex justify-between">
							<span>{village.name}</span>
							<span className="text-gray-500">{village.population}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
