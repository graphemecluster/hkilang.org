import { Skeleton } from "@/components/ui/skeleton";

export default function AboutPageSkeleton() {
	return (
		<div>
			{/* Mission Section Skeleton */}
			<div className="mb-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
					<div>
						<Skeleton className="h-8 w-40 mb-4" />
						<Skeleton className="h-1 w-20 mb-4" />
					</div>
					<div className="md:col-span-2 space-y-4">
						<Skeleton className="h-6 w-full" />
						<Skeleton className="h-6 w-full" />
						<Skeleton className="h-6 w-5/6" />
						<Skeleton className="h-6 w-full" />
					</div>
				</div>
			</div>

			{/* Introduction Section Skeleton */}
			<div className="mb-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
					<div>
						<Skeleton className="h-8 w-40 mb-4" />
						<Skeleton className="h-1 w-20 mb-4" />
					</div>
					<div className="md:col-span-2 space-y-4">
						<Skeleton className="h-6 w-full" />
						<Skeleton className="h-6 w-full" />
						<Skeleton className="h-6 w-5/6" />
						<Skeleton className="h-6 w-full" />
					</div>
				</div>
			</div>

			{/* Logo Section Skeleton */}
			<div className="mb-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
					<div>
						<Skeleton className="h-8 w-40 mb-4" />
						<Skeleton className="h-1 w-20 mb-4" />
					</div>
					<div className="md:col-span-2">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
							<div className="flex justify-center">
								<Skeleton className="h-64 w-64 rounded-full" />
							</div>
							<div className="space-y-4">
								<Skeleton className="h-6 w-full" />
								<Skeleton className="h-6 w-full" />
								<Skeleton className="h-6 w-5/6" />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Members Section Skeleton */}
			<div className="mb-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
					<div>
						<Skeleton className="h-8 w-40 mb-4" />
						<Skeleton className="h-1 w-20 mb-4" />
					</div>
					<div className="md:col-span-2">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{Array.from({ length: 6 }).map((_, index) => (
								<div key={index} className="flex flex-col items-center">
									<Skeleton className="h-32 w-32 rounded-full mb-4" />
									<Skeleton className="h-6 w-24 mb-2" />
									<Skeleton className="h-4 w-32" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Timeline Section Skeleton */}
			<div className="mb-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
					<div>
						<Skeleton className="h-8 w-40 mb-4" />
						<Skeleton className="h-1 w-20 mb-4" />
					</div>
					<div className="md:col-span-2">
						<div className="space-y-8">
							{Array.from({ length: 3 }).map((_, yearIndex) => (
								<div key={yearIndex} className="relative pl-12">
									<Skeleton className="absolute left-4 top-0 -translate-x-1/2 w-8 h-8 rounded-full" />
									<div className="space-y-6">
										{Array.from({ length: 2 }).map((_, itemIndex) => (
											<div key={itemIndex} className="space-y-2">
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-4 w-5/6" />
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
