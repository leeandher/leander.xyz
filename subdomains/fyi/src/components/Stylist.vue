<template>
  <main id="main">
    <slot></slot>
  </main>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Stylist extends Vue {}

export default Stylist;
</script>

<style lang="scss">
html {
  background: #2f2e41;
  font-size: 10px;
  font-family: "Merriweather", Georgia, "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  font-size: 1.5rem;
  max-width: 100%;
  margin: 0;
  position: relative;
  overflow-x: hidden;
}
body:after {
  content: "";
  position: fixed;
  z-index: -1;
  top: 0%;
  left: 10%;
  height: 100%;
  width: 80%;
  transform: skew(-2deg);
  background: white;
  @media screen and (max-width: 1050px) {
    transform: none;
    width: calc(100% - 50px);
    left: 25px;
  }
  @media screen and (max-width: 500px) {
    transform: none;
    width: calc(100% - 20px);
    left: 10px;
  }
}
body:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 30%;
  width: 70%;
  height: 100%;
  background: #ff6347;
  transform: skew(35deg);
  @media screen and (max-width: 1000px) {
    transform: none;
    left: 0;
  }
}
main {
  color: #2f2e41;
  padding: 2rem;
  margin-left: 1.5rem;
  @media screen and (max-width: 1000px) {
    margin: 0;
  }
  a {
    color: #ff6347;
  }
  .red {
    color: #ff6347;
  }
}

hr {
  border: 0.5px solid #ff6347;
  margin: 3rem auto;
  max-width: 900px;
  @media screen and (max-width: 1200px) {
    max-width: 500px;
  }
}
:invalid {
  box-shadow: none;
}
:-moz-submit-invalid {
  box-shadow: none;
}
:-moz-ui-invalid {
  box-shadow: none;
}
::selection {
  background: #fff0ed; /* WebKit/Blink Browsers */
}
::-moz-selection {
  background: #fff0ed; /* Gecko Browsers */
}
</style>