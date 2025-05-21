"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NewsFiltersProps {
	allTags: any[];
	selectedTags: string[];
	onTagSelect: (tagId: string) => void;
}

export default function NewsFilters({ allTags, selectedTags, onTagSelect }: NewsFiltersProps) {
	return (
		<div className="space-y-4">
			{/* 標籤過濾器 */}
			<div>
				<div className="flex flex-wrap gap-2">
					{allTags.map(tag => (
						<Badge
							key={tag.id}
							variant={selectedTags.includes(tag.id) ? "default" : "outline"}
							className={`cursor-pointer ${selectedTags.includes(tag.id) ? "bg-red-800 hover:bg-red-700" : "hover:bg-red-50"}`}
							onClick={() => onTagSelect(tag.id)}>
							{tag.name}
						</Badge>
					))}
					{allTags.length === 0 && <span className="text-sm text-gray-500">沒有可用的標籤</span>}
				</div>
			</div>

			{/* 已選過濾器摘要 */}
			{selectedTags.length > 0 && (
				<div className="pt-2">
					<h3 className="text-sm font-medium text-gray-700 mb-2">已選標籤</h3>
					<div className="flex flex-wrap gap-2">
						{selectedTags.map(tagId => {
							const tag = allTags.find(t => t.id === tagId);
							return (
								<Badge key={tagId} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
									{tag?.name}
									<Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => onTagSelect(tagId)}>
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
