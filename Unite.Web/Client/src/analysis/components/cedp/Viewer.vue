<template>
  <u-viewer :analysis="analysis" :dialog="dialog" @delete="$emit('delete')">
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
  }
}
</script>
