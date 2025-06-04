import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLanguageIntroPages } from "@/lib/strapi";

export default async function LanguageShowcase() {
	const { data: languages } = await getLanguageIntroPages();
	return (
		<div className="mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6">
			{languages.map(language => (
				<div key={language.documentId} className="flex-1 sm:min-w-60 max-w-96 md:max-w-80 group relative overflow-hidden rounded-lg">
					<div className="aspect-video relative">
						<Image
							src={language.heading?.coverImage || "/placeholder.svg"}
							alt={language.heading?.title}
							width={0}
							height={0}
							className="w-auto h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
						<div className="absolute inset-0 bg-translucent-gradient flex flex-col justify-end p-4">
							<h3 className="text-xl font-serif font-bold text-white">{language.heading?.title}</h3>
							<p className="mt-2 text-sm text-gray-200 line-clamp-3">{language.heading?.summary}</p>
							<Link href={`/languages/${language.lang?.slug}`} className="mt-4">
								<Button
									size="sm"
									variant="outline"
									className="bg-white/10 text-white border-white/30 hover:bg-white/20">
									了解更多
								</Button>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
