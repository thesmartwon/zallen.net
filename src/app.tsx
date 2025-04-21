import posts from "./posts";
import type { AnyComponent } from "preact";
import {
	ErrorBoundary,
	LocationProvider,
	Route,
	Router,
} from "preact-iso";
import { Home } from "./home";
import { CV } from "./cv";
import { NotFound } from "./404";
import { Nav } from "./nav";
import { Post } from "./post";

export type Posts = typeof posts;

const NavLayout =
	(Comp: AnyComponent<{ posts: Posts }>) => () => (
		<div class="max-w-3xl m-auto">
			<Nav />
			<Comp posts={posts} />
		</div>
	);

export const App = () => (
	<LocationProvider>
		<ErrorBoundary>
			<Router>
				<Route path="/" component={NavLayout(Home)} />
				<Route path="/cv" component={NavLayout(CV)} />
				<Route default component={NavLayout(NotFound)} />
				<Route path="/posts/:post" component={NavLayout(Post)} />
			</Router>
		</ErrorBoundary>
	</LocationProvider>
);
