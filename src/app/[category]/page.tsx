import { Suspense } from "react";
import type { Metadata } from "next";
import PageContent from "./page-content";
import PageSkeleton from "./page-skeleton";
import type { PageProps } from "@/lib/types";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "最新消息 - 香港本土語言保育協會",
	description: "了解香港本土語言保育協會的最新活動、研討會和出版物",
};

export const dynamic = "force-dynamic";

const ALLOWED_CATEGORIES = new Set(["news"]);

export default async function ArticlesPage({ params, searchParams }: PageProps<"category">) {
	const { category } = await params;

	if (!ALLOWED_CATEGORIES.has(category)) {
		notFound();
	}

	const search = await searchParams;

	const query = typeof search["query"] === "string" ? search["query"] : "";
	const page = typeof search["page"] === "string" ? Number.parseInt(search["page"], 10) : 1;
	const tag = typeof search["tag"] === "string" ? search["tag"] : null;
	const month = typeof search["month"] === "string" ? search["month"] : null;

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">最新消息</h1>
					<p className="mt-4 text-lg text-gray-600">了解香港本土語言保育協會的最新活動、研討會和出版物</p>
				</div>

				<Suspense fallback={<PageSkeleton />}>
					<PageContent
						initialQuery={query}
						initialPage={page}
						initialTag={tag}
						initialMonth={month} />
				</Suspense>
			</div>
		</div>
	);
}
