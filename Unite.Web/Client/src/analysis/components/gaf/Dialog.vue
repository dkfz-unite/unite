<template>
  <u-dialog ref="dialog" :options-height="150" />
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import { SelectValue } from "../_shared/options.ts";
import Analysis from "./analysis.ts";

export default {
  components: {
    UDialog
  },

  methods: {
    canShow(datasets) {
      return datasets?.length == 1 && datasets?.every(dataset => dataset.data?.sms === true);
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