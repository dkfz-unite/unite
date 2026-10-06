<template>
  <u-dialog ref="dialog" @request="onRequest" @update="onUpdate" :options-height="160"/>
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import { SelectValue } from "../_shared/options.js";
import Analysis from "./analysis.js";
import { keys } from "./options.js";

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
      return datasets?.length == 1 && datasets?.every(dataset => dataset.data?.cnvps == true);
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
      if (params.option.key == keys.track_property) {
        const values = await this.$store.dispatch("analysis/getMetadataOptions");
        params.option.options = values.map(value => new SelectValue(value, value));
      } else if (params.option.key == keys.track_property_value) {
        const property = this.analysis.findOption(keys.track_property).value;
        const values = await this.$store.dispatch("analysis/getMetadataValues", { property: property });
        params.option.options = values.map(value => new SelectValue(value, value));
      }
    },

    async onUpdate(option) {
      if (option.key == keys.track_property) {
        const valueOption = this.analysis.findOption(keys.track_property_value);
        if (option.value?.length == 1) {
          const values = await this.$store.dispatch("analysis/getMetadataValues", { property: option.value });
          valueOption.value = null;
          valueOption.options = values.map(value => new SelectValue(value, value));
        } else {
          valueOption.value = null;
          valueOption.options = [];
        }
      }
    }
  }
}
</script>