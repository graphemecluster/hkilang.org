import { Suspense } from "react";
import type { Metadata } from "next";
import PageContent from "./page-content";
import PageSkeleton from "./page-skeleton";
import type { PageProps } from "@/lib/types";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/strapi";
import { articleCategories } from "@/lib/consts";
import Heading from "@/components/heading";
import { getMetadataFromHeading } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"category">): Promise<Metadata> {
	const { category: categorySlug } = await params;

	if (!articleCategories.has(categorySlug)) {
		notFound();
	}

	const category = await getCategory(categorySlug);

	if (!category) {
		throw new Error("Category not found in CMS");
	}

	return getMetadataFromHeading(category);
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
				<Heading>{category}</Heading>
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
