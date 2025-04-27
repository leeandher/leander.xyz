// @ts-check

export default {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
  ],
  overrides: [
    { files: "*.astro", options: { parser: "astro" } },
    { files: "*.svelte", options: { parser: "svelte" } },
  ],
};
