import type { Config } from "tailwindcss";

const config: Config = {
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"--tw-prose-pre-code": "var(--color-text)",
						"--tw-prose-pre-bg": "color-mix(in lab, black 5%, var(--color-bg))",
						pre: {
							'font-size': '1em',
						},
					},
				},
			},
		},
	},
};

export default config;
