type Frontmatter = {
	title: string;
	date: string;
};
type Post = {
	default: AnyComponent;
	excerpt: string;
	basename: string;
	frontmatter: Frontmatter;
};
declare module "*.md" {
	const md: Post;
	export = md;
}
