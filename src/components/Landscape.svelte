<script lang="ts">
  // TODO(Leander): Most of this can probably be removed
  import { untrack } from "svelte";
  import { Spring } from "svelte/motion";
  let spin = new Spring(0, { stiffness: 0.05, damping: 0.75 });
  let spinRadius = 25;
  const initialSize = 20;
  let currentX = $state(-50);
  let currentY = $state(-50);
  let size = new Spring(initialSize);

  let trailCoords = $state([...Array(3).keys()].map(createFollower));

  function createFollower(position: number) {
    return new Spring(
      untrack(() => ({ x: currentX, y: currentY })),
      {
        stiffness: 0.1 - 0.002 * position,
        damping: 0.25 + 0.01 * position,
      }
    );
  }
</script>

<svelte:body
  onmousemove={(e) => {
    currentX = e.clientX;
    currentY = e.clientY;
    trailCoords.forEach((tC) => (tC.target = { x: e.clientX, y: e.clientY }));
    spin.target -= 3.14 / 18;
  }}
  ondblclick={() => {
    size.target = size.target === initialSize ? 0 : initialSize;
  }}
/>

<div class="fixed inset-0 -z-1">
  <svg class="w-full h-full">
    {#each trailCoords as coord, index (index)}
      <circle
        cx={coord.current.x + Math.cos(spin.current) * spinRadius}
        cy={coord.current.y - Math.sin(spin.current) * spinRadius}
        r={size.current}
        class="fill-snap opacity-15"
      ></circle>
      <circle
        cx={coord.current.x +
          Math.cos(spin.current + (2 * 3.14) / 3) * spinRadius}
        cy={coord.current.y -
          Math.sin(spin.current + (2 * 3.14) / 3) * spinRadius}
        r={size.current}
        class="fill-crackle opacity-15"
      ></circle>
      <circle
        cx={coord.current.x +
          Math.cos(spin.current + (4 * 3.14) / 3) * spinRadius}
        cy={coord.current.y -
          Math.sin(spin.current + (4 * 3.14) / 3) * spinRadius}
        r={size.current}
        class="fill-pop opacity-15"
      ></circle>
    {/each}
  </svg>
</div>
