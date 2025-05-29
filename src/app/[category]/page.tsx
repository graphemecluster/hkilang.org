import { Suspense } from "react";
import type { Metadata } from "next";
import PageContent from "./page-content";
import PageSkeleton from "./page-skeleton";
import type { PageProps } from "@/lib/types";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/strapi";
import { articleCategories } from "@/lib/consts";

export async function generateMetadata({ params }: PageProps<"category">): Promise<Metadata> {
	const { category: categorySlug } = await params;

	if (!articleCategories.has(categorySlug)) {
		notFound();
	}

	const category = await getCategory(categorySlug);

	if (!category) {
		throw new Error("Category not found in CMS");
	}

	return {
		title: `${category.name} - 香港本土語言保育協會`,
		description: category.description || "",
		openGraph: {
			title: category.name || "",
			description: category.description || "",
		},
	};
}

export default async function ArticlesPage({ params, searchParams }: PageProps<"category">) {
	const { category: categorySlug } = await params;

	if (!articleCategories.has(categorySlug)) {
		notFound();
	}

	const category = await getCategory(categorySlug);

	if (!category) {
		throw new Error("Category not found in CMS");
	}

	const search = await searchParams;

	const query = typeof search["query"] === "string" ? search["query"] : "";
	const page = typeof search["page"] === "string" ? Number.parseInt(search["page"], 10) : 1;
	const tag = typeof search["tag"] === "string" ? search["tag"] : null;
	const month = typeof search["month"] === "string" ? search["month"] : null;

	return (
		<div>
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-serif font-bold text-gray-900 sm:text-5xl">{category.name}</h1>
					<p className="mt-4 text-lg text-gray-600">{category.description}</p>
				</div>

				<Suspense fallback={<PageSkeleton />}>
					<PageContent
						category={category!.slug!}
						initialQuery={query}
						initialPage={page}
						initialTag={tag}
						initialMonth={month} />
				</Suspense>
			</div>
		</div>
	);
}
