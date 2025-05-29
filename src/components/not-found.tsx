import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound({ page, backToHref, backToPageLabel }: { page: string; backToHref: string; backToPageLabel: string }) {
	return <div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
		<h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">找不到{page}</h1>
		<p className="mt-4 text-lg text-gray-600">您要查找的{page}不存在或已被移除。</p>
		<div className="mt-10">
			<Link href={backToHref}>
				<Button className="bg-red-800 hover:bg-red-700">返回{backToPageLabel}</Button>
			</Link>
		</div>
	</div>;
}
