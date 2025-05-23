"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Data } from "@strapi/strapi";

interface NewsFiltersProps {
	allTags: Pick<Data.ContentType<"api::tag.tag">, "slug" | "name">[];
	selectedTags: string[];
	onTagSelect: (tagSlug: string) => void;
}

export default function NewsFilters({ allTags, selectedTags, onTagSelect }: NewsFiltersProps) {
	return (
		<div className="space-y-4">
			{/* Tag filter */}
			<div>
				<div className="flex flex-wrap gap-2">
					{allTags.map(tag => (
						<Badge
							key={tag.slug}
							variant={selectedTags.includes(tag.slug) ? "default" : "outline"}
							className={`cursor-pointer ${selectedTags.includes(tag.slug) ? "bg-red-800 hover:bg-red-700" : "hover:bg-red-50"}`}
							onClick={() => onTagSelect(tag.slug)}>
							{tag.name}
						</Badge>
					))}
					{allTags.length === 0 && <span className="text-sm text-gray-500">無可用的標籤</span>}
				</div>
			</div>

			{/* Chosen tags summary */}
			{selectedTags.length > 0 && (
				<div className="pt-2">
					<h3 className="text-sm font-medium text-gray-700 mb-2">已選標籤</h3>
					<div className="flex flex-wrap gap-2">
						{selectedTags.map(tagSlug => {
							const tag = allTags.find(t => t.slug === tagSlug);
							return (
								<Badge key={tagSlug} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
									{tag?.name}
									<Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => onTagSelect(tagSlug)}>
										<span className="sr-only">移除</span>
										<span aria-hidden="true">×</span>
									</Button>
								</Badge>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
