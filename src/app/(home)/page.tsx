import Link from "next/link";
import { Button } from "@/components/ui/button";
import WordOfTheDay from "../dictionary/word-of-the-day";
import LanguageShowcase from "./language-showcase";
import NewsCarousel from "./news-carousel";
import { getPriorityNewsArticles } from "@/lib/strapi";

export default async function Home() {
	// Fetch priority articles for the carousel
	const priorityArticlesData = await getPriorityNewsArticles();
	const articles = priorityArticlesData.data;

	return (
		<div>
			{/* Hero Section */}
			<div className="relative isolate overflow-hidden bg-gradient-to-b from-red-50 to-white">
				<div className="mx-auto max-w-7xl px-6 pt-6 sm:pt-8">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
						<h1 className="mt-2 text-4xl font-serif font-bold text-gray-900 sm:text-5xl/[3.25rem]">
							保育香港本土語言
							<br />
							傳承珍貴文化遺產
						</h1>
						<p className="mt-6 text-lg/8 text-gray-600">
							香港本土語言保育協會致力於保育香港本土語言，包括圍頭話、客家話、汀角話及東平洲話， 透過研究、記錄和教育活動，推廣本土語言文化，防止珍貴的語言遺產消失。
						</p>
					</div>
				</div>
			</div>

			{/* News Carousel Section */}
			<NewsCarousel articles={articles} />

			{/* Word of the Day Section */}
			<div className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">每日一詞</h2>
						<p className="mt-2 text-lg/8 text-gray-600">每日學習一個本土語言詞彙，逐步認識香港獨特的語言文化</p>
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
						<h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">本土語言</h2>
						<p className="mt-2 text-lg/8 text-gray-600">探索香港豐富多元的本土語言</p>
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
						<h2 className="text-3xl font-serif font-bold text-white sm:text-4xl">
							加入我們，共同保育香港本土語言
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg/8 text-red-100">
							無論您是語言學者、本土語言使用者，還是對香港本土文化感興趣的人士，都歡迎加入我們的行列。
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link href="https://www.hkilang.org/v2/wp-content/uploads/2015/01/%E9%A6%99%E6%B8%AF%E6%9C%AC%E5%9C%9F%E8%AA%9E%E8%A8%80%E4%BF%9D%E8%82%B2%E5%8D%94%E6%9C%83_%E5%85%A5%E6%9C%83%E7%94%B3%E8%AB%8B%E8%A1%A81.docx">
								<Button className="bg-white text-red-800 hover:bg-red-50">加入我們</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
