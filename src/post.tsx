import { useRoute } from "preact-iso";
import type { Posts } from ".";

export function Post(props: { posts: Posts }) {
	const route = useRoute() as unknown as { post: string };
	const post = props.posts[route.post];

	return (
		<div>
			<h1 class="text-2xl">{post.frontmatter.title}</h1>
			<div>{post.frontmatter.date}</div>
			<div dangerouslySetInnerHTML={{ __html: post.html }} />
		</div>
	);
}
