import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LanguageNotFound() {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center">
				<h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl">找不到語言</h1>
				<p className="mt-4 text-lg text-gray-600">您要查找的語言不存在或已被移除。</p>
				<div className="mt-10">
					<Link href="/languages">
						<Button className="bg-red-800 hover:bg-red-700">返回語言介紹頁面</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
