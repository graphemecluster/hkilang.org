"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
	categories: { id: string; name: string }[];
	selectedCategory: string | null;
	onChange: (category: string | null) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
	return (
		<div className="border-b border-gray-200">
			<div className="flex overflow-x-auto hide-scrollbar">
				{categories.map(category => (
					<button
						key={category.id}
						className={cn(
							"px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
							selectedCategory === category.id
								? "border-red-800 text-red-800"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
						)}
						onClick={() => onChange(category.id === selectedCategory ? null : category.id)}>
						{category.name}
					</button>
				))}
			</div>
		</div>
	);
}
