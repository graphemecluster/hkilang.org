import { resolve } from "node:path";

import type { NextConfig } from "next";

const STRAPI_URL = process.env["STRAPI_URL"] || "http://localhost:1337/api";

export default {
	// reactStrictMode: true,
	// swcMinify: true,
	// output: "export",
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	async rewrites() {
		return ["/api/:path*", "/uploads/:path*"].map(source => ({ source, destination: `${new URL(source, STRAPI_URL)}` }));
	},
	webpack(config, { isServer, dev }) {
		if (!isServer && !dev) {
			config.module.rules.push({
				test: /\.([jt]sx?|[mc][jt]s)$/,
				exclude: /node_modules/,
				enforce: "pre",
				use: {
					loader: resolve(import.meta.dirname, "./loaders/inject-polyfill-loader.ts"),
				},
			});
		}
		return config;
	},
} satisfies NextConfig;
