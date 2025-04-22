<script lang="ts">
  import type { Action } from "svelte/action";
  import { WritingsLink } from "./NavigationLinks.svelte";
  import { intersectionObserver } from "../utils/intersectionObserver.svelte";
  import { navState } from "../utils/navState.svelte";

  let isShowcased = $state.raw(false);
</script>

<section class="mx-4 h-screen flex flex-col justify-center">
  <div class="mx-auto whitespace-nowrap">
    <p
      class="font-fancy text-base/70 text-2xl sm:text-3xl mb-0 lg:text-4xl lg:-mb-10"
    >
      heyyo. welcome to
    </p>
    <div
      class="font-fancy text-base flex text-5xl sm:text-7xl lg:text-9xl"
      use:intersectionObserver={{
        viewCallback: (viewRatio) => {
          navState.writings = viewRatio > 0.5 ? "showcase" : "nav";
        },
      }}
    >
      <a class="text-snap" href="/writings">w</a>
      {#if navState.writings === "showcase"}
        {@render WritingsLink({
          element: "div",
          class: "relative",
          text: "ritings",
        })}
      {/if}
    </div>

    <p class="font-sans text-base/70 mt-4 text-right">
      my name is leander rodrigues. <br />this is my corner of the internet.
      <br />and i got some stuff around here.
    </p>
  </div>
</section>
