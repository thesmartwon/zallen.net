export function Post(props: { post: Post }) {
	const { frontmatter, html } = props.post;

	return (
		<div>
			<h1 class="text-2xl">{frontmatter.title}</h1>
			<div>{frontmatter.date}</div>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}
