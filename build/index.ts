import { h } from "preact";
import { render } from 'preact-render-to-string';
import mdPlugin from "./markdown";
import tailwindPlugin from "bun-plugin-tailwind";
import { Window } from "happy-dom";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import routes from "../src/routes";

const res = await Bun.build({
	entrypoints: ["./index.html"],
	plugins: [mdPlugin, tailwindPlugin],
	outdir: "dist",
	publicPath: "/",
	minify: true,
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
if (!htmlOut) throw new Error("missing HTML output");
if (!jsOut) throw new Error("missing JS output");
const { App } = await import(jsOut.path);

const window = new Window({ url: "https://localhost:3000" });
// @ts-ignore
globalThis.document = window.document;
// @ts-ignore
globalThis.location = window.location;

const appHtml = readFileSync(htmlOut.path, "utf8").replace(
	/<script.*<\/script>/g,
	"",
);

for (const route of routes) {
	globalThis.location.pathname = route.path ?? "404";
	let path = join("dist", globalThis.location.pathname);
	if (path.endsWith("/")) path += "index";
	if (!basename(path).includes(".")) {
		path += ".html";
	}
	console.log(path)

	let out = render(h(App, {}));
	if (path.endsWith(".html")) {
		out = appHtml.replace("</body>", `${out}</body>`)
	}
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, out);
}
