<template>
  <u-dialog :analysis="model" ref="dialog" :options-height="100" />
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import Analysis from "./analysis.ts";

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

  methods: {
    canShow(datasets) {
      return datasets?.length == 1 && datasets.every(dataset => dataset.data?.meth == true);
    },
    
    show(datasets) {
      if (datasets?.length)
        this.model.datasets = datasets;

      this.$refs.dialog.show();
    }
  }
}
</script>