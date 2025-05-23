import postCSSNesting from "postcss-nesting";

/** @type {import("postcss-load-config").Config} */
const config = {
	plugins: [
		["tailwindcss/nesting", postCSSNesting()],
		"tailwindcss",
		"autoprefixer",
	],
};

export default config;
