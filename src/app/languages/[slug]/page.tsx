import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLanguageIntroPage } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import LanguageMap from "@/components/languages/language-map";
import PronunciationGuide from "@/components/languages/pronunciation-guide";
import VocabularyList from "@/components/languages/vocabulary-list";
import AudioPhrases from "@/components/languages/audio-phrases";
import CulturalContext from "@/components/languages/cultural-context";

interface LanguageDetailPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({ params }: LanguageDetailPageProps): Promise<Metadata> {
	const introPage = await getLanguageIntroPage((await params).slug);

	if (!introPage) {
		return {
			title: "找不到語言 - 香港本土語言保育協會",
		};
	}

	const heading = introPage.heading || {} as never;

	return {
		title: `${heading.title} - 香港本土語言保育協會`,
		description: heading.summary || "",
	};
}

export default async function LanguageDetailPage({ params }: LanguageDetailPageProps) {
	const introPage = await getLanguageIntroPage((await params).slug);

	if (!introPage) {
		notFound();
	}

	const lang = introPage.lang || {} as never;
	const heading = introPage.heading || {} as never;
	const overview = introPage.overview || {} as never;
	const distribution = introPage.distribution || {} as never;
	const culturalContext = introPage.culturalContext || {} as never;
	const relatedResources = introPage.relatedResources || {} as never;

	// Get cover image URL
	const coverImageUrl = getStrapiMedia(heading.coverImage?.url);

	return (
		<div className="bg-white">
			{/* Hero Section */}
			<div className="relative isolate overflow-hidden bg-gradient-to-b from-red-50 to-white">
				<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
						<h1 className="mt-2 text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">
							{heading.title}
							<span className="text-2xl ml-3 text-gray-600">{lang.enName}</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">{heading.summary}</p>
						<div className="mt-10 flex items-center gap-x-6">
							<Button className="bg-red-800 hover:bg-red-700">
								<Link href={`/dictionary?language=${lang.slug}`}>查詢{lang.zhName}辭典</Link>
							</Button>
							<Link href="#pronunciation" className="text-sm font-semibold leading-6 text-gray-900">
								學習發音 <span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="absolute inset-0 -z-10 overflow-hidden">
					<div className="absolute right-0 top-0 -translate-y-12 translate-x-1/2 transform">
						<Image
							src={coverImageUrl || "/placeholder.svg?height=600&width=600"}
							alt={heading.title}
							width={600}
							height={600}
							className="opacity-20" />
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
				<Tabs defaultValue="overview" className="w-full">
					<TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
						<TabsTrigger value="overview">概述</TabsTrigger>
						<TabsTrigger value="pronunciation" id="pronunciation">發音</TabsTrigger>
						<TabsTrigger value="vocabulary">詞彙</TabsTrigger>
						<TabsTrigger value="phrases">常用語句</TabsTrigger>
						<TabsTrigger value="culture">文化背景</TabsTrigger>
					</TabsList>

					{/* Overview Tab */}
					<TabsContent value="overview" className="mt-6">
						<div className="md:columns-2">
							{overview.map(section => (
								<div key={section.id} className="break-inside-avoid">
									<h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">{section.subtitle}</h2>
									<div className="prose prose-red max-w-none mb-4">
										<div dangerouslySetInnerHTML={{ __html: section.content || "" }} />
									</div>
								</div>
							))}

							<LanguageMap language={lang.slug} distribution={distribution} />
						</div>
					</TabsContent>

					{/* Pronunciation Tab */}
					<TabsContent value="pronunciation" className="mt-6">
						<PronunciationGuide language={lang.slug} />
					</TabsContent>

					{/* Vocabulary Tab */}
					<TabsContent value="vocabulary" className="mt-6">
						<VocabularyList language={lang.slug} />
					</TabsContent>

					{/* Phrases Tab */}
					<TabsContent value="phrases" className="mt-6">
						<AudioPhrases language={lang.slug} />
					</TabsContent>

					{/* Culture Tab */}
					<TabsContent value="culture" className="mt-6">
						<CulturalContext language={lang.zhName} culturalContext={culturalContext} />
					</TabsContent>
				</Tabs>
			</div>

			{/* Related Resources Section */}
			<div className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">
							{relatedResources.heading?.title || "相關資源"}
						</h2>
						<p className="mt-2 text-lg leading-8 text-gray-600">
							{relatedResources.heading?.summary || `探索更多關於${lang.zhName}的學習資源和研究材料`}
						</p>
					</div>

					<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
						{relatedResources.resources?.map((resource, index) => {
							const resourceImageUrl = getStrapiMedia(resource.heading?.coverImage?.url);

							return (
								<div key={index} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
									<div className="flex-shrink-0">
										<Image
											className="h-48 w-full object-cover"
											src={resourceImageUrl || "/placeholder.svg?height=200&width=400"}
											alt={resource.heading?.title || "資源圖片"}
											width={400}
											height={200} />
									</div>
									<div className="flex flex-1 flex-col justify-between bg-white p-6">
										<div className="flex-1">
											<h3 className="text-xl font-semibold text-gray-900">{resource.heading?.title || "資源標題"}</h3>
											<p className="mt-3 text-base text-gray-500">{resource.heading?.summary || "資源描述"}</p>
										</div>
										<div className="mt-6">
											<Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
												{resource.buttonText || "查看資源"}
											</Button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="bg-red-800">
				<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-4xl">
							參與{lang.zhName}保育工作
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
							無論您是語言學者、本土語言使用者，還是對香港本土文化感興趣的人士，都歡迎加入我們的行列，共同保育
							{lang.zhName}這一珍貴的語言遺產。
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Button className="bg-white text-red-800 hover:bg-red-50">
								<Link href="https://www.hkilang.org/v2/wp-content/uploads/2015/01/%E9%A6%99%E6%B8%AF%E6%9C%AC%E5%9C%9F%E8%AA%9E%E8%A8%80%E4%BF%9D%E8%82%B2%E5%8D%94%E6%9C%83_%E5%85%A5%E6%9C%83%E7%94%B3%E8%AB%8B%E8%A1%A81.docx">加入我們</Link>
							</Button>
							<Link href="/news" className="text-sm font-semibold leading-6 text-white">
								參加活動 <span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
