import { headers } from "next/headers";
import NotFound from "@/components/not-found";
import { articleCategories, navigationItems } from "@/lib/consts";

export const dynamic = "force-dynamic";

export default async function ArticleNotFound() {
	const [, category] = ((await headers()).get("x-pathname") || "").split("/");

	if (!articleCategories.has(category!)) {
		return <NotFound page="頁面" backToHref="/" backToPageLabel="首頁" />;
	}

	return <NotFound page="文章" backToHref={`/${category}`} backToPageLabel={`${navigationItems.find(({ href }) => href === `/${category}`)!.name}頁面`} />;
}
