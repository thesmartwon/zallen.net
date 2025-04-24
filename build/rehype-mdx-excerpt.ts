import type { Root } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import type { Plugin } from "unified";
import { EXIT, visit } from "unist-util-visit";
import { define } from "unist-util-mdx-define";
import { valueToEstree } from "estree-util-value-to-estree";

export interface Options {
	name?: string;
	tag?: string;
}

const defaults: Required<Options> = {
	name: "excerpt",
	tag: "p",
};

const rehypeMdxExcerpt: Plugin<[Options?], Root> = (
	opts?: Options,
) => {
	const options = { ...defaults, ...opts };

	return (tree, vfile) => {
		let data = "";

		visit(tree, "element", (node) => {
			if (node.tagName !== options.tag) return;
			const str = hastToString(node);
			if (str.length) {
				data = str;
				return EXIT;
			}
		});

		define(tree, vfile, {
			[options.name]: valueToEstree(data, { preserveReferences: true }),
		});
	};
};

export default rehypeMdxExcerpt;
