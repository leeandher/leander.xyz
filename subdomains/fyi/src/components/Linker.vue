<template>
  <div id="app">
    <form @submit.prevent.stop="onSubmit">
      <fieldset :disabled="loading || disabled" :aria-busy="loading">
        <label for="origin">
          <span>Original Link</span>
          <input
            type="text"
            placeholder="e.g.   https://www.example.com/really_long_super_ugly_smelly_link"
            name="origin"
            required
            v-model="origin"
          />
          <p class="alert" v-if="error.type === 'ORIGIN'">{{error.message}}</p>
        </label>
        <label for="suffix">
          <span>Custom Suffix</span>
          <input
            type="text"
            placeholder="e.g.   conf2019, my-wish-list-🎄🎁, whatever-you-like"
            name="suffix"
            v-model="suffix"
          />
          <p class="alert" v-if="error.type === 'SUFFIX'">{{error.message}}</p>
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
    <template v-if="history.length">
      <History :links="history" :refresh="loadHistory" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import findIndex from "lodash/findIndex";
import History from "./History.vue";
import { SUPER_MEGA_SECRET_ULTRA_KEY, API_URL, ILink, IError } from "../utils";

@Component({
  components: {
    History
  },

  data() {
    return {
      origin: "",
      suffix: "",
      history: [],
      loading: false,
      error: {
        message: "",
        type: ""
      }
    };
  }
})
class Linker extends Vue {
  @Prop({ default: false })
  private disabled?: boolean;

  public async loadHistory(): Promise<void> {
    // Load whatevers in localStorage
    const oldHistory: string =
      localStorage.getItem(SUPER_MEGA_SECRET_ULTRA_KEY) || "[]";
    this.$data.history = JSON.parse(oldHistory) || [];
    // Fetch an update on clicks
    const bodyArray: string[] = this.$data.history.map(
      ({ suffix }: { suffix: string }) => suffix
    );
    const body = JSON.stringify({ suffixes: bodyArray });
    const res = await fetch(`${API_URL}/history`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body
    });
    const data = await res.json();
    const links: ILink[] = data.map((link: ILink) => ({
      _id: link._id,
      origin: link.origin,
      suffix: link.suffix,
      clicks: link.clicks
    }));
    this.$data.history = links;
    links.forEach(this.loadIntoHistory);
  }
  private created() {
    this.loadHistory();
  }
  private async onSubmit(): Promise<void> {
    // Set the loading state and clear the error
    this.$data.loading = true;
    this.clearError();

    // Submit the request
    const { origin, suffix } = this.$data;
    const body: string = JSON.stringify({ origin, suffix });
    const res = await fetch(API_URL, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body
    });
    const data = await res.json();

    // Update the loading state, and display the response
    this.$data.loading = false;
    return data.error ? this.displayError(data) : this.loadIntoHistory(data);
  }
  private loadIntoHistory(data: ILink): void {
    // Extract the link
    const link = {
      _id: data._id,
      origin: data.origin,
      suffix: data.suffix,
      clicks: data.clicks
    };
    const history = this.$data.history || [];

    const linkIndex = findIndex(history, link);
    if (linkIndex > -1) {
      // If in history, update the item
      history[linkIndex] = link;
    } else {
      // Otherwise, add it
      history.unshift(link);
    }

    // Update history
    this.$data.history = history;
    localStorage.setItem(
      SUPER_MEGA_SECRET_ULTRA_KEY,
      JSON.stringify(this.$data.history)
    );
  }
  private displayError(data: IError): void {
    const error = {
      message: data.message,
      type: data.type
    };
    this.$data.error = error;
  }
  private clearError(): void {
    this.$data.error = {};
  }
}

export default Linker;
</script>

<style scoped lang="scss">
#app {
  max-width: 800px;
  padding: 1.5rem;
  padding-bottom: 4rem;
  position: relative;
  background: #fff0ed;
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 3rem;
  &:after {
    content: "";
    position: absolute;
    background-image: url("../assets/link_shortener.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    top: 5%;
    left: 5%;
    height: 90%;
    width: 90%;
    z-index: 0;
    opacity: 0.35;
  }
}
fieldset {
  margin: 0;
  border: 0;
  padding: 0;
  border: 0;
  width: auto;
  &[aria-busy="true"],
  &:disabled {
    opacity: 0.7;
  }
}
label {
  position: relative;
  display: block;
  text-align: left;
  width: 80%;
  margin: 2rem auto;
  z-index: 2;
  span {
    display: block;
    font-weight: bold;
    color: #ff6347;
    font-family: "Gill Sans", "Gill Sans MT", Helvetica, "Trebuchet MS",
      sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
}
input {
  font-family: inherit;
  width: 100%;
  padding: 1rem;
  z-index: 2;
  position: relative;
  font-size: 1.6rem;
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid #ff6347;
  font-family: "Merriweather", Georgia, "Times New Roman", Times, serif;
  border-radius: 5px;
  margin-bottom: 2rem;
  &:focus {
    background: white;
    outline: 0;
    box-shadow: 0 0 2px #ff6347;
  }
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
.alert {
  position: absolute;
  top: calc(100% - 3.5rem);
  z-index: 1;
  background: #575988;
  padding: 0.5rem;
  font-weight: 400;
  font-size: 1.3rem;
  border-radius: 0 0 5px 5px;
  width: 100%;
  color: #fff;
  left: 0;
  font-family: "Gill Sans", "Gill Sans MT", Helvetica, "Trebuchet MS",
    sans-serif;
}
</style>
