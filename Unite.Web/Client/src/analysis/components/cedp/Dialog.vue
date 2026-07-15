<template>
  <u-dialog :analysis="model" ref="dialog" @request="onRequest" :options-height="300"/>
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
      // TODO: simplify this
      if (["condition_property"].includes(params.option.key)) {
        const values = await this.$store.dispatch("analysis/getMetadataOptions");
        params.option.options = values.map(value => new SelectValue(value, value));
      } else if (["gene", "protein"].includes(params.option.key)) {
        const values = await this.$store.dispatch("analysis/getAutocompleteOptions", { model: params.option.key, field: "symbol", query: params.value });
        params.option.options = values.map(value => new SelectValue(value, value));
      }
    }
  }
}
</script>