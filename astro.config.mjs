// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), sitemap()],
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
