// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import sentry from "@sentry/astro";

export default defineConfig({
  compressHTML: true,
  integrations: [
    sentry({
      sourceMapsUploadOptions: {
        project: "leanderxyz",
        authToken: import.meta.env.SENTRY_AUTH_TOKEN,
      },
    }),
    sitemap(),
    svelte(),
  ],
  adapter: netlify(),
  vite: { plugins: [tailwindcss()] },
});
