// Code modified from: https://github.com/strapi/strapi/blob/c72b48da735f44a3ccafb7a6dc9ba5213f3844db/packages/core/content-manager/admin/src/pages/EditView/components/FormInputs/Wysiwyg/utils/mdRenderer.ts

import MarkdownIt from "markdown-it";
// @ts-expect-error - library does not export types
import abbr from "markdown-it-abbr";
import container from "markdown-it-container";
// @ts-expect-error - library does not export types
import deflist from "markdown-it-deflist";
import emoji from "markdown-it-emoji";
import footnote from "markdown-it-footnote";
// @ts-expect-error - library does not export types
import ins from "markdown-it-ins";
// @ts-expect-error - library does not export types
import mark from "markdown-it-mark";
// @ts-expect-error - library does not export types
import sub from "markdown-it-sub";
// @ts-expect-error - library does not export types
import sup from "markdown-it-sup";
import cjkFriendly from "markdown-it-cjk-friendly";

const md = new MarkdownIt({
	html: true,
	breaks: true,
	linkify: true,
	typographer: true,
})
	.use(abbr)
	.use(container, "warning")
	.use(container, "tip")
	.use(deflist)
	.use(emoji)
	.use(footnote)
	.use(ins)
	.use(mark)
	.use(sub)
	.use(sup)
	.use(cjkFriendly);

md.renderer.rules["footnote_ref"] = (tokens, idx, options, env, slf) => {
	const caption = slf.rules["footnote_caption"]?.(tokens, idx, options, env, slf);
	return `<sup class="footnote-ref"><span>${caption}</span></sup>`;
};

md.renderer.rules["footnote_anchor"] = () => {
	return ' <span class="footnote-backref">\u21a9\ufe0e</span>';
};

export default md;
