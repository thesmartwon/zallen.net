import { A } from '@solidjs/router';
import classes from './nav.module.css';

export function Nav() {
	return (
		<nav>
			<ul class={classes.nav}>
				<li><A href="/">Home</A></li>
				<li><A href="/resume">Resumé</A></li>
				<li><A href="/blog">Blog</A></li>
			</ul>
		</nav>
	);
}
