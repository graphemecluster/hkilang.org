import type { Metadata } from "next";
import { Suspense } from "react";
import PageContent from "./page-content";
import PageSkeleton from "./page-skeleton";

export const metadata: Metadata = {
	title: "關於我們 - 香港本土語言保育協會",
	description: "了解香港本土語言保育協會的宗旨、組織架構和發展歷程",
};

export default function AboutPage() {
	return (
		<div>
			{/* Hero Section with Background Image */}
			<div className="relative w-full h-[500px] bg-gray-900">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: "url('https://www.hkilang.org/v2/wp-content/uploads/2016/02/山下圍（沙田）DSCN1142-Resized.jpg')",
						backgroundPosition: "center",
						filter: "brightness(0.6)",
					}}>
				</div>
				<div className="relative z-10 mx-auto max-w-7xl px-6 py-24 flex flex-col md:flex-row items-center md:items-start h-full gap-8">
					<div className="md:flex-1 mb-8 md:mb-0">
						<h1 className="text-5xl md:text-6xl font-serif font-bold text-white whitespace-nowrap">關於我們</h1>
					</div>
					<div className="md:flex-[2]">
						<p className="text-lg/8 text-white">
							香港本土語言保育協會致力於保育香港本土語言，包括圍頭話、客家話、汀角話及東平洲話， 透過研究、記錄和教育活動，推廣本土語言文化，防止珍貴的語言遺產消失。 我們相信，語言是文化的載體，保育語言就是保育文化，保存香港獨特的文化多樣性。
						</p>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
				<Suspense fallback={<PageSkeleton />}>
					<PageContent />
				</Suspense>
			</div>
		</div>
	);
}
