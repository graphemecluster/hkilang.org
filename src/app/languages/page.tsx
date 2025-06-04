import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLanguageIntroPages, getLanguagesPageData } from "@/lib/strapi";
import { getMetadataFromHeading } from "@/lib/utils";
import Heading from "@/components/heading";

export async function generateMetadata(): Promise<Metadata> {
	const { data } = await getLanguagesPageData();
	return getMetadataFromHeading(data.heading!);
}

export default async function LanguagesPage() {
	const { data } = await getLanguagesPageData();
	const { data: languages } = await getLanguageIntroPages();

	return (
		<div>
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<Heading>{data.heading!}</Heading>
				<div className="mt-16 space-y-20">
					{languages.map(language =>
						<div
							key={language.documentId}
							className="flex flex-col md:flex-row md:even:flex-row-reverse gap-8 items-center">
							<div className="w-full md:w-1/2">
								<div className="relative aspect-video rounded-lg overflow-hidden">
									<Image
										src={language?.heading?.coverImage?.url || "/placeholder.svg?height=400&width=600"}
										alt={language.heading.title}
										width={0}
										height={0}
										className="w-full h-full object-cover" />
								</div>
							</div>
							<div className="w-full md:w-1/2">
								<h2 className="text-3xl font-serif font-bold text-gray-900">
									{language.heading.title}
									<span className="ml-3 text-xl text-gray-500">{language.enName}</span>
								</h2>
								{
									/* <div className="mt-4 flex flex-wrap gap-4">
										<span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
											使用人數: {language.speakerCount || "資料更新中"}
										</span>
										<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
											分佈地區: {language.region || "資料更新中"}
										</span>
										<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
											保育狀況: {language.status || "資料更新中"}
										</span>
									</div> */
								}
								<p className="mt-4 text-lg text-gray-600">{language.heading.summary}</p>
								<div className="mt-6">
									<Button className="bg-red-800 hover:bg-red-700">
										<Link href={`/languages/${language.lang.slug}`}>了解更多</Link>
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Additional Resources Section */}
				{data.relatedResources && <div className="mt-24">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">{data.relatedResources.heading?.title}</h2>
						<p className="mt-4 text-lg text-gray-600">{data.relatedResources.heading?.summary}</p>
					</div>

					<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{data.relatedResources.resources?.map((resource, index) =>
							<div key={index} className="bg-white overflow-hidden shadow rounded-lg relative">
								{/* TODO display coverImage */}
								<div className="p-6">
									<h3 className="text-xl font-bold text-gray-900 mb-2">{resource.heading?.title}</h3>
									<p className="text-gray-600 mb-4">{resource.heading?.summary}</p>
									<Link href={resource.buttonUrl!}>
										<Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
											{resource.buttonText}
										</Button>
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>}
			</div>
		</div>
	);
}
