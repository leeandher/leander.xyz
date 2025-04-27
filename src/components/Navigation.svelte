<script lang="ts">
  import { receive, send } from "src/styles/comet";
  import { navState } from "src/utils/navState.svelte";
</script>

<nav class="w-full fixed z-10 group">
  <div class="flex px-4 py-5 justify-between">
    <a href="/">
      <img
        src="/icons/logo-outline.svg"
        alt="leander.xyz logo"
        class="transition-transform duration-500 rotate-0 group-hover:rotate-360 w-[45px]"
      />
    </a>
    <ul
      class=" bg-surface flex justify-end px-6 py-2 rounded-full gap-6 items-center relative"
    >
      {#if navState.writings === "nav"}
        <li
          class="underline decoration-2 decoration-snap"
          in:receive={{ key: "writings" }}
          out:send={{ key: "writings" }}
        >
          <a href="/writings">writings</a>
        </li>
      {/if}
      <li
        class="underline decoration-2 decoration-crackle"
        in:receive={{ key: "wares" }}
        out:send={{ key: "wares" }}
      >
        <a href="/wares">wares</a>
      </li>
      <li
        class="underline decoration-2 decoration-pop"
        in:receive={{ key: "work" }}
        out:send={{ key: "work" }}
      >
        <a href="/work">work</a>
      </li>
    </ul>
  </div>
</nav>
