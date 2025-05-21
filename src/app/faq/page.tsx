import type { Metadata } from "next";
import { Suspense } from "react";
import FAQContent from "@/components/faq/faq-content";
import FAQSkeleton from "@/components/faq/faq-skeleton";

export const metadata: Metadata = {
	title: "常見問題 - 香港本土語言保育協會",
	description: "了解關於香港本土語言和香港本土語言保育協會的常見問題",
};

export default function FAQPage() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">常見問題</h1>
					<p className="mt-4 text-lg text-gray-600">了解關於香港本土語言和香港本土語言保育協會的常見問題</p>
				</div>

				<Suspense fallback={<FAQSkeleton />}>
					<FAQContent />
				</Suspense>
			</div>
		</div>
	);
}
