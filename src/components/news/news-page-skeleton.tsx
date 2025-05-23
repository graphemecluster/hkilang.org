import { Skeleton } from "@/components/ui/skeleton";

export default function NewsPageSkeleton() {
	return (
		<div className="mt-12">
			{/* Search field skeleton */}
			<div className="mb-8">
				<Skeleton className="h-12 w-full" />
			</div>

			{/* Filters skeleton */}
			<div className="mb-8">
				<Skeleton className="h-6 w-32 mb-4" />
				<div className="flex flex-wrap gap-2 mb-4">
					{Array.from({ length: 6 }).map((_, index) => (
						<Skeleton key={index} className="h-8 w-20" />
					))}
				</div>
				<div className="flex gap-4 mb-4">
					<Skeleton className="h-10 w-32" />
					<Skeleton className="h-10 w-32" />
				</div>
			</div>

			{/* Result count skeleton */}
			<div className="mb-6">
				<Skeleton className="h-5 w-32" />
			</div>

			{/* Article list skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className="overflow-hidden">
						<Skeleton className="h-48 w-full mb-4" />
						<Skeleton className="h-4 w-1/3 mb-2" />
						<Skeleton className="h-6 w-full mb-2" />
						<Skeleton className="h-4 w-full mb-1" />
						<Skeleton className="h-4 w-2/3" />
					</div>
				))}
			</div>

			{/* Pagination skeleton */}
			<div className="mt-10 flex justify-center">
				<div className="flex gap-1">
					<Skeleton className="h-10 w-10" />
					{Array.from({ length: 3 }).map((_, index) => (
						<Skeleton key={index} className="h-10 w-10" />
					))}
					<Skeleton className="h-10 w-10" />
				</div>
			</div>
		</div>
	);
}
