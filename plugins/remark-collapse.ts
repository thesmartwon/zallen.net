import type { Plugin } from "unified";
import { CONTINUE, visit } from "unist-util-visit";
import type { Root as MdastRoot } from "mdast";
import { toString as mdToString } from "mdast-util-to-string";

export interface Options {
	test?: string;
}

const defaults: Required<Options> = {
	test: "(table[ -]of[ -])?contents?|toc",
};

const remarkCollapse: Plugin<[Options?], MdastRoot> = (opts?: Options) => {
	const options = { ...defaults, ...opts };
	const re = new RegExp(`^(${options.test})$`, "i");

	return (tree) => {
		visit(tree, "heading", (node, i, parent) => {
			const str = mdToString(node);
			if (!re.test(str)) return CONTINUE;

			const nextEle = parent?.children.splice((i ?? 0) + 1, 1);
			parent?.children.splice((i ?? 0), 1, {
				type: "mdxJsxFlowElement",
				name: "details",
				children: [
					{
						type: "mdxJsxFlowElement",
						name: "summary",
						children: [{ type: "text", value: str }],
					},
					...(nextEle ?? []),
				],
			});
		});
	};
};

export default remarkCollapse;
