<script>
  let counter = $state(0);
  function increment() {
    counter += 1;
    if (counter > 10) {
      throw new Error("This is a test error");
    }
  }
</script>

<button
  onclick={increment}
  class={["border-2", "rounded-sm", "block", "p-2", "bg-amber-400"]}
>
  {counter}
</button>
