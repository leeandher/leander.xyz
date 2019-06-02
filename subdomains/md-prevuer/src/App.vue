<template>
  <div id="app">
    <img id="logo" src="./assets/app-logo.png" height="60px">
    <div id="content-panel">
      <EditPane @edit="handleEdit"/>
      <PreviewPane :html="rawHtml"/>
    </div>
  </div>
</template>

<script>
import marked from "marked";

import PreviewPane from "./components/PreviewPane.vue";
import EditPane from "./components/EditPane.vue";

export default {
  name: "app",
  components: {
    PreviewPane,
    EditPane
  },
  data() {
    return {
      rawHtml: marked(EditPane.data().rawInput)
    };
  },
  methods: {
    handleEdit(rawInput) {
      this.rawHtml = marked(rawInput);
    }
  }
};
</script>

<style>
:root {
  --light: rgb(248, 248, 248);
  --dark: rgb(34, 48, 62);
  --green: rgb(65, 184, 131);
  --honeydew: rgb(226, 245, 236);
}
html {
  font-size: 10px;
}
body {
  margin: 0;
  padding: 0;
  position: relative;
  background: var(--light);
}
#logo {
  display: block;
  margin: 2rem auto 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--dark);
}
#content-panel {
  display: flex;
  margin: 2rem;
  flex-flow: row wrap;
  justify-content: center;
}
.pane {
  border-radius: 0.5rem;
  border: 3px solid var(--dark);
  box-shadow: var(--green) 0 0 0 3px;
  max-width: 640px;
  margin: 1rem;
  flex: 1;
  flex-basis: 275px;
  position: relative;
}
.pane:after {
  font-style: italic;
  padding: 2px 8px;
  border-radius: 0 0 0 0.5rem;
  color: var(--light);
  background: var(--dark);
  font-weight: bold;
  font-size: 16px;
  position: absolute;
  right: 0;
  top: 0;
}
a {
  color: var(--green);
}
blockquote {
  margin: 0.5rem 1.5rem;
  line-height: 1;
  padding: 0.1rem 1rem;
  border-radius: 0.25rem;
  border-left: 5px solid var(--green);
  background: var(--honeydew);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
code {
  background: var(--honeydew);
  font-family: Consolas, "Lucida Console", Monaco, monospace;
}
pre {
  background: var(--dark);
  border-radius: 0.25rem;
  padding: 0.5rem;
}
pre code {
  background: transparent;
  color: var(--light);
}
hr {
  height: 0px;
  border: 1px solid var(--green);
}
table {
  border-collapse: collapse;
}
table,
th,
td {
  border: 2px solid var(--green);
  padding: 0.25rem;
}
tr:nth-child(even) {
  background: var(--honeydew);
}
th {
  background: var(--green);
  color: var(--light);
}
</style>
