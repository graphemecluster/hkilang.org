import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";

interface TimelineItem {
	year: string;
	title: string;
	description: string;
	image?: {
		data?: {
			attributes?: {
				url: string;
			};
		};
	};
}

interface AboutTimelineProps {
	timeline: TimelineItem[];
}

export default function AboutTimeline({ timeline }: AboutTimelineProps) {
	// Sort timeline items by year in descending order
	const sortedTimeline = [...timeline].sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year));

	return (
		<div className="relative">
			{/* Vertical line */}
			<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-red-100" />

			<div className="space-y-12">
				{sortedTimeline.map((item, index) => {
					const imageUrl = item.image?.data?.attributes?.url ? getStrapiMedia(item.image.data.attributes.url) : null;

					return (
						<div key={index} className="relative pl-12">
							{/* Year marker */}
							<div className="absolute left-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-red-800 text-white font-bold">
								<span className="text-xs">{item.year}</span>
							</div>

							<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
								<div className="p-6">
									<h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3>
									<p className="text-gray-600">{item.summary}</p>

									{imageUrl && (
										<div className="mt-4 relative h-48 rounded-md overflow-hidden">
											<Image src={imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
