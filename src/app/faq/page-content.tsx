import Markdown from "@/components/markdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import type { getFAQPageData } from "@/lib/strapi";

export default async function PageContent({ data }: { data: Awaited<ReturnType<typeof getFAQPageData>>["data"] }) {
	return (
		<div className="mt-12 mx-auto max-w-3xl">
			<Accordion type="single" collapsible className="w-full">
				{data.questions?.map((question, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger className="text-left font-medium text-lg">{question.question}</AccordionTrigger>
						<AccordionContent>
							<Markdown className="pt-2 pb-4 text-gray-600">{question.answer}</Markdown>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
