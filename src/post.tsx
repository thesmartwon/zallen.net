import { Pre } from "./pre";
import { Img } from "./img";

export function Post(props: { post: Post }) {
	const { frontmatter } = props.post;

	return (
		<main class="prose">
			<h1 class="text-2xl mt-8">{frontmatter.title}</h1>
			<div>{new Date(frontmatter.date).toISOString().substring(0, 10)}</div>
			<props.post.default components={{ pre: Pre, img: Img }} />
		</main>
	);
}
