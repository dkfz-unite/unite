<template>
  <u-dialog ref="dialog" @request="onRequest"/>
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
      return this.datasets?.length == 1 && this.datasets[0].data?.prot == true;
    },
    
    show() {
      const analysis = new Analysis(this.datasets);
      this.$refs.dialog.show(analysis);
    },

   async  onRequest(params) {
      // TODO: simplify this
      if (["condition_property", "class_property"].includes(params.option.key)) {
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