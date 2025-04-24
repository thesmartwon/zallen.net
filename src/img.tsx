import type { JSX } from "preact";

export function Img(props: JSX.ImgHTMLAttributes) {
	const { className, title, ...rest } = props;

	if (title) {
		return (
			<figure class="flex flex-col items-center">
				<img class={className ?? ""} {...rest} />
				<figcaption class="text-sm italic text-text/90">{title}</figcaption>
			</figure>
		);
	}

	return <img class={`mx-auto ${className ?? ""}`} {...rest} />;
}
