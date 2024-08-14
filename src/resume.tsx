import { For } from 'solid-js';
import * as Icons from './icons/index';
import classes from './resume.module.css';

const resume = [
	{
		company: 'Company',
		position: 'Position',
		roles: [
			<p>i did this</p>,
			'i did that',
		],
		start: '2022-03-03',
		end: '2023-03-03',
	},
	{
		company: 'Company',
		position: 'Position',
		roles: [
			'i did this',
			'i did that',
		],
		start: '2022-03-03',
		end: '2023-03-03',
	},
];

export function Resume() {
	return (
		<div class={classes.resume}>
			<h1 class={classes.h1}>Zack Allen</h1>
			<ul class={classes.forges}>
				<li><a href="https://github.com/thesmartwon">Github 1</a></li>
				<li><a href="https://github.com/clickingbuttons">Github 2</a></li>
				<li><a href="https://github.com/redallen">Github 3</a></li>
				<li><a href="mailto:hireme@zallen.net">Email</a></li>
			</ul>
			<h2>Interests</h2>
			I enjoy projects where I can empathize with the end user.
			My areas of interest include:
			<ul class={classes.interests}>
				<li>Bible software</li>
				<li>music software</li>
				<li>developer tooling (CI/CD systems)</li>
				<li>public welfare (utilities, healthcare, etc.)</li>
				<li>electronic trading software</li>
			</ul>
			<h2>Technologies</h2>
			I am a full-stack developer with no preferred language or framework.
			I consider myself proficient in:
			<ul class={classes.technologies}>
				<For each={Object.entries(Icons)
					.sort(([k1], [k2]) => k1.localeCompare(k2))
					.map(([_, v]) => v)
				}>
					{Icon => (
						<li>
							<Icon width="100%" height="100%" />
						</li>
					)}
				</For>
			</ul>
			<h2>Experience</h2>
			I have been programming since 2005.
			I have been paid for it since 2013.
			<div class={classes.article}>
				<For each={resume.reverse()}>
					{job => (
						<>
							<h3>{job.company}</h3>
							<h4>{job.position}</h4>
							<h5>{job.start} - {job.end}</h5>
							<ul class={classes.roles}>
								<For each={job.roles}>
									{r => <li>{r}</li>}
								</For>
							</ul>
						</>
					)}
				</For>
			</div>
		</div>
	);
}
