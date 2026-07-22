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

  methods: {
    canShow(datasets) {
      return datasets?.length == 1 && datasets.every(dataset => dataset.data?.meth == true);
    },
    
    showNew(datasets) {
      const model = new Analysis(datasets);

      this.$refs.dialog.show(model, false);
    },

    showEdit(analysis) {
      const model = new Analysis();
      analysis.clone(model);

      this.$refs.dialog.show(model, true);
    }
  }
}
</script>