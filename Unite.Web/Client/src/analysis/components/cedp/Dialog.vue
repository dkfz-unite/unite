<template>
  <u-dialog ref="dialog" @request="onRequest"/>
</template>

<script>
import UDialog from "../_shared/componets/Dialog.vue";
import Analysis from "./analysis.js";

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
      if (params.option.key == "condition_property") {
        const values = await this.$store.dispatch("analysis/getMetadataOptions");
        params.option.options = values.map(value => ({ key: value, label: value }));
      } else if (["gene", "protein"].includes(params.option.key)) {
        const values = await this.$store.dispatch("analysis/getAutocompleteOptions", { model: params.option.key, field: "symbol", query: params.value });
        params.option.options = values.map(value => ({ key: value, label: value }));
      }
    }
  }
}
</script>