import { For } from 'solid-js';
import * as Icons from './icons/index';
import classes from './resume.module.css';

const resume = [
	{
		company: "Lambert's Cable Splicing",
		href: 'https://www.lambertcable.com',
		position: 'Software Developer',
		roles: [
			<span>
			Created <a href="https://www.microsoft.com/en-us/sql-server">Microsoft SQL database</a> for asset tracking system. Wrote CRUD Microsoft .NET application for it in VB and C#.
			</span>,
			// 'Automated tedious Word document generation.',
			<span>
				Replaced Microsoft IE webdriver with <a href="https://www.selenium.dev/">Selenium.</a>
			</span>,
		],
		start: '2015-06',
		end: '2017-06',
	},
	{
		company: 'LexisNexis',
		href: 'https://www.lexisnexis.com/en-us/about-us/about-us.page',
		position: 'Devops Intern',
		roles: [
			<span>
				Maintained microservice deployments using <a href="https://gradle.org/">Gradle</a> and <a href="https://www.jenkins.io/">Jenkins</a> on <a href="https://aws.amazon.com/">AWS.</a>
			</span>,
			<span>
				Wrote live service health-check dashboard using <a href="https://www.splunk.com/">Splunk.</a>
			</span>,
			<span>
				Wrote proof-of-concept secret management system for Jenkins jobs using <a href="https://www.hashicorp.com/products/vault">Hashicorp Vault</a> and <a href="https://aws.amazon.com/kms/">AWS KMS.</a>
			</span>,
		],
		start: '2018-05',
		end: '2018-08',
	},
	{
		company: 'North Carolina State University',
		href: 'https://www.ncsu.edu/',
		position: 'Research Assistant',
		roles: [
			'Researched methods to wirelessly stream low latency video to an embedded device. Acheived 0.02 seconds of latency.',
		],
		start: '2017-05',
		end: '2018-12',
	},
	{
		company: 'Red Hat',
		href: 'https://www.redhat.com/en',
		position: 'Build Engineer',
		roles: [
			<span>
				Refactored a <a href="https://patternfly.org">React component library's documentation</a> to
				use a shared language for both designers and developers.
			</span>,
			<span>
				Optimized <a href="https://www.patternfly.org/">PatternFly</a>'s bundle sizes using <a href="https://webpack.js.org/">Webpack.</a>
			</span>,
			<span>
				Wrote a lightweight TypeScript transpiler plugin for <a href="https://github.com/acornjs/acorn">Acorn</a> to implement a <a href="https://www.patternfly.org/components/button">live TypeScript editor.</a>
			</span>,
			<span>
				Wrote <a href="https://www.patternfly.org/components/date-and-time/date-picker">Date Picker</a> and <a href="https://www.patternfly.org/components/jump-links/react-demos">Scroll Spy</a> components.
			</span>
		],
		start: '2019-02',
		end: '2021-10',
	},
	{
		company: 'Polygon.io',
		href: 'https://polygon.io',
		position: 'Software Engineer',
		roles: [
			<span>
				Implemented packet capture and upload for high-frequency <a href="https://www.opraplan.com/">OPRA</a> feed using an <a href="https://www.napatech.com/products/nt100a01-smartnic-capture/">ASIC card</a> and <a href="https://wiki.archlinux.org/title/Systemd#Writing_unit_files">Systemd units.</a>
			</span>,
			<span>
				Wrote data pipeline tools for S3 files and deployed them as <a href="https://kubernetes.io/">Kubernetes</a> jobs.
			</span>,
			<span>
				Wrote and maintained a <a href="https://github.com/polygon-io/client-python">Python client library</a> for customers.
			</span>,
			<span>
				Made Raspberry Pi image based off <a href="https://www.raspbian.org/">Raspbian</a> to login to websites using <a href="https://sites.google.com/chromium.org/driver/">ChromeDriver</a> for office TV dashboards.
			</span>,
		],
		start: '2021-10',
		end: '2022-11',
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
			<p>
				I enjoy projects where I can empathize with the end user.
				My areas of interest include:
			</p>
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
			I have been paid for it since 2015.
			I am comfortable developing for Linux, Mac, and Windows.
			<h3>Paid</h3>
			<div class={classes.article}>
				<For each={resume.reverse()}>
					{job => (
						<>
							<h3>{job.company}</h3>
							<h4>{job.position}</h4>
							<h5>{job.start} - {job.end}</h5>
							<ul class={`${classes.roles} ${classes.interests}`}>
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
