"use client";

import { cn } from "@/lib/utils";

import type { Data } from "@strapi/strapi";

interface CategoryFilterProps {
	categories: Pick<Data.ContentType<"api::category.category">, "slug" | "name">[];
	selectedCategory: string | null;
	onChange: (category: string | null) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
	return (
		<div className="border-b border-gray-200">
			<div className="flex overflow-x-auto hide-scrollbar">
				{categories.map(category => (
					<button
						key={category.slug}
						className={cn(
							"px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
							selectedCategory === category.slug
								? "border-red-800 text-red-800"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
						)}
						onClick={() => onChange(category.slug)}>
						{category.name}
					</button>
				))}
			</div>
		</div>
	);
}
