import type { BunPlugin } from "bun";
import { basename, isAbsolute, join } from "node:path";
import { readFile } from "node:fs/promises";
import { marked } from "marked";
import yaml from "js-yaml";

const name = "mdPlugin";

const mdPlugin: BunPlugin = {
	name,
	setup(build) {
		build.onResolve({ filter: /\.md$/ }, (args) => {
			if (args.resolveDir === "") return;

			return {
				path: isAbsolute(args.path)
					? args.path
					: join(args.resolveDir, args.path),
				namespace: name,
			};
		});

		build.onLoad({ filter: /.*/, namespace: name }, async (args) => {
			const contents = await readFile(args.path, "utf8");
			const frontmatterRegex = /---/g;
			const start = frontmatterRegex.exec(contents);
			const end = frontmatterRegex.exec(contents);

			if (!start || !end)
				throw Error(`Post ${args.path} must contain frontmatter`);

			const frontmatter = contents.substring(start.index + 3, end.index);
			const html = marked(contents.substring(end.index + 3));

			return {
				contents: JSON.stringify({
					html,
					basename: basename(args.path, ".md"),
					frontmatter: yaml.load(frontmatter),
				}),
				loader: "json",
			};
		});
	},
};

export default mdPlugin;
