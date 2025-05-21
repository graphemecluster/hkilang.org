import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLanguages } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export const metadata: Metadata = {
	title: "語言介紹 - 香港本土語言保育協會",
	description: "探索香港本土語言的豐富資源，包括圍頭話、客家話、汀角話及東平洲話",
};

export default async function LanguagesPage() {
	// Fetch languages from Strapi
	const languagesData = await getLanguages();
	const languages = languagesData.data || [];

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">語言介紹</h1>
					<p className="mt-4 text-lg text-gray-600">
						探索香港本土語言的豐富資源，了解這些珍貴語言的特點、歷史和文化背景
					</p>
				</div>

				<div className="mt-16 space-y-20">
					{languages.map((language, index) => {
						const coverImage = language.introPage?.data?.heading?.coverImage?.data?.url;
						const imageUrl = getStrapiMedia(coverImage) || "/placeholder.svg?height=400&width=600";

						return (
							<div
								key={language.id}
								className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
								<div className="w-full md:w-1/2">
									<div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
										<Image
											src={imageUrl || "/placeholder.svg"}
											alt={language.zhName}
											fill
											className="object-cover" />
									</div>
								</div>
								<div className="w-full md:w-1/2">
									<h2 className="text-3xl font-serif font-bold text-gray-900">
										{language.zhName}
										<span className="ml-3 text-xl text-gray-500">{language.enName}</span>
									</h2>
									<div className="mt-4 flex flex-wrap gap-4">
										<span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
											使用人數: {language.speakerCount || "資料更新中"}
										</span>
										<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
											分佈地區: {language.region || "資料更新中"}
										</span>
										<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
											保育狀況: {language.status || "資料更新中"}
										</span>
									</div>
									<p className="mt-4 text-lg text-gray-600">{language.description}</p>
									<div className="mt-6">
										<Button className="bg-red-800 hover:bg-red-700">
											<Link href={`/languages/${language.slug}`}>了解更多</Link>
										</Button>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Additional Resources Section */}
				<div className="mt-24">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">其他語言資源</h2>
						<p className="mt-4 text-lg text-gray-600">除了上述主要語言外，我們還提供以下資源</p>
					</div>

					<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<div className="bg-white overflow-hidden shadow rounded-lg">
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-900 mb-2">語言學習材料</h3>
								<p className="text-gray-600 mb-4">包括教材、詞典、語音指南和練習材料，適合不同程度的學習者使用。</p>
								<Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
									瀏覽學習材料
								</Button>
							</div>
						</div>

						<div className="bg-white overflow-hidden shadow rounded-lg">
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-900 mb-2">口述歷史檔案</h3>
								<p className="text-gray-600 mb-4">收錄本土語言使用者的口述歷史，保存珍貴的語言資料和文化記憶。</p>
								<Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
									聆聽口述歷史
								</Button>
							</div>
						</div>

						<div className="bg-white overflow-hidden shadow rounded-lg">
							<div className="p-6">
								<h3 className="text-xl font-bold text-gray-900 mb-2">研究論文集</h3>
								<p className="text-gray-600 mb-4">
									收錄關於香港本土語言的學術研究成果，涵蓋語音、詞彙、語法和社會語言學等多個方面。
								</p>
								<Button variant="outline" className="text-red-800 border-red-800 hover:bg-red-50">
									查看研究論文
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
