<script lang="ts">
  import { send, receive } from "../styles/transition";
  import { WaresLink, WorkLink, WritingsLink } from "./NavigationLinks.svelte";

  let scrollY = $state.raw(0);
  let visible = $derived(scrollY > 100);
</script>

<svelte:window bind:scrollY />

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
    <ul
      class={[
        "flex w-full justify-end gap-6 items-center transition-opacity",
        visible ? "opacity-100" : "opacity-0",
        "hover:opacity-100",
      ]}
    >
      {@render WritingsLink({ element: "li", class: "relative" })}
      {@render WaresLink({ element: "li", class: "relative" })}
      {@render WorkLink({ element: "li", class: "relative" })}
    </ul>
  </div>
</nav>
