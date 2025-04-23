import type { Posts } from "./routes";

export function Home(props: { posts: Posts }) {
	return (
		<div>
			<p>
				Christian programmer working on{" "}
				<a href="https://dawesome.io/">passion</a>{" "}
				<a href="https://openbible.io">projects</a>.
			</p>
			<h1>Posts</h1>
			<ul>
				{Object.entries(props.posts).map(([path, post]) => (
					<PostCard path={path} post={post} />
				))}
			</ul>
		</div>
	);
}

function PostCard(props: { path: string; post: Post }) {
	const { frontmatter: fm, excerpt } = props.post;

	return (
		<li>
			<h2>
				<a href={props.path}>{fm.title}</a>
			</h2>
			<p>{new Date(fm.date).toISOString().substring(0, 10)}</p>
			<div dangerouslySetInnerHTML={{ __html: excerpt }} />
		</li>
	);
}
