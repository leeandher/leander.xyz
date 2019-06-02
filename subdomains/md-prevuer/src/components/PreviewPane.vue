<template>
  <div class="preview-pane pane">
    <div class="preview" v-html="html"/>
    <FunctionButton text="Export HTML" :func="exportHtml"/>
  </div>
</template>

<script>
import { saveAs } from "file-saver";

import FunctionButton from "./FunctionButton";

import {
  dateText,
  htmlDownloadStart,
  htmlDownloadEnd
} from "../assets/constants";

export default {
  name: "PreviewPane",
  components: {
    FunctionButton
  },
  props: {
    html: String
  },
  methods: {
    exportHtml: function() {
      const markdownBlob = new Blob(
        [htmlDownloadStart, this.html, htmlDownloadEnd],
        {
          type: "text/plain;charset=utf-8"
        }
      );
      saveAs(markdownBlob, `${dateText()}_prevue.html`);
    }
  }
};
</script>

<style scoped>
.preview-pane {
  padding: 1.5rem;
}
.preview-pane:after {
  content: "PREVIEW";
}
.preview {
  font-size: 15px;
  text-align: left;
  margin-bottom: 35px;
}
</style>

