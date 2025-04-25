import type { AnyComponent } from "preact";
import { Home } from "./home";
import { CV } from "./cv";
import { NotFound } from "./404";
import { Post } from "./post";
import { Nav } from "./nav";
import posts from "./posts";
import type { RouteProps } from "preact-iso";
import Rss from "./rss";

export type Posts = typeof posts;

const NavLayout =
	(Comp: AnyComponent<{ posts: Posts }>) => () => (
		<>
			<Nav />
			<Comp posts={posts} />
		</>
	);

export default [
	{ path: "/", component: NavLayout(Home) },
	{ path: "/cv", component: NavLayout(CV) },
	{ path: "/feed.xml", component: Rss },
	{ default: true, component: NavLayout(NotFound) },
	...Object.entries(posts).map(([path, post]) => ({
		path, component: NavLayout(() => <Post post={post} />),
	}))
] as RouteProps<any>[];
