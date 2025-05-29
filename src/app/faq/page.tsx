import type { Metadata } from "next";
import { Suspense } from "react";
import PageContent from "./page-content";
import PageSkeleton from "./page-skeleton";

export const metadata: Metadata = {
	title: "你問我答 - 香港本土語言保育協會",
	description: "了解關於香港本土語言和香港本土語言保育協會的你問我答",
};

export default function FAQPage() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">你問我答</h1>
					<p className="mt-4 text-lg text-gray-600">了解關於香港本土語言和香港本土語言保育協會的常見問題</p>
				</div>

				<Suspense fallback={<PageSkeleton />}>
					<PageContent />
				</Suspense>
			</div>
		</div>
	);
}
