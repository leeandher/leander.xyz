<script lang="ts">
  import type { Action } from "svelte/action";
  import { WritingsLink } from "./NavigationLinks.svelte";
  import { intersectionObserver } from "../utils/intersectionObserver.svelte";

  let isReady = $state.raw(false);
</script>

<section class="mx-4 h-screen flex flex-col justify-center">
  <div class="mx-auto whitespace-nowrap">
    <p
      class="font-fancy text-base/70 text-2xl sm:text-3xl mb-0 lg:text-4xl lg:-mb-10"
    >
      heyyo. welcome to
    </p>
    <div
      class="font-fancy text-base inline-block text-5xl sm:text-7xl lg:text-9xl"
      use:intersectionObserver={{
        viewCallback: (viewRatio) => {
          console.log(viewRatio);
          isReady = viewRatio > 0.3;
          // console.log(isInView);
        },
      }}
    >
      {@render WritingsLink({ element: "div", class: "relative" })}
    </div>

    <p class="font-sans text-base/70 mt-4 text-right">
      my name is leander rodrigues. <br />this is my corner of the internet.
      <br />and i got some stuff around here.
    </p>
  </div>
</section>
