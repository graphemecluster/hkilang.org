import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getHomePageData, getLanguageIntroPage } from "@/lib/strapi";
import ShowcaseItemsList from "./showcase-items-list";
import ThemedItemsList from "./themed-items-list";
import Markdown from "@/components/markdown";
import type { PageProps } from "@/lib/types";
import { getMetadataFromHeading } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"slug">): Promise<Metadata> {
	const introPage = await getLanguageIntroPage((await params).slug);

	if (!introPage) {
		notFound();
	}

	return getMetadataFromHeading(introPage.heading!);
}

export default async function LanguageDetailPage({ params }: PageProps<"slug">) {
	const introPage = await getLanguageIntroPage((await params).slug);

	if (!introPage) {
		notFound();
	}

	const { data: { callToActionSection } } = await getHomePageData();

	return (
		<div>
			{/* Hero Section */}
			<div className="relative isolate overflow-hidden bg-gradient-to-b from-red-50 to-white">
				<div className="mx-auto max-w-7xl px-6 pt-8 sm:pt-12 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
						<h1 className="mt-2 text-4xl font-serif font-bold text-gray-900 sm:text-5xl">
							{introPage.heading?.title}
							<span className="text-2xl ml-4 text-gray-600">{introPage.lang?.enName}</span>
						</h1>
						<p className="mt-6 text-lg/8 text-gray-600">{introPage.heading?.summary}</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
				<Tabs defaultValue="overview" className="w-full">
					<TabsList className="flex w-full *:flex-1">
						<TabsTrigger value="overview">概述</TabsTrigger>
						<TabsTrigger value="pronunciation-guide">發音</TabsTrigger>
						<TabsTrigger value="showcase-items">詞句</TabsTrigger>
						<TabsTrigger value="themed-items">口語實例</TabsTrigger>
						<TabsTrigger value="cultural-context">文化背景</TabsTrigger>
					</TabsList>

					{/* Overview Tab */}
					<TabsContent value="overview" className="mt-6">
						<Markdown className="md:columns-2 prose-headings:break-after-avoid prose-h2:font-serif">{introPage.overview}</Markdown>
					</TabsContent>

					{/* Pronunciation Guide Tab */}
					<TabsContent value="pronunciation-guide" className="mt-6">
						<Markdown className="prose-h2:font-serif">{introPage.pronunciationGuide}</Markdown>
					</TabsContent>

					{/* Showcase Items Tab */}
					<TabsContent value="showcase-items" className="mt-6">
						<ShowcaseItemsList language={introPage.lang?.slug!} />
					</TabsContent>

					{/* Themed Items Tab */}
					<TabsContent value="themed-items" className="mt-6">
						<ThemedItemsList language={introPage.lang?.slug!} />
					</TabsContent>

					{/* Cultural Context Tab */}
					<TabsContent value="cultural-context" className="mt-6">
						<Markdown className="prose-h2:font-serif prose-img:rounded-lg prose-img:h-64 prose-img:float-end prose-img:ms-8 md:[&:nth-of-type(even)]:prose-img:float-start md:[&:nth-of-type(even)]:prose-img:ms-0 md:[&:nth-of-type(even)]:prose-img:me-8 prose-headings:clear-both">{introPage.culturalContext}</Markdown>
					</TabsContent>
				</Tabs>
			</div>

			{/* Related Resources Section */}
			{introPage.relatedResources && <div className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">
							{introPage.relatedResources.heading?.title}
						</h2>
						<p className="mt-2 text-lg/8 text-gray-600">
							{introPage.relatedResources.heading?.summary}
						</p>
					</div>

					<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
						{introPage.relatedResources.resources?.map((resource, index) =>
							<div key={index} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
								<div className="flex-shrink-0">
									<Image
										className="h-48 w-full object-cover"
										src={resource.heading?.coverImage?.url || "/placeholder.svg?height=200&width=400"}
										alt={resource.heading?.title}
										width={400}
										height={200} />
								</div>
								<div className="flex flex-1 flex-col justify-between bg-white p-6">
									<div className="flex-1">
										<h3 className="text-xl font-semibold text-gray-900">{resource.heading?.title}</h3>
										<p className="mt-3 text-base text-gray-500">{resource.heading?.summary}</p>
									</div>
									<div className="mt-6">
										<Link href={resource.buttonUrl!}>
											<Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
												{resource.buttonText}
											</Button>
										</Link>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>}

			{/* CTA Section */}
			<div className="bg-red-800">
				<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold text-white sm:text-4xl">
							參與{introPage.lang?.zhName}保育工作
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg/8 text-red-100">
							無論您是語言學者、本土語言使用者，還是對香港本土文化感興趣的人士，都歡迎加入我們的行列，共同保育
							{introPage.lang?.zhName}這一珍貴的語言遺產。
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href={callToActionSection?.applicationForm?.url}>
								<Button className="bg-white text-red-800 hover:bg-red-50">{callToActionSection?.buttonText}</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
