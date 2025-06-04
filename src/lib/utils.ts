import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Data } from "@strapi/strapi";
import type { ClassValue } from "clsx";
import type { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("zh-HK", { dateStyle: "long" });
}

export function formatYearMonth(date: string) {
	return new Date(date).toLocaleDateString("zh-HK", { year: "numeric", month: "long" });
}

export function getMetadataFromHeading(heading: Data.Component<"shared.heading"> | Data.ContentType<"api::category.category">): Metadata {
	const title = ("title" in heading ? heading.title : "name" in heading ? heading.name : undefined) || undefined;
	const description = ("summary" in heading ? heading.summary : "description" in heading ? heading.description : undefined) || undefined;
	const images = "coverImage" in heading ? heading.coverImage?.url : undefined;
	return { title, description, openGraph: { title, description, images } };
}
