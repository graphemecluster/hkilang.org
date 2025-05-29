"use client";

import { cn } from "@/lib/utils";

import type { Data } from "@strapi/strapi";

interface TagFilterProps {
	tags: Pick<Data.ContentType<"api::tag.tag">, "slug" | "name">[];
	selectedTag: string | null;
	onChange: (tag: string | null) => void;
}

export default function TagFilter({ tags, selectedTag, onChange }: TagFilterProps) {
	return (
		<div className="border-b border-gray-200">
			<div className="flex overflow-x-auto hide-scrollbar">
				{tags.map(tag => (
					<button
						key={tag.slug}
						className={cn(
							"px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
							selectedTag === tag.slug
								? "border-red-800 text-red-800"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
						)}
						onClick={() => onChange(tag.slug)}>
						{tag.name}
					</button>
				))}
			</div>
		</div>
	);
}
