import Image from "next/image";
import { getAboutData } from "@/lib/strapi";
import AboutTimeline from "@/components/about/about-timeline";
import AboutMembers from "@/components/about/about-members";
import Markdown from "@/components/markdown";

export default async function AboutPageContent() {
	const aboutData = await getAboutData();
	const data = aboutData.data;

	return (
		<div>
			{data.sections && data.sections.map(section => (
				<div key={section.id} className="mb-16">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
						<div className="md:sticky md:top-24">
							<h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">{section.subtitle}</h2>
							<div className="w-20 h-1 bg-red-800 mb-4"></div>
						</div>
						<div className={`md:col-span-3 ${section.subtitle?.includes("會徽") ? "grid grid-cols-1 md:grid-cols-3 gap-8 items-center" : ""}`}>
							{section.subtitle?.includes("會徽") && (
								<div className="flex justify-center">
									<div className="relative w-56 h-56">
										<Image
											src="/logo.svg"
											alt="香港本土語言保育協會會徽"
											width={0}
											height={0}
											className="w-full h-full object-contain" />
									</div>
								</div>
							)}
							<Markdown className="md:col-span-2 prose-lg prose-img:rounded-lg prose-headings:font-serif">{section.content}</Markdown>
						</div>
					</div>
				</div>
			))}

			{/* Members Section */}
			{!!data.members?.length && (
				<div className="mb-16">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
						<div className="md:sticky md:top-24">
							<h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">組織架構</h2>
							<div className="w-20 h-1 bg-red-800 mb-4"></div>
						</div>
						<div className="md:col-span-3">
							<AboutMembers members={data.members} />
						</div>
					</div>
				</div>
			)}

			{/* Timeline Section */}
			{!!data.timeline?.length && (
				<div className="mb-16">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
						<div className="md:sticky md:top-24">
							<h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">發展歷程</h2>
							<div className="w-20 h-1 bg-red-800 mb-4"></div>
						</div>
						<div className="md:col-span-3">
							<AboutTimeline timeline={data.timeline} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
