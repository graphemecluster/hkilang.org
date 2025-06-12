import { transform } from "@babel/core";
import presetEnv from "@babel/preset-env";
import pluginSyntaxTypeScript from "@babel/plugin-syntax-typescript";
import pluginSyntaxJsx from "@babel/plugin-syntax-jsx";

import { packages } from "../bun.lock" with { type: "json" };

import type { LoaderDefinitionFunction } from "webpack";

const coreJsVersion = packages["core-js"][0].slice("core-js@".length);

// TODO: Update `@babel/*` to a stable version

export default (function injectPolyfillLoader(source, inputSourceMap) {
	const callback = this.async();
	transform(source, {
		presets: [
			[presetEnv, {
				targets: "> 0.5%, > 0.5% in HK, not dead",
				useBuiltIns: "usage",
				corejs: {
					version: coreJsVersion,
					proposals: true,
				},
				shippedProposals: true,
				// Preserve modules as-is.
				modules: false,
				// Syntax transformations could have been disabled by `/transform-/`,
				// but SWC doesn't transpile features like Unicode sets regex for us, so let's keep them included.
				exclude: [/^es(next)?\.(map|set|iterator)\./],
				// debug: true,
			}],
		],
		plugins: [
			// These plugins allow syntax parsing and won't transpile code.
			pluginSyntaxTypeScript,
			pluginSyntaxJsx,
		],
		filename: this.resourcePath,
		sourceMaps: true,
		inputSourceMap,
		retainLines: true,
		// Disable other transformations (like TS and JSX transpilation) since SWC will handle them.
		babelrc: false,
		configFile: false,
	}, (err, result) => {
		if (err) return callback(err);
		callback(null, result.code, result.map);
	});
} satisfies LoaderDefinitionFunction);
