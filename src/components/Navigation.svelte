<script lang="ts">
  import type { AccentColour, Category } from "src/types";
  import { navState } from "src/utils/navState.svelte";
</script>

<nav class="w-full fixed z-10 group">
  <div class="flex px-4 py-5 justify-between">
    <a href="/">
      <img
        src="/favicon.svg"
        alt="test"
        class="transition-transform duration-500 rotate-0 group-hover:rotate-360"
      />
    </a>
    <ul
      class=" bg-surface flex justify-end px-6 rounded-full gap-6 items-center relative"
    >
      {#if navState.writings === "nav"}
        {@render navItem({ key: "writings", colour: "snap" })}
      {/if}
      {@render navItem({ key: "wares", colour: "crackle" })}
      {@render navItem({ key: "work", colour: "pop" })}
    </ul>
  </div>
</nav>

{#snippet navItem({ key, colour }: { key: Category; colour: AccentColour })}
  <li class="relative underline decoration-2 decoration-{colour}">
    <a href="/{key}">{key}</a>
  </li>
{/snippet}
