<script lang="ts" module>
  import type { HTMLBaseAttributes } from "svelte/elements";
  import { send, receive } from "../styles/comet";

  interface NavigationLinkProps extends HTMLBaseAttributes {
    element: string;
    text?: string;
  }

  export { WritingsLink, WaresLink, WorkLink };
</script>

{#snippet WritingsLink({ element, text, ...rest }: NavigationLinkProps)}
  <svelte:element
    this={element}
    in:receive={{ key: "writings" }}
    out:send={{ key: "writings" }}
    {...rest}
  >
    <span
      class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-snap"
    ></span>
    <a href="/writings">{text ? text : "writings"}</a>
  </svelte:element>
{/snippet}

{#snippet WaresLink({ element, text, ...rest }: NavigationLinkProps)}
  <svelte:element
    this={element}
    in:receive={{ key: "wares" }}
    out:send={{ key: "wares" }}
    {...rest}
  >
    <span
      class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-crackle"
    ></span>
    <a href="/wares">{text ? text : "wares"}</a>
  </svelte:element>
{/snippet}

{#snippet WorkLink({ element, text, ...rest }: NavigationLinkProps)}
  <svelte:element
    this={element}
    in:receive={{ key: "work" }}
    out:send={{ key: "work" }}
    {...rest}
  >
    <span
      class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-pop"
    ></span>
    <a href="/work">{text ? text : "work"}</a>
  </svelte:element>
{/snippet}
