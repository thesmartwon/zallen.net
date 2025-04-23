import type { BunPlugin } from "bun";
import { basename } from "node:path";
import { readFile } from "node:fs/promises";
import { compile } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeMdxImportMedia from "rehype-mdx-import-media";
import rehypeMdxExcerpt from "./rehype-mdx-excerpt";
import rehypeStarryNight from "rehype-starry-night";
//https://github.com/wooorm/starry-night/blob/main/lib/all.js
import sourceZig from "@wooorm/starry-night/source.zig";
import sourceTs from "@wooorm/starry-night/source.ts";
import sourceJs from "@wooorm/starry-night/source.js";
import sourceC from "@wooorm/starry-night/source.c";
import sourceCPlatform from "@wooorm/starry-night/source.c.platform";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import { reporter } from "vfile-reporter";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

const name = "mdPlugin";
const mdPlugin: BunPlugin = {
	name,
	setup(build) {
		build.onLoad({ filter: /\.md$/ }, async (args) => {
			const file = await readFile(args.path, "utf8");
			const contents = await compile(file, {
				jsx: true,
				jsxImportSource: "preact",
				//providerImportSource: "",
				remarkPlugins: [
					remarkPresetLintConsistent,
					remarkPresetLintRecommended,
					remarkFrontmatter,
					remarkMdxFrontmatter,
				],
				rehypePlugins: [
					rehypeMdxImportMedia,
					rehypeMdxExcerpt,
					[
						rehypeStarryNight,
						{
							grammars: [
								sourceZig,
								sourceTs,
								sourceJs,
								sourceC,
								sourceCPlatform,
							],
						},
					],
					rehypeMdxCodeProps,
				],
			});
			if (contents.messages.length)
				console.error(basename(args.path), reporter(contents));

			return { contents: contents.toString(), loader: "jsx" };
		});
	},
};

export default mdPlugin;
