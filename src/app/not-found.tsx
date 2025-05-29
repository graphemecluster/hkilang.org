import NotFound from "@/components/not-found";

export const dynamic = "force-dynamic";

export default function PageNotFound() {
	return <NotFound page="頁面" backToHref="/" backToPageLabel="首頁" />;
}
