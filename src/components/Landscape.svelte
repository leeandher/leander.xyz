<script lang="ts">
  import { untrack } from "svelte";
  import { Spring } from "svelte/motion";
  let spin = new Spring(0, { stiffness: 0.05, damping: 0.75 });
  let spinRadius = 25 + Math.random() * 50;
  let currentX = $state(60);
  let currentY = $state(60);
  let size = new Spring(10);

  let trailCoords = $state([...Array(3).keys()].map(createFollower));

  function createFollower(position: number) {
    return new Spring(
      untrack(() => ({ x: currentX, y: currentY })),
      { stiffness: 0.1 - 0.002 * position, damping: 0.25 + 0.01 * position }
    );
  }
</script>

<svelte:body
  onmousemove={(e) => {
    currentX = e.clientX;
    currentY = e.clientY;
    trailCoords.forEach((tC) => (tC.target = { x: e.clientX, y: e.clientY }));
    spin.target += 3.14 / 18;
  }}
  ondblclick={() => {
    if (size.target === 10) {
      size.target = 0;
    } else {
      size.target = 10;
    }
  }}
/>

<div class="fixed inset-0 -z-1">
  <svg class="w-full h-full">
    {#each trailCoords as coord, index (index)}
      <circle
        cx={coord.current.x + Math.cos(spin.current) * spinRadius}
        cy={coord.current.y - Math.sin(spin.current) * spinRadius}
        r={size.current}
        class="fill-snap-300"
      ></circle>
      <circle
        cx={coord.current.x +
          Math.cos(spin.current + (2 * 3.14) / 3) * spinRadius}
        cy={coord.current.y -
          Math.sin(spin.current + (2 * 3.14) / 3) * spinRadius}
        r={size.current}
        class="fill-crackle-300"
      ></circle>
      <circle
        cx={coord.current.x +
          Math.cos(spin.current + (4 * 3.14) / 3) * spinRadius}
        cy={coord.current.y -
          Math.sin(spin.current + (4 * 3.14) / 3) * spinRadius}
        r={size.current}
        class="fill-pop-300"
      ></circle>
    {/each}
  </svg>
</div>
