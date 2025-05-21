import type { NextConfig } from "next";

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
} satisfies NextConfig;
