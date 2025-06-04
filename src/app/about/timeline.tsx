import type { Data } from "@strapi/strapi";
import Markdown from "@/components/markdown";

export default function Timeline({ timeline }: { timeline: Data.Component<"about-page.timeline-item">[] }) {
	return (
		<div className="relative">
			{/* Vertical line */}
			<div className="absolute left-[1.0625rem] top-0 bottom-5 w-0.5 bg-red-300" />

			<div className="space-y-6">
				{timeline.map((item, index) =>
					<div key={index} className="relative flex items-baseline gap-4">
						<div className="flex items-center justify-center w-9 h-9 min-w-9 min-h-9 max-w-9 max-h-9 rounded-full bg-red-800 text-white font-bold">
							<span className="text-xs">{item.year}</span>
						</div>
						<Markdown>{item.content}</Markdown>
					</div>
				)}
			</div>
		</div>
	);
}
