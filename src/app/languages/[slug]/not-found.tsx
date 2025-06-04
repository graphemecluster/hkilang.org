import NotFound from "@/components/not-found";

export const dynamic = "force-dynamic";

export default function LanguageNotFound() {
	return <NotFound page="語言" backToHref="/languages" backToPageLabel="語言縱覽頁面" />;
}
