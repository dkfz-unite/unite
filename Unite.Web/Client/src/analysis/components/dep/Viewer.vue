<template>
  <u-viewer :analysis="analysis" :dialog="dialog" :loader="onLoad" @delete="$emit('delete')">
    <template #dialog>
      <u-dialog ref="dialog" />
    </template>

    <template #results>
      <u-results :id="analysis.id" :title="analysis.name" :data="analysis.results" :meta="analysis.meta" />
    </template>
  </u-viewer>
</template>

<script>
import UViewer from "../_shared/componets/Viewer.vue";
import UDialog from "./Dialog.vue";
import UResults from "./Results.vue";
import Analysis from "./analysis.js";

export default {
  components: {
    UViewer,
    UDialog,
    UResults
  },

  props: {
    analysis: {
      type: Analysis,
      required: true
    }
  },

  emits: ["delete"],

  data() {
    return {
      dialog: null
    }
  },

  mounted() {
    this.dialog = this.$refs.dialog;
  },

  methods: {
    async onLoad() {
      if (!this.analysis.meta) {
        const payload = { id: this.analysis.id, file: "annotations.tsv" };
        const content = await this.$store.dispatch("analysis/loadAnalysisMeta", payload);
        this.analysis.meta = content;
      }
    }
  }
}
</script>