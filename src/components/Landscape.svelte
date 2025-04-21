<script lang="ts">
  import { untrack } from "svelte";
  import { Spring } from "svelte/motion";
  let currentX = $state(0);
  let currentY = $state(0);

  let trailCoords = $state([...Array(3).keys()].map(createFollower));

  function createFollower(position: number) {
    return new Spring(
      untrack(() => ({ x: currentX, y: currentY })),
      { stiffness: 0.1 - 0.002 * position, damping: 0.25 + 0.01 * position }
    );
  }

  let size = new Spring(10);
</script>

<svelte:body
  onmousemove={(e) => {
    currentX = e.clientX;
    currentY = e.clientY;
    trailCoords.forEach((tC) => (tC.target = { x: e.pageX, y: e.pageY }));
  }}
  onclick={() => {
    // trailCoords.push(createFollower(trailCoords.length));
  }}
/>

<div class="absolute inset-0 -z-1">
  <svg class="w-full h-full">
    {#each trailCoords as coord, index (index)}
      <circle
        cx={coord.current.x}
        cy={coord.current.y}
        r={size.current}
        class="fill-pop-300"
      ></circle>
    {/each}
  </svg>
</div>
