<template>
  <section>
    <div class="grid-item">
      <img alt="Social influencer" src="../assets/social_influencer.svg" />
      <p>
        Get some
        <span class="red">more followers</span> with some convenient shorter links
      </p>
    </div>
    <div class="grid-item">
      <p class="right">
        <span class="red">Finally learn to skateboard</span>, with
        all that time you'll save
      </p>
      <img alt="Skateboarding" src="../assets/skateboard.svg" />
    </div>
    <div class="grid-item">
      <img alt="Hacking the world" src="../assets/hack_the_world.svg" />
      <p>
        Hack into world, by using this
        <span class="red">simple secure online</span> life pro tip
      </p>
    </div>
    <div class="grid-item">
      <p class="right">
        <span class="red">Get out of your comfort zone</span>, there's a whole world out there
      </p>
      <img alt="Taking a trip" src="../assets/teleport.svg" />
    </div>
    <div class="grid-item">
      <img alt="Super woman" src="../assets/super_woman.svg" />
      <p>
        Become a better version of yourself,
        <span class="red">a super version</span>
      </p>
    </div>
    <div class="grid-item">
      <p class="right">
        <span class="red">Hustle that grind</span>, and beat your competition to market
      </p>
      <img alt="The hustle" src="../assets/hustle.svg" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class Seller extends Vue {}

export default Seller;
</script>

<style scoped lang="scss">
.grid-item {
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  grid-gap: 0 1rem;
  margin: 0 auto;
  max-width: 800px;
  * {
    align-self: center;
  }
  img {
    width: 250px;
    height: 250px;
    @media screen and (max-width: 1000px) {
      width: 150px;
      height: 150px;
    }
    @media screen and (max-width: 500px) {
      width: 100px;
      height: 100px;
    }
  }
  p {
    margin: 0;
    text-align: left;
    &.right {
      text-align: right;
    }
    max-width: 75%;
    font-size: 1.65rem;
    @media screen and (max-width: 1000px) {
      font-size: 1.4rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
}
</style>
