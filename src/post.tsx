import { Pre } from "./pre";

export function Post(props: { post: Post }) {
	const { frontmatter } = props.post;

	return (
		<div>
			<h1 class="text-2xl mt-8">{frontmatter.title}</h1>
			<div>{new Date(frontmatter.date).toISOString().substring(0, 10)}</div>
			<div class="prose dark:prose-invert max-w-none">
				<props.post.default components={{ pre: Pre }} />
			</div>
		</div>
	);
}
