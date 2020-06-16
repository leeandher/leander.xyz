<template>
  <footer>
    <hr />
    <p>
      Made with 🧪💥🥽 by
      <a href="https://www.leander.xyz">Leander</a>
    </p>
    <img alt="Code monkey" src="../assets/coding.svg" />
    <p>
      <small>
        SVG Credit:
        <a href="https://undraw.co/illustrations">undraw.co/illustrations</a>
      </small>
    </p>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Footer extends Vue {}

export default Footer;
</script>

<style scoped lang="scss">
p {
  font-size: 1.25rem;
}
img {
  width: 100px;
  height: 100px;
}
</style>
