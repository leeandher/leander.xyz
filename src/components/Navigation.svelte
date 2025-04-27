<script lang="ts">
  import { send, receive } from "src/styles/comet";
  import { navState } from "src/utils/navState.svelte";
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
          <span
            class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-snap"
          ></span>
          <a href="/writings">writings</a>
        </li>
      {/if}

      <li
        class="relative"
        in:receive={{ key: "wares" }}
        out:send={{ key: "wares" }}
      >
        <span
          class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-crackle"
        ></span>
        <a href="/wares">wares</a>
      </li>

      <li
        class="relative"
        in:receive={{ key: "work" }}
        out:send={{ key: "work" }}
      >
        <span
          class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-pop"
        ></span>
        <a href="/work">work</a>
      </li>
    </ul>
  </div>
</nav>
