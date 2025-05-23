import { getFAQData } from "@/lib/strapi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function FAQPageContent() {
	const faqData = await getFAQData();
	const data = faqData.data;

	return (
		<div className="mt-12 mx-auto max-w-3xl">
			<Accordion type="single" collapsible className="w-full">
				{data.questions?.map((question, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger className="text-left font-medium text-lg">{question.question}</AccordionTrigger>
						<AccordionContent>
							<div className="pt-2 pb-4 text-gray-600">
								<div dangerouslySetInnerHTML={{ __html: question.answer }} className="prose prose-red max-w-none" />
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
