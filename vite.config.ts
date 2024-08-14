import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';

export default {
	plugins: [
		solidPlugin(),
		solidSvg({
			svgo: {
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									removeTitle: false,
								},
							},
						},
					],
				}
			},
		}),
	],
	build: {
		target: 'esnext',
	},
};
