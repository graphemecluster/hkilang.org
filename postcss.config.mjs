import autoprefixer from "autoprefixer";
import postCSSNesting from "postcss-nesting";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";

/** @type {import("postcss-load-config").Config} */
const config = {
	plugins: [
		tailwindcssNesting(postCSSNesting()),
		tailwindcss(),
		autoprefixer(),
	],
};

export default config;
