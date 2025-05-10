<script lang="ts">
  const baseInstructions = "hey there, shoes off indoors please.";
  let instructions = $state(baseInstructions);
  let shoes = $state<string[]>(["[your right shoe]", "[your left shoe]"]);
  let mat = $state<HTMLParagraphElement | null>(null);

  function addShoe() {
    const nextShoe = shoes.pop();
    if (!nextShoe || !mat) {
      return;
    }
    mat.textContent += nextShoe;
    instructions =
      shoes.length === 1
        ? `${baseInstructions} both please.`
        : `${baseInstructions} thank you!`;
  }
</script>

<p>{instructions}</p>
<div
  class={[
    "border-base/60 border-8 border-double w-sm my-4 rotate-6 h-24 bg-surface-alt px-1 break-words select-none",
    shoes.length && "hover:cursor-pointer",
  ]}
  aria-hidden="true"
  onclick={addShoe}
>
  <p
    class="absolute inset-0 -z-1 self-center text-center font-fancy text-base/35 text-3xl"
  >
    Welcome Mat
  </p>
  <p class="font-bold" bind:this={mat}></p>
</div>
