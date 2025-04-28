<script lang="ts">
  import { receive, send } from "src/styles/comet";

  type CrossLocation =
    | "port"
    | "home"
    | "writings"
    | "wares"
    | "work"
    | "github"
    | "linkedin";

  let crossLocation = $state.raw<CrossLocation>("port");
</script>

<footer class="text-center font-pirate text-3xl">
  <form class="flex flex-col gap-2 px-4">
    <h4>bottle a message</h4>
    <div class="grid grid-cols-2 gap-2">
      <input type="text" class="border-1" placeholder="name" />
      <input type="text" class="border-1" placeholder="email" />
    </div>
    <div class="grid grid-cols-[1fr_auto] gap-2 px-4">
      <input type="text" class="border-1" placeholder="message" />
      <button type="submit" class="w-32">send</button>
    </div>
  </form>
  <div class="grid grid-cols-2 p-4">
    <div>
      <h4 class="text-center" onmouseenter={() => (crossLocation = "port")}>
        port
        {#if crossLocation === "port"}{@render cross()}{/if}
      </h4>
      <ul class="justify-center my-4 mx-6">
        <li class="group" onmouseenter={() => (crossLocation = "home")}>
          <a href="/home" class="group-hover:underline decoration-3 relative">
            home
            {#if crossLocation === "home"}{@render cross()}{/if}
          </a>
        </li>
        <li class="group" onmouseenter={() => (crossLocation = "writings")}>
          <a
            href="/writings"
            class="group-hover:underline decoration-snap decoration-3"
            >writings
            {#if crossLocation === "writings"}{@render cross()}{/if}
          </a>
        </li>
        <li class="group" onmouseenter={() => (crossLocation = "wares")}>
          <a
            href="/wares"
            class="group-hover:underline decoration-crackle decoration-3"
            >wares
            {#if crossLocation === "wares"}{@render cross()}{/if}
          </a>
        </li>
        <li class="group" onmouseenter={() => (crossLocation = "work")}>
          <a
            href="/work"
            class="group-hover:underline decoration-pop decoration-3"
            >work
            {#if crossLocation === "work"}{@render cross()}{/if}
          </a>
        </li>
      </ul>
    </div>

    <div>
      <h4>overseas</h4>
      <ul class="justify-center my-4 mx-6">
        <li class="group" onmouseenter={() => (crossLocation = "github")}>
          <a
            href="https://github.com/leeandher"
            target="_blank"
            class="group-hover:underline decoration-[#232925] decoration-3 relative"
            >github
            {#if crossLocation === "github"}{@render cross()}{/if}
          </a>
        </li>
        <li class="group" onmouseenter={() => (crossLocation = "linkedin")}>
          <a
            href="https://www.linkedin.com/in/leander-rodrigues/"
            target="_blank"
            class="group-hover:underline decoration-[#0a66c2] decoration-3 relative"
            >linkedin
            {#if crossLocation === "linkedin"}{@render cross()}{/if}
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="flex justify-start">
    <div>copyright 2024</div>
    <img src="/icons/logo.svg" alt="logo" class="block size-12 mx-auto" />
    <a href="https://github.com/leeandher/port" target="_blank" class="text-sm"
      >view source</a
    >
  </div>
</footer>

{#snippet cross()}
  <div
    class="inline-block"
    aria-hidden="true"
    in:receive={{ key: "footer" }}
    out:send={{ key: "footer" }}
  >
    🚢
  </div>
{/snippet}
