import { defineEcConfig } from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineEcConfig({
	frames: {
		showCopyToClipboardButton: false,
		extractFileNameFromCode: false,
	},
	useStyleReset: false,
	useThemedScrollbars: false,
	useThemedSelectionColors: false,
	plugins: [pluginLineNumbers()],
	// defaultProps for all code blocks in project
	defaultProps: {
		showLineNumbers: false,
		overridesByLang: {
			'js,ts,html,zig': {
				showLineNumbers: true,
			},
		},
	},
})
