import { h } from "preact";
import { render } from "preact-render-to-string";
import mdPlugin from "./markdown";
import tailwindPlugin from "bun-plugin-tailwind";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import routes from "../src/routes";

// client build
const res = await Bun.build({
	entrypoints: ["./index.html"],
	plugins: [mdPlugin, tailwindPlugin],
	outdir: "dist",
	publicPath: "/",
	minify: true,
});
res.logs.forEach((l) => console.log(l));
const htmlOut = res.outputs.find((o) => o.path.endsWith(".html"));
if (!htmlOut) throw new Error("missing HTML output");
const appHtml = readFileSync(htmlOut.path, "utf8").replace(
	/<script.*<\/script>/g,
	"",
);

// server build
const app = await Bun.build({
	entrypoints: ["./src/app.tsx"],
	plugins: [mdPlugin, tailwindPlugin],
	outdir: "tmp",
	sourcemap: "linked",
	packages: "external",
	target: "bun",
	throw: true,
});

// server prerender
const jsOut = app.outputs.find((o) => o.path.endsWith(".js"));
if (!jsOut) throw new Error("missing JS output");
const { App } = await import(jsOut.path);
// @ts-ignore
globalThis.location = {
	href: "http://localhost:3000/posts/zig-good",
	origin: "http://localhost:3000",
	protocol: "http:",
	host: "localhost:3000",
	hostname: "localhost",
	port: "3000",
	pathname: "/posts/zig-good",
	search: "",
	hash: "",
};

for (const route of routes) {
	globalThis.location.pathname = route.path ?? "404";
	let path = join("dist", globalThis.location.pathname);
	if (path.endsWith("/")) path += "index";
	if (!basename(path).includes(".")) {
		path += ".html";
	}
	console.log(path);

	let out = render(h(App, {}));
	if (path.endsWith(".html")) {
		out = appHtml.replace("</body>", `${out}</body>`);
	}
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, out);
}
