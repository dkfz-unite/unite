<template>
  <u-dialog :analysis="model" ref="dialog" :options-height="350" @request="onRequest" />
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import { SelectValue } from "../_shared/options.ts";
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
      return datasets?.length == 1 && datasets.every(dataset => dataset.data?.prot == true);
    },
    
    show(datasets) {
      if (datasets?.length)
        this.model.datasets = datasets;

      this.$refs.dialog.show();
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