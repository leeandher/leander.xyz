<script lang="ts">
  let y = $state.raw(0);
  let visible = $derived(y > 500);
</script>

<svelte:window bind:scrollY={y} />

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
    <ul
      class={[
        "flex w-full justify-end gap-6 items-center transition-opacity",
        visible ? "opacity-100" : "opacity-0",
        "hover:opacity-100",
      ]}
    >
      <li class="relative bar before:bg-snap">
        <a href="/writings">writings</a>
      </li>
      <li class="relative bar before:bg-crackle">
        <a href="/wares">wares</a>
      </li>
      <li class="relative bar before:bg-pop">
        <a href="/work">work</a>
      </li>
    </ul>
  </div>
</nav>

<style>
  .bar:before {
    content: "";
    z-index: -1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
  }
</style>
