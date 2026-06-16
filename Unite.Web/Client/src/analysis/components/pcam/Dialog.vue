<template>
  <u-dialog ref="dialog" :options-height="100" />
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import Analysis from "./analysis.ts";

export default {
  components: {
    UDialog
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    canShow() {
      return this.datasets?.length == 1 && this.datasets.every(dataset => dataset.data?.meth == true);
    },
    
    show() {
      const analysis = new Analysis(this.datasets);
      this.$refs.dialog.show(analysis);
    }
  }
}
</script>