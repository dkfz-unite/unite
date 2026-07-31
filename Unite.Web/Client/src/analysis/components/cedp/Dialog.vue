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
      if (params.option.key == keys.condition_property) {
        const values = await this.$store.dispatch("analysis/getMetadataOptions");
        params.option.options = values.map(value => new SelectValue(value, value));
      } else if (params.option.key == keys.condition_value) {
        const property = this.analysis.findOption(keys.condition_property).value;
        const values = await this.$store.dispatch("analysis/getMetadataValues", { property: property });
        params.option.options = values.map(value => new SelectValue(value, value));
      } else if (params.option.key == keys.feature_name) {
        const featureType = this.analysis.findOption(keys.feature_type).value;
        const values = await this.$store.dispatch("analysis/getAutocompleteOptions", { model: featureType, field: "symbol", query: params.value });
        params.option.options = values.map(value => new SelectValue(value, value));
      }
    },

    async onUpdate(option) {
      if (option.key == keys.feature_type) {
        const featureNameOption = this.analysis.findOption(keys.feature_name);
        featureNameOption.value = null;
        featureNameOption.options = [];
      } else if (option.key == keys.condition_property) {
        const valueOption = this.analysis.findOption(keys.condition_value);
        const values = await this.$store.dispatch("analysis/getMetadataValues", { property: option.value });
        valueOption.value = null;
        valueOption.options = values.map(value => new SelectValue(value, value));
      }
    }
  }
}
</script>