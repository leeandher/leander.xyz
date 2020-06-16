<template>
  <div id="app">
    <Stylist>
      <Header />
      <div v-if="error">
        <Error :error="error" :suffix="suffix" />
      </div>
      <div v-else>
        <Linker disabled />
        <Description />
        <Seller />
      </div>
      <Footer />
    </Stylist>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Stylist from "./components/Stylist.vue";
import Header from "./components/Header.vue";
import Error from "./components/Error.vue";
import Linker from "./components/Linker.vue";
import Description from "./components/Description.vue";
import Seller from "./components/Seller.vue";
import Footer from "./components/Footer.vue";

@Component({
  components: {
    Stylist,
    Header,
    Error,
    Linker,
    Description,
    Seller,
    Footer
  },
  data() {
    const url = new URL(window.location.href);
    const error = url.searchParams.get("error");
    const suffix = url.searchParams.get("suffix");
    return {
      error,
      suffix
    };
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  text-align: center;
  margin-top: 60px;
  max-width: 90%;
  margin: 0 auto;
}
</style>
