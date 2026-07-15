<template>
  <u-dialog :analysis="model" ref="dialog" :options-height="260" />
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import Analysis from "./analysis.js";

export default {
  components: {
    UDialog
  },

  props: {
    analysis: {
      type: Analysis,
      default: () => new Analysis([])
    }
  },

  data() {
    return {
      model: this.analysis
    };
  },

  watch: {
    analysis(newValue) {
      this.model = newValue;
    }
  },

  methods: {
    canShow(datasets) {
      return datasets?.length == 2 && datasets.every(dataset => dataset.data?.prot == true);
    },
    
    show(datasets) {
      if (datasets?.length)
        this.model.datasets = datasets;

      this.$refs.dialog.show();
    }
  }
}
</script>