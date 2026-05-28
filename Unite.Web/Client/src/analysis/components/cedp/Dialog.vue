<template>
  <u-dialog
    title="Protein expression distribution per condition"
    ref="dialog"
    :analysis="analysis"
  />
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

  data() {
    const analysis = new Analysis(Analysis.CEDP, this.datasets, options);

    return {
      analysis
    }
  },

  methods: {
    show() {
      this.$refs.dialog.show();
    }
  }
} 
</script>