<template>
  <div>
    <img alt="Page not found" src="../assets/404.svg" v-if="error === '404'" />
    <img alt="Something went wrong" src="../assets/bug_fix.svg" v-else />
    <p class="error">Error Code: {{error}}</p>
    <div v-if="suffix">
      <p>
        Sorry about that, but
        <span class="red">/{{suffix}}</span> doesn't seem to exist.
      </p>
      <p>But feel free to create it!</p>
    </div>
    <div v-else>
      <p>Something went wrong, and it's definitely my fault.</p>
      <p>
        <small>(But if it's yours please own up to it so I don't feel as guilty)</small>
      </p>
    </div>
    <br />
    <p>
      <a href="/">
        <button>Take me home ↩</button>
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
class Error extends Vue {
  @Prop()
  private suffix!: string;
  @Prop()
  private error!: string;
}

export default Error;
</script>

<style scoped lang="scss">
div {
  position: relative;
}
.error {
  display: block;
  font-weight: bold;
  color: #ff6347;
  font-family: "Gill Sans", "Gill Sans MT", Helvetica, "Trebuchet MS",
    sans-serif;
  font-size: 1.6rem;
  text-transform: uppercase;
  margin: 2rem;
}
p {
  margin: 0.5rem;
}
button {
  border: 2px solid #ff6347;
  font-family: "Gill Sans", "Gill Sans MT", Helvetica, "Trebuchet MS",
    sans-serif;
  text-transform: uppercase;
  position: relative;
  font-weight: bold;
  font-size: 1.4rem;
  color: #ff6347;
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 5px;
  z-index: 2;
  cursor: pointer;
  &:hover,
  &:focus {
    background: #fff0ed;
  }
  &:active {
    outline: 0;
    box-shadow: 0 0 2px #ff6347;
  }
  &::-moz-focus-inner {
    border: 0;
  }
}
img {
  max-width: 80%;
  max-height: 600px;
  margin: 5rem 2rem;
}
</style>
