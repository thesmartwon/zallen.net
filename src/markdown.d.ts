type Frontmatter = {
	title: string;
	date: string;
};
type Post = {
	html: string;
	basename: string;
	frontmatter: Frontmatter;
};
declare module "*.md" {
	const md: Post;
	export = md;
}
