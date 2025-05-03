import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkToc from "remark-toc";
import remarkCollapse from "./plugins/remark-collapse";
import expressiveCode from "astro-expressive-code";

import preact from "@astrojs/preact";

export const tocRegex = "(table[ -]of[ -])?contents?|toc";

// https://astro.build/config
export default defineConfig({
    site: "https://zallen.net",
    integrations: [expressiveCode(), mdx(), preact()],
    devToolbar: {
        enabled: false
    },
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [
            [remarkToc, { heading: tocRegex }],
            [remarkCollapse, { test: tocRegex }],
        ],
    },
});