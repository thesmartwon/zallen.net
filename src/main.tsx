import { render } from 'solid-js/web';
import { Router, Route, RouteSectionProps } from '@solidjs/router';

function Home() {
	return 'home';
}

function Main() {
	return (
		<Router root={Root}>
			<Route component={Home} path="/" />
		</Router>
	);
}

function Root(props: RouteSectionProps<unknown>) {
	return (
		<>
			nav
			<main>
				{props.children}
			</main>
		</>
	);
}

render(Main, document.body);
