import { h } from "preact";
import { prerender } from "preact-iso";
import mdPlugin from "./markdown";
import tailwindPlugin from "bun-plugin-tailwind";
import { Window } from "happy-dom";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const res = await Bun.build({
	entrypoints: ["./index.html"],
	plugins: [mdPlugin, tailwindPlugin],
	outdir: "dist",
	//minify: true,
});
res.logs.forEach((l) => console.log(l));

const app = await Bun.build({
	entrypoints: ["./src/app.tsx"],
	plugins: [mdPlugin, tailwindPlugin],
	outdir: "tmp",
	sourcemap: "linked",
	packages: "external",
	target: "bun",
	throw: true,
});

const htmlOut = res.outputs.find((o) => o.path.endsWith(".html"));
const jsOut = app.outputs.find((o) => o.path.endsWith(".js"));
//const jsOut = { path: "/Users/zack/src/zallen.net/tmp/app.js" }
if (!htmlOut) throw new Error("missing HTML output");
if (!jsOut) throw new Error("missing JS output");
console.log(jsOut.path);

const window = new Window({ url: "https://localhost:3000" });
// @ts-ignore
globalThis.document = window.document;
// @ts-ignore
globalThis.location = window.location;
const { App } = await import(jsOut.path);
const { html, links } = await prerender(h(App, {}));
console.log({ html, links });

const htmlText = readFileSync(htmlOut.path, "utf8");

if (links) {
	for (const l of links) {
		if (!l.startsWith("/")) continue;
		globalThis.location.href = l;
		const { html } = await prerender(h(App, {}));
		console.log(l, html);
		let out = html;
		let path = join("dist", l);
		if (path.endsWith("/")) path += "index";
		if (!basename(path).includes(".")) {
			path += ".html";
			out = htmlText.replace("</body>", `${html}</body>`);
		}

		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, out);
	}
}
