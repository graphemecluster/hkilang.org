import NotFound from "@/components/not-found";

export const dynamic = "force-dynamic";

export default function ArticleNotFound() {
	return <NotFound page="文章" backToHref="../" backToPageLabel="文章列表頁面" />;
}
