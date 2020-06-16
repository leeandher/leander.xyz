<template>
  <header>
    <h1>
      <span>lgr</span>
      <span class="red">.</span>
      <span>fyi</span>
    </h1>
    <p class="badge">(😭😢 end of life 💀😐)</p>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Header extends Vue {}

export default Header;
</script>

<style scoped lang="scss">
h1 {
  font-size: 5rem;
  margin: 0;
  .red {
    font-size: 7rem;
  }
}
.badge {
  background: #ff6347;
  display: inline-block;
  padding: 0.5rem;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  transform: rotate(-5deg);
  margin-top: -50px;
}
p {
}
</style>
