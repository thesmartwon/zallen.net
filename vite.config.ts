import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';

export default {
	plugins: [
		solidPlugin(),
		solidSvg(),
	],
	build: {
		target: 'esnext',
	},
};
