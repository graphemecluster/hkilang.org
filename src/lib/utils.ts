import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("zh-HK", { dateStyle: "long" });
}

export function formatYearMonth(date: string) {
	return new Date(date).toLocaleDateString("zh-HK", { year: "numeric", month: "long" });
}
