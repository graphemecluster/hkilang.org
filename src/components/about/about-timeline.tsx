import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";
import type { Data } from "@strapi/strapi";

export default function AboutTimeline({ timeline }: { timeline: Data.Component<"about-page.timeline-item">[] }) {
	return (
		<div className="relative">
			{/* Vertical line */}
			<div className="absolute left-[1.0625rem] top-0 bottom-5 w-0.5 bg-red-300" />

			<div className="space-y-6">
				{timeline.map((item, index) => {
					const imageUrl = item.image?.url ? getStrapiMedia(item.image.url) : null;

					return (
						<div key={index} className="relative flex items-baseline gap-4">
							{/* Year marker */}
							<div className="flex items-center justify-center w-9 h-9 min-w-9 min-h-9 max-w-9 max-h-9 rounded-full bg-red-800 text-white font-bold">
								<span className="text-xs">{item.year}</span>
							</div>

							<div>
								{/* <h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3> */}
								<p className="text-gray-600">{item.summary}</p>

								{imageUrl && (
									<div className="mt-4 relative h-48 rounded-md overflow-hidden">
										<Image src={imageUrl || "/placeholder.svg"} alt={item.summary} width={0} height={0} className="w-full h-full object-cover" />
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
