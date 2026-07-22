<template>
  <u-dialog ref="dialog" :options-height="350" @request="onRequest" />
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
      return datasets?.length == 1 && datasets.every(dataset => dataset.data?.prot == true);
    },
    
    showNew(datasets) {
      const model = new Analysis(datasets);

      this.$refs.dialog.show(model, false);
    },

    showEdit(analysis) {
      const model = new Analysis();
      analysis.clone(model);

      this.$refs.dialog.show(model, true);
    },

    async onRequest(params) {
      if (params.option.key == "class_property") {
        const values = await this.$store.dispatch("analysis/getMetadataOptions");
        params.option.options = values.map(value => new SelectValue(value, value));
      }
    }
  }
}
</script>