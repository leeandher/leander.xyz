<script lang="ts">
  import { getContext } from "svelte";
  import { send, receive } from "../styles/transition";
  import { WaresLink, WorkLink } from "./NavigationLinks.svelte";
  import WritingsLink from "./WritingsLink.svelte";
  import { navState } from "../utils/navState.svelte";
</script>

<nav class="w-full fixed z-10 bg-surface group">
  <div class="flex pl-4 pr-8 py-5 relative">
    <span
      class="absolute block inset-0 top-full h-6 bg-gradient-to-b from-surface"
      aria-hidden="true"
    ></span>
    <a href="/">
      <img
        src="/favicon.svg"
        alt="test"
        class="transition-transform duration-500 rotate-0 group-hover:rotate-360"
      />
    </a>
    <ul class="flex w-full justify-end gap-6 items-center">
      {#if navState.writings === "nav"}
        <li
          class="relative"
          in:receive={{ key: "writings" }}
          out:send={{ key: "writings" }}
        >
          <WritingsLink />
        </li>
      {/if}
      {@render WaresLink({ element: "li", class: "relative" })}
      {@render WorkLink({ element: "li", class: "relative" })}
    </ul>
  </div>
</nav>
