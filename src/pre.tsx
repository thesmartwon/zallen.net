import type { ComponentChildren } from "preact";

export function Pre(props: { fname?: string; children: ComponentChildren }) {
	return (
		<figure>
			<figcaption class="pl-2 bg-primary/20 text-text/90">
				<cite class="flex-1">{props.fname ?? "​"}</cite>
			</figcaption>
			<pre class="m-0">{props.children}</pre>
		</figure>
	);
}
