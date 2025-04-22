<script lang="ts" module>
  import type { HTMLBaseAttributes } from "svelte/elements";
  import { send, receive } from "../styles/transition";

  interface NavigationLinkProps extends HTMLBaseAttributes {
    element: string;
  }

  export { WritingsLink, WaresLink, WorkLink };
</script>

{#snippet WritingsLink({ element, ...rest }: NavigationLinkProps)}
  <svelte:element
    this={element}
    in:receive={{ key: "writings" }}
    out:send={{ key: "writings" }}
    {...rest}
  >
    <span
      class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-snap"
    ></span>
    <a href="/writings">writings</a>
  </svelte:element>
{/snippet}

{#snippet WaresLink({ element, ...rest }: NavigationLinkProps)}
  <svelte:element
    this={element}
    in:receive={{ key: "wares" }}
    out:send={{ key: "wares" }}
    {...rest}
  >
    <span
      class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-crackle"
    ></span>
    <a href="/writings">wares</a>
  </svelte:element>
{/snippet}

{#snippet WorkLink({ element, ...rest }: NavigationLinkProps)}
  <svelte:element
    this={element}
    in:receive={{ key: "work" }}
    out:send={{ key: "work" }}
    {...rest}
  >
    <span
      class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-pop"
    ></span>
    <a href="/writings">work</a>
  </svelte:element>
{/snippet}
