<template>
  <u-dialog ref="dialog" />
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import Analysis from "./analysis.js";

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
      return this.datasets?.length == 2 && this.datasets.every(dataset => dataset.data?.prot == true);
    },
    
    show() {
      const analysis = new Analysis(this.datasets);
      this.$refs.dialog.show(analysis);
    }
  }
}
</script>