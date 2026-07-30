<template>
  <u-viewer :analysis="analysis" :dialog="dialog" :loader="onLoad" @delete="$emit('delete')">
    <template #dialog>
      <u-dialog ref="dialog" />
    </template>
  </u-viewer>
</template>

<script>
import UViewer from "../_shared/componets/Viewer.vue";
import UDialog from "./Dialog.vue";
import Analysis from "./analysis.ts";

export default {
  components: {
    UViewer,
    UDialog
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
        const payload = { id: this.analysis.id, file: "output/contrasts.tsv" };
        const content = await this.$store.dispatch("analysis/loadAnalysisMeta", payload);
        this.analysis.meta = content;
      }
    }
  }
}
</script>
