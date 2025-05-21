import { Suspense } from "react";
import type { Metadata } from "next";
import NewsPageContent from "@/components/news/news-page-content";
import NewsPageSkeleton from "@/components/news/news-page-skeleton";

export const metadata: Metadata = {
	title: "最新消息 - 香港本土語言保育協會",
	description: "了解香港本土語言保育協會的最新活動、研討會和出版物",
};

export const dynamic = "force-dynamic";

export default function NewsPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const search = typeof searchParams.search === "string" ? searchParams.search : "";
	const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1;
	const tags = Array.isArray(searchParams.tags)
		? searchParams.tags
		: typeof searchParams.tags === "string"
		? [searchParams.tags]
		: [];
	const startDate = typeof searchParams.startDate === "string" ? searchParams.startDate : null;
	const endDate = typeof searchParams.endDate === "string" ? searchParams.endDate : null;
	const category = typeof searchParams.category === "string" ? searchParams.category : null;

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">最新消息</h1>
					<p className="mt-4 text-lg text-gray-600">了解香港本土語言保育協會的最新活動、研討會和出版物</p>
				</div>

				<Suspense fallback={<NewsPageSkeleton />}>
					<NewsPageContent
						initialSearch={search}
						initialPage={page}
						initialTags={tags}
						initialStartDate={startDate}
						initialEndDate={endDate}
						initialCategory={category} />
				</Suspense>
			</div>
		</div>
	);
}
