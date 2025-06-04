import type { Metadata } from "next";
import { Suspense } from "react";
import PageContent from "./page-content";
import PageSkeleton from "./page-skeleton";
import { getAboutPageData } from "@/lib/strapi";
import { getMetadataFromHeading } from "@/lib/utils";
import Heading from "@/components/heading";

export async function generateMetadata(): Promise<Metadata> {
	const { data } = await getAboutPageData();
	return getMetadataFromHeading(data.heading!);
}

export default async function AboutPage() {
	const { data } = await getAboutPageData();
	return (
		<div>
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<Heading>{data.heading!}</Heading>
				<Suspense fallback={<PageSkeleton />}>
					<PageContent data={data} />
				</Suspense>
			</div>
		</div>
	);
}
