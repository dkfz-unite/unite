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

  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    canShow() {
      return this.datasets?.length == 1 && this.datasets.every(dataset => dataset.data?.prot == true);
    },
    
    show() {
      const analysis = new Analysis(this.datasets);
      this.$refs.dialog.show(analysis);
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