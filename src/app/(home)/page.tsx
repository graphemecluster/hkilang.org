import Link from "next/link";
import { Button } from "@/components/ui/button";
import WordOfTheDay from "../dictionary/word-of-the-day";
import LanguageShowcase from "./language-showcase";
import Carousel from "./carousel";
import { getCarouselArticles, getHomePageData } from "@/lib/strapi";

export default async function Home() {
	const { data } = await getHomePageData();
	const { data: articles } = await getCarouselArticles();

	return (
		<div>
			{/* Hero Section */}
			<div className="relative isolate overflow-hidden bg-gradient-to-b from-red-50 to-white">
				<div className="mx-auto max-w-7xl px-6 pt-6 sm:pt-8">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
						<h1 className="mt-2 text-4xl font-serif font-bold text-gray-900 sm:text-5xl/[3.25rem] whitespace-pre-line">
							{data.heading.title.replace(/\s+/g, "\n")}
						</h1>
						<p className="mt-6 text-lg/8 text-gray-600">
							{data.heading.summary}
						</p>
					</div>
				</div>
			</div>

			{/* Carousel Section */}
			<Carousel articles={articles} />

			{/* Word of the Day Section */}
			<div className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">{data.wordOfTheDaySection.title}</h2>
						<p className="mt-2 text-lg/8 text-gray-600">{data.wordOfTheDaySection.summary}</p>
					</div>
					<div className="mx-auto mt-10 max-w-2xl">
						<WordOfTheDay />
					</div>
				</div>
			</div>

			{/* Language Showcase */}
			<div className="bg-white py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">{data.languageShowcaseSection.title}</h2>
						<p className="mt-2 text-lg/8 text-gray-600">{data.languageShowcaseSection.summary}</p>
					</div>
					<div className="mx-auto mt-10">
						<LanguageShowcase />
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="bg-red-800">
				<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold text-white sm:text-4xl">{data.callToActionSection.heading.title}</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg/8 text-red-100">{data.callToActionSection.heading.summary}</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href={data.callToActionSection.applicationForm.url}>
								<Button className="bg-white text-red-800 hover:bg-red-50">{data.callToActionSection.buttonText}</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
