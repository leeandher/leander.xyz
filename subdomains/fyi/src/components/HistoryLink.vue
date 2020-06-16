<template>
  <div class="item-row">
    <button type="button" class="copy item" v-clipboard:copy="shortLink">🔗</button>
    <p class="suffix item">
      <a :href="shortLink">{{shortLinkText}}</a>
    </p>
    <p class="origin item">{{link.origin}}</p>
    <p class="clicks item">{{link.clicks}}</p>
    <button type="button" class="delete item" @click="deleteItem(link._id)">❌</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  CLIENT_URL,
  CLIENT_URL_SHORT,
  SUPER_MEGA_SECRET_ULTRA_KEY,
  ILink
} from "../utils";

@Component({
  data() {
    return {
      shortLink: `${CLIENT_URL}/${this.$props.link.suffix}`,
      shortLinkText: `${CLIENT_URL_SHORT}/${this.$props.link.suffix}`
    };
  }
})
class HistoryLink extends Vue {
  @Prop({ required: true }) public refresh!: () => void;
  @Prop({ required: true }) private link!: ILink;

  private deleteItem(id: string): void {
    const oldHistory = JSON.parse(
      localStorage.getItem(SUPER_MEGA_SECRET_ULTRA_KEY) || "[]"
    );
    const newHistory = oldHistory.filter(
      ({ _id }: { _id: string }) => id !== _id
    );
    localStorage.setItem(
      SUPER_MEGA_SECRET_ULTRA_KEY,
      JSON.stringify(newHistory)
    );
    this.$props.refresh();
  }
}

export default HistoryLink;
</script>

<style scoped lang="scss">
button {
  background: inherit;
  border: 0;
  cursor: pointer;
  height: 100%;
  outline: 0;
  &:nth-last-child(4) {
    border-bottom-left-radius: 3px;
  }
  &:hover,
  &:focus {
    background: #fff0ed;
  }
  &:active {
    background: #ff6347;
    color: #ff6347;
  }
  &::-moz-focus-inner {
    border: 0;
  }
}
.item-row {
  display: grid;
  grid-template-columns: 75px 150px 366px 100px 75px;
}
.item {
  font-size: 1.2rem;
  padding: 1rem;
  margin: 0;
  align-self: center;
}

button {
  background: inherit;
  border: 0;
  cursor: pointer;
  height: 100%;
  outline: 0;
  &:nth-last-child(4) {
    border-bottom-left-radius: 3px;
  }
  &:hover,
  &:focus {
    background: #fff0ed;
  }
  &:active {
    background: #ff6347;
    color: #ff6347;
  }
  &::-moz-focus-inner {
    border: 0;
  }
}
</style>
