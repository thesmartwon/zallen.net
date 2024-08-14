import { render } from 'solid-js/web';
import { Router, Route, RouteSectionProps } from '@solidjs/router';
import { Resume } from './resume';
import { Nav } from './nav';
import './main.css';

function Home() {
	return (
		<div>
			Christian programmer and English enjoyer.
		</div>
	);
}

function Main() {
	return (
		<Router root={Root}>
			<Route component={Home} path="/" />
			<Route component={Resume} path="/resume" />
		</Router>
	);
}

function Root(props: RouteSectionProps<unknown>) {
	return (
		<>
			<Nav />
			<main>
				{props.children}
			</main>
		</>
	);
}

render(Main, document.body);
