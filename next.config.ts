import type { NextConfig } from "next";

const STRAPI_URL = process.env["NEXT_PUBLIC_STRAPI_URL"] || "http://localhost:1337/api";

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
} satisfies NextConfig;
