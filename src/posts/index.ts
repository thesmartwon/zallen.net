import test from "./test.md";
import test2 from "./test2.md";

export default [test, test2]
	.sort((a, b) => a.frontmatter.date.localeCompare(b.frontmatter.date))
	.reduce(
		(acc, cur) => {
			acc[cur.basename] = cur;
			return acc;
		},
		{} as Record<string, Post>,
	);
