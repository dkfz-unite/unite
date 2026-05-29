<template>
  <u-dialog ref="dialog" />
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";

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
    show() {
      const analysis = new Analysis(AnalysisType.CEDP, options, this.datasets);
      this.$refs.dialog.show(analysis);
    }
  }
}
</script>