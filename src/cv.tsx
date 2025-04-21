const employers = {
	"Polygon.io": {
		href: "https://polygon.io",
		position: "Software Engineer",
		roles: [
			<span>
				Implemented packet capture and upload to S3 for high-frequency{" "}
				<a href="https://www.opraplan.com/">OPRA</a> feed using an{" "}
				<a href="https://www.napatech.com/products/nt100a01-smartnic-capture/">
					ASIC card
				</a>{" "}
				and{" "}
				<a href="https://wiki.archlinux.org/title/Systemd#Writing_unit_files">
					Systemd units.
				</a>
			</span>,
			<span>
				Wrote data pipeline tools for S3 files and deployed them as{" "}
				<a href="https://kubernetes.io/">Kubernetes</a> jobs.
			</span>,
			<span>
				Wrote and maintained a{" "}
				<a href="https://github.com/polygon-io/client-python">
					Python client library
				</a>{" "}
				for customers.
			</span>,
			<span>
				Made Raspberry Pi image based off{" "}
				<a href="https://www.raspbian.org/">Raspbian</a> to login to websites
				using{" "}
				<a href="https://sites.google.com/chromium.org/driver/">ChromeDriver</a>{" "}
				for office TV <a href="https://grafana.com/">Grafana</a> dashboards.
			</span>,
			<span>
				Architected <a href="https://clickhouse.com/">ClickHouse</a> database
				for querying trades and quotes and creating their aggregates.
			</span>,
		],
		technologies: [
			"Git",
			"Go",
			"Rust",
			"Grafana",
			"S3",
			"Ceph",
			"Kubernetes",
			"Elasticsearch",
			"Raspbian",
			"PCAP",
			"systemd",
			"Bash",
			"Python",
			"ClickHouse",
		],
		start: "2021-10",
		end: "2022-11",
	},
	"Red Hat": {
		href: "https://www.redhat.com/en",
		position: "Frontend Build Engineer",
		roles: [
			<span>
				Refactored a{" "}
				<a href="https://patternfly.org">
					React component library's documentation
				</a>{" "}
				to use a shared language for both designers and developers.
			</span>,
			<span>
				Optimized <a href="https://www.patternfly.org/">PatternFly</a>'s bundle
				sizes using <a href="https://webpack.js.org/">Webpack</a>. Deployed it
				to <a href="https://aws.amazon.com/cloudfront/">AWS Cloudfront</a>.
			</span>,
			<span>
				Wrote a lightweight TypeScript transpiler plugin for{" "}
				<a href="https://github.com/acornjs/acorn">Acorn</a> to implement a{" "}
				<a href="https://www.patternfly.org/components/button">
					live TypeScript editor
				</a>
				.
			</span>,
			<span>
				Wrote{" "}
				<a href="https://www.patternfly.org/components/date-and-time/date-picker">
					Date Picker
				</a>{" "}
				and{" "}
				<a href="https://www.patternfly.org/components/jump-links/react-demos">
					Scroll Spy
				</a>{" "}
				components.
			</span>,
		],
		start: "2019-02",
		end: "2021-10",
		technologies: [
			"Git",
			"Monorepos",
			"React",
			"JSX",
			"Node.js",
			"npm",
			"Typescript",
			"Javascript",
			"HTML",
			"CSS",
			"Webpack",
			"TravisCI",
			"CircleCI",
			"Github Actions",
			"AWS",
			"S3",
			"Markdown",
		],
	},
	NCSU: {
		href: "https://www.ncsu.edu/",
		position: "Research Assistant",
		roles: [
			"Researched methods to wirelessly stream low latency video to an embedded device. Achieved 0.02 seconds of latency.",
		],
		start: "2017-05",
		end: "2018-12",
		technologies: ["Git", "C", "C++", "Raspberry Pi", "H264"],
	},
	LexisNexis: {
		href: "https://www.lexisnexis.com/en-us/about-us/about-us.page",
		position: "Devops Intern",
		roles: [
			<span>
				Maintained microservice deployments using{" "}
				<a href="https://gradle.org/">Gradle</a> and{" "}
				<a href="https://www.jenkins.io/">Jenkins</a> on{" "}
				<a href="https://aws.amazon.com/">AWS.</a>
			</span>,
			<span>
				Wrote live service health-check dashboard using{" "}
				<a href="https://www.splunk.com/">Splunk.</a>
			</span>,
			<span>
				Wrote secret management system for Jenkins jobs using{" "}
				<a href="https://www.hashicorp.com/products/vault">Hashicorp Vault</a>{" "}
				and <a href="https://aws.amazon.com/kms/">AWS KMS.</a>
			</span>,
		],
		start: "2018-05",
		end: "2018-08",
		technologies: [
			"Git",
			"Gradle",
			"Jenkins",
			"AWS",
			"Splunk",
			"Vault",
			"Java",
		],
	},
	"Lambert's Cable Splicing": {
		href: "https://www.lambertcable.com",
		position: "Software Developer",
		roles: [
			<span>
				Created{" "}
				<a href="https://www.microsoft.com/en-us/sql-server">
					Microsoft SQL database
				</a>{" "}
				for asset tracking system. Wrote{" "}
				<a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete">
					CRUD
				</a>{" "}
				Microsoft .NET application for it in VB and C#.
			</span>,
			"Automated Word document generation.",
			<span>
				Replaced Microsoft IE webdriver with{" "}
				<a href="https://www.selenium.dev/">Selenium.</a>
			</span>,
		],
		start: "2015-06",
		end: "2017-06",
		technologies: ["Git", ".NET", "C#", "Visual Basic", "SQL", "C#"],
	},
};
//const unpaid = {
//	Zig: {}
//};
const proficiencies = {
	Julia: { href: "https://julialang.org/" },
	Postgres: { href: "https://www.postgresql.org/docs/" },
	x86: {
		href: "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html",
	},
	Zig: { href: "https://ziglang.org/" },
	Solid: { href: "https://www.solidjs.com/" },
	Bun: { href: "https://bun.sh/" },
	Vite: { href: "https://vite.dev/" },
	Cloudflare: { href: "https://www.cloudflare.com/" },
};

//<ul class="flex justify-center gap-2">
//	<li>
//		<a href="https://github.com/thesmartwon">Github 1</a>
//	</li>
//	<li>
//		<a href="https://github.com/clickingbuttons">Github 2</a>
//	</li>
//	<li>
//		<a href="https://github.com/redallen">Github 3</a>
//	</li>
//	<li>
//		<a href="mailto:hireme@zallen.net">hireme@zallen.net</a>
//	</li>
//	<li class={classes.noPrint}>
//		<a href="/resume.pdf" target="_blank" rel="noreferrer">
//			PDF
//		</a>
//	</li>
//</ul>

export function CV() {
	return (
		<div>
			<p class="mb-2">
				Full-stack developer who can write, debug, test, and deploy software for
				modern platforms. I am currently pursuing{" "}
				<a href="https://dawesome.io/">passion</a>{" "}
				<a href="https://openbible.io">projects</a>, but am open to work if our
				passions align. Here are some of my past experiences:
			</p>
			{Object.entries(employers).map(([employer, job]) => (
				<>
					<div class="flex mb-1">
						<h3 class="text-lg">
							{job.position} @ <a href={job.href}>{employer}</a>
						</h3>
						<div class="flex-1" />
						<span class="text-lg">
							{job.start} - {job.end}
						</span>
					</div>
					<div class="col-[1/4] mb-4">
						<ul class="list-disc list-inside">
							{job.roles.map((r) => (
								<li>{r}</li>
							))}
							<li>
								Used{" "}
								{job.technologies
									.slice(0, job.technologies.length - 1)
									.join(", ")}
								, and {job.technologies[job.technologies.length - 1]}.
							</li>
						</ul>
					</div>
				</>
			))}
			<h2 class="text-xl mt-1">Education</h2>
			<p class="mb-4">
				I have been programming from internet tutorials since 2005. I hold a
				Bachelor of Science in Computer Science from{" "}
				<a href="https://www.csc.ncsu.edu"> NCSU</a> (2018).
			</p>
			<h2 class="text-xl mt-1">Links</h2>
			<p class="mb-4">
				Check my <a href="https://github.com/thesmartwon">Github</a> for current
				projects. Check my <a href="/">blog</a> for past projects. If you are
				interested in working together, email{" "}
				<a href="mailto:hireme@zallen.net">hireme@zallen.net</a>.
			</p>
		</div>
	);
}
