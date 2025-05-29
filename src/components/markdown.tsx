// Code modified from: https://github.com/strapi/strapi/blob/c72b48da735f44a3ccafb7a6dc9ba5213f3844db/packages/core/content-manager/admin/src/pages/EditView/components/FormInputs/Wysiwyg/PreviewWysiwyg.tsx

import { useMemo } from "react";
import sanitizeHtml from "sanitize-html";
import md from "@/lib/markdown";
import { cn } from "@/lib/utils";

import type { ComponentPropsWithRef } from "react";

export default function Markdown({ children, className, ref }: Omit<ComponentPropsWithRef<"div">, "children"> & { children?: string | null | undefined }) {
	const html = useMemo(() =>
		sanitizeHtml(md.render(children?.replaceAll("\\n", "\n") || ""), {
			...sanitizeHtml.defaults,
			allowedTags: false,
			allowVulnerableTags: true, // MarkdownIt sanitizes <style> and <script> tags for us
			allowedAttributes: {
				"*": ["href", "align", "alt", "center", "width", "height", "type", "controls", "target"],
				"img": ["src", "alt"],
				"source": ["src", "type"],
			},
		}), [children]);

	return <div ref={ref} className={cn("prose prose-red max-w-none", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
