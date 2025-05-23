"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import Logo from "@/components/logo";

const navigation = [
	{ name: "首頁", href: "/" },
	{ name: "關於我們", href: "/about" },
	{ name: "最新消息", href: "/news" },
	{ name: "語言介紹", href: "/languages" },
	{ name: "語言辭典", href: "/dictionary" },
	{ name: "你問我答", href: "/faq" },
	{ name: "聯絡我們", href: "#contact" },
];

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const firstPathSegment = pathname.slice(0, `${pathname}/`.indexOf("/", 1));

	// Handle dictionary search button click
	const handleDictionarySearch = () => {
		router.push("/dictionary");
	};

	return (
		<header className="bg-white shadow-sm">
			<nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
				<div className="flex lg:flex-1">
					<Link href="/" className="-m-1.5 p-1.5">
						<Logo />
					</Link>
				</div>
				<div className="flex lg:hidden">
					<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
								<span className="sr-only">開啟導覽</span>
								<Menu className="h-6 w-6" aria-hidden="true" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-full sm:max-w-sm">
							<div className="flex items-center justify-between border-b border-gray-200 pb-4">
								<Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
									<DialogTitle>
										<Logo />
									</DialogTitle>
								</Link>
								<Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
									<span className="sr-only">關閉導覽</span>
									<X className="h-6 w-6" aria-hidden="true" />
								</Button>
							</div>
							<div className="mt-6 flow-root">
								<div className="-my-6 divide-y divide-gray-200">
									<div className="space-y-2 py-6">
										{navigation.map(item => (
											<Link
												key={item.name}
												href={item.href}
												onClick={() => setMobileMenuOpen(false)}
												className={cn(
													"block rounded-lg px-3 py-2 text-base font-medium",
													firstPathSegment === item.href ? "bg-gray-50 text-red-800" : "text-gray-900 hover:bg-gray-50",
												)}>
												{item.name}
											</Link>
										))}
									</div>
									<div className="py-6">
										<Button
											variant="outline"
											className="w-full text-red-800 border-red-800 hover:bg-red-50"
											onClick={() => {
												setMobileMenuOpen(false);
												handleDictionarySearch();
											}}>
											<Search className="mr-2 h-4 w-4" />
											辭典搜尋
										</Button>
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
				<div className="hidden lg:flex lg:gap-x-8">
					{navigation.map(item => (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"text-sm font-medium transition-colors",
								firstPathSegment === item.href
									? "text-red-800 border-b-2 border-red-800"
									: "text-gray-700 hover:text-red-800",
							)}>
							{item.name}
						</Link>
					))}
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<Button
						variant="outline"
						className="text-sm font-medium text-red-800 border-red-800 hover:bg-red-50"
						onClick={handleDictionarySearch}>
						<Search className="mr-2 h-4 w-4" />
						辭典搜尋
					</Button>
				</div>
			</nav>
		</header>
	);
}
