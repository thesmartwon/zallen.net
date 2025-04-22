import type { Posts } from "./routes";

export function Home(props: { posts: Posts }) {
	return (
		<div>
			<p class="mb-2">
				Christian programmer working on{" "}
				<a href="https://dawesome.io/">passion</a>{" "}
				<a href="https://openbible.io">projects</a>.
			</p>
			<h1 class="text-2xl mb-2">Posts</h1>
			<ul>
				{Object.values(props.posts).map(
					({ frontmatter: fm, preview, basename }) => {
						return (
							<li>
								<h2 class="text-xl mt-2">
									<a href={`/posts/${basename}`}>{fm.title}</a>
								</h2>
								{new Date(fm.date).toISOString().substring(0, 10)}
								<p>{preview}</p>
							</li>
						);
					},
				)}
			</ul>
		</div>
	);
}
