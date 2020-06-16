<template>
  <div class="history">
    <div class="header-row">
      <p class="header">Copy</p>
      <p class="header">Short Link</p>
      <p class="header">Original Link</p>
      <p class="header">Clicks</p>
      <p class="header">Delete</p>
    </div>
    <template v-for="link in links">
      <HistoryLink :key="link._id" :link="link" :refresh="refresh" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HistoryLink from "./HistoryLink.vue";
import { ILink } from "../utils";

@Component({
  components: {
    HistoryLink
  }
})
class History extends Vue {
  @Prop({ required: true }) public refresh!: () => void;
  @Prop({ required: true }) private links!: ILink[];
  private created() {
    this.$props.refresh();
  }
}

export default History;
</script>

<style scoped lang="scss">
.history {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.925);
  border: 2px solid #ff6347;
  border-radius: 5px;
  margin-top: 4rem;
  overflow-x: auto;
}
.header-row {
  display: grid;
  white-space: nowrap;
  grid-template-columns: 75px 150px 366px 100px 75px;
}
.header {
  display: block;
  font-weight: bold;
  text-transform: uppercase;
  color: #ff6347;
  font-family: "Gill Sans", "Gill Sans MT", Helvetica, "Trebuchet MS",
    sans-serif;
  margin: 0;
  border: 1px solid #ff6347;
  border-width: 0 1px 1px 0;
  font-size: 1.2rem;
  padding: 1rem;
  margin: 0;
  align-self: center;
  &:nth-child(5) {
    border-right-width: 0px;
  }
}
</style>
