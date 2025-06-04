import { Noto_Sans_HK, Noto_Serif_HK } from "next/font/google";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const notoSans = Noto_Sans_HK({
	subsets: ["latin"],
	variable: "--font-noto-sans",
	weight: ["400", "500", "700"],
});

const notoSerif = Noto_Serif_HK({
	subsets: ["latin"],
	variable: "--font-noto-serif",
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: {
		template: "%s – 香港本土語言保育協會",
		default: "香港本土語言保育協會",
	},
	description: "致力於保育香港本土語言",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="zh-HK" suppressHydrationWarning>
			<body className={`${notoSans.variable} ${notoSerif.variable} font-sans`}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
					<div className="flex min-h-screen flex-col">
						<Header />
						<main className="flex-1 grid">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
