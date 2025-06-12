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
	webpack(config, { isServer }) {
		const originalEntry = config.entry;
		config.entry = async () => {
			const entries = await originalEntry();
			if (!isServer && entries["main.js"] && !entries["main.js"].includes("./src/lib/polyfills.ts")) {
				entries["main.js"].unshift("./src/lib/polyfills.ts");
			}
			return entries;
		};
		return config;
	},
} satisfies NextConfig;
