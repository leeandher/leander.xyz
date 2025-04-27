<script lang="ts">
  import { receive, send } from "src/styles/comet";
  import { intersectionObserver } from "src/utils/intersectionObserver.svelte";
  import { navState } from "src/utils/navState.svelte";
</script>

<section class="mx-4 h-screen flex flex-col justify-start">
  <div
    class=" lg:text-9xl font-fancy text-base flex text-5xl sm:text-7xl"
    use:intersectionObserver={{
      viewCallback: (viewRatio) => {
        navState.writings = viewRatio > 0.5 ? "showcase" : "nav";
      },
    }}
  >
    <a class="text-snap" href="/writings">w</a>
    {#if navState.writings === "showcase"}
      <div
        class="relative"
        in:receive={{ key: "writings" }}
        out:send={{ key: "writings" }}
      >
        <span
          class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-snap"
        ></span>
        <a href="/writings">ritings</a>
      </div>
    {/if}
  </div>
</section>
