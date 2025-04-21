<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";
  interface Props {
    text: string;
    element: string;
  }
  const {
    text,
    element = "div",
    ...rest
  }: Props & SvelteHTMLElements["div"] = $props();
  const characters = text.split("");
</script>

<svelte:element this={element} aria-label={text} {...rest}>
  {#each characters as character, index (index)}
    <span
      class="inline-block motion-safe:animate-bounce motion-reduce:animate-pulse"
      style={`animation-delay: ${index * 100}ms; animation-direction: reverse;`}
      role="presentation"
    >
      {character}
    </span>
  {/each}
</svelte:element>
