import type { Posts } from ".";

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
					({ frontmatter: fm, html, basename }) => {
						const preview = document.createElement("p");
						preview.innerHTML = html;
						return (
							<li>
								<h2 class="text-xl mt-2">
									<a href={`/posts/${basename}`}>{fm.title}</a>
								</h2>
								{new Date(fm.date).toISOString().substring(0, 10)}
								<p>{preview.innerText.substring(0, 200)}</p>
							</li>
						);
					},
				)}
			</ul>
		</div>
	);
}
