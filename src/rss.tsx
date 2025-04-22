import posts from "./posts";
import icon from "./icons/favicon.svg";

export default function Rss() {
	return (
		<rss version="2.0">
			<channel>
				<title>zallen</title>
				<description>Tech things</description>
				<icon>{icon}</icon>
				{Object.entries(posts).map(([path, { frontmatter, preview }]) => (
					<item>
						<title>{frontmatter.title}</title>
						<link>{path}</link>
						<description>{preview}</description>
						<pubDate>{new Date(frontmatter.date).toUTCString()}</pubDate>
						<lang>en-US</lang>
					</item>
				))}
			</channel>
		</rss>
	);
}
