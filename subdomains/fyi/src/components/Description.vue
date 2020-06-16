<template>
  <div class="description">
    <p>
      <span>
        <span>Let's get real</span>
        <span class="red">.</span>
        It's
        <em>{{year}}</em>
      </span>
      <span class="red">.</span>
    </p>
    <p>
      <span>Links shouldn't be so long you gotta scroll sideways</span>
      <span class="red">.</span>
    </p>
    <p>
      <span>You want to easily enter them in on mobile browsers</span>
      <span class="red">.</span>
    </p>
    <p>
      <span>You want memorable words to get to your favourite sites</span>
      <span class="red">.</span>
    </p>
    <br />
    <p>
      <span class="strike">Well, you came to the right place</span>
      <span class="red">.</span>
    </p>
    <div class="shadow">
      <p>
        <span>Well actually, you're a little late</span>
        <span class="red">.</span>
      </p>
      <p>
        <span>This project has reached its end of life since, I'm lazy and don't want to spend 💸 to keep it up</span>
        <span class="red">.</span>
      </p>
      <p>
        <span>Maybe next time, you intreped internet explorer</span>
        <span class="red">.</span>
      </p>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
})
class Description extends Vue {}

export default Description;
</script>

<style scoped lang="scss">
.description {
  font-size: 1.5rem;
  @media screen and (max-width: 1000px) {
    font-size: 1.4rem;
  }
}
p {
  margin: 0.5rem;
}
.strike {
  text-decoration: line-through;
}
.red {
  font-size: 2.5rem;
  line-height: 0;
}
.shadow {
  display: inline-block;
  padding: 1rem;
  background: rgba(255, 99, 71, 0.2);
}
.long-link {
  white-space: nowrap;
}
</style>
