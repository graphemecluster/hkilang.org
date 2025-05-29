import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PageSkeleton() {
	return (
		<div className="mt-12 mx-auto max-w-3xl">
			<Accordion type="single" collapsible className="w-full">
				{Array.from({ length: 5 }).map((_, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger className="text-left">
							<Skeleton className="h-6 w-full" />
						</AccordionTrigger>
						<AccordionContent>
							<div className="pt-2 pb-4 space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />
								<Skeleton className="h-4 w-4/5" />
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
