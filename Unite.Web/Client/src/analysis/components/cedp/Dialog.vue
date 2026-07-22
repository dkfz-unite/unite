<template>
  <u-dialog ref="dialog" @request="onRequest" @update="onUpdate" :options-height="300"/>
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import { SelectValue } from "../_shared/options.ts";
import Analysis from "./analysis.ts";
import { keys } from "./options.ts";

export default {
  components: {
    UDialog
  },

  data() {
    return {
      analysis: null
    }
  },

  methods: {
    canShow(datasets) {
      return datasets?.length == 1 && datasets.every(dataset => dataset.data?.prot == true);
    },
    
    showNew(datasets) {
      this.analysis = new Analysis(datasets);

      this.$refs.dialog.show(this.analysis, false);
    },

    showEdit(analysis) {
      this.analysis = new Analysis();
      analysis.clone(this.analysis);

      this.$refs.dialog.show(this.analysis, true);
    },

    async onRequest(params) {
      // TODO: simplify this
      if ([keys.condition_property].includes(params.option.key)) {
        const values = await this.$store.dispatch("analysis/getMetadataOptions");
        params.option.options = values.map(value => new SelectValue(value, value));
      } else if ([keys.condition_value].includes(params.option.key)) {
        const property = this.analysis.findOption(keys.condition_property).value;
        const values = await this.$store.dispatch("analysis/getMetadataValues", { property: property });
        params.option.options = values.map(value => new SelectValue(value, value));
      } else if ([keys.gene, keys.protein].includes(params.option.key)) {
        const values = await this.$store.dispatch("analysis/getAutocompleteOptions", { model: params.option.key, field: "symbol", query: params.value });
        params.option.options = values.map(value => new SelectValue(value, value));
      }
    },

    async onUpdate(option) {
      if ([keys.condition_property].includes(option.key)) {
        const valueOption = this.analysis.findOption(keys.condition_value);
        const values = await this.$store.dispatch("analysis/getMetadataValues", { property: option.value });

        valueOption.value = null;
        valueOption.options = values.map(value => new SelectValue(value, value));
      }
    }
  }
}
</script>