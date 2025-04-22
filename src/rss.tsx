import posts from "./posts";

export default function Rss() {
	return (
		<rss version="2.0">
			<channel>
				<title>zallen</title>
				<description>Tech things</description>
				{Object.entries(posts).map(([slug, { frontmatter, preview }]) => (
					<item>
						<title>{frontmatter.title}</title>
						<link>{slug}</link>
						<description>{preview}</description>
						<pubDate>{new Date(frontmatter.date).toUTCString()}</pubDate>
						<lang>en-US</lang>
					</item>
				))}
			</channel>
		</rss>
	);
}
