<template>
  <u-dialog v-if="canShow" ref="dialog" @request="onRequest" :options-height="300" />

  <u-menu-item v-if="canShow" @click="show()">
    <strong>Protein</strong> expression distribution per condition
  </u-menu-item>
</template>

<script>
import UMenuItem from "../_shared/componets/MenuItem.vue";
import UDialog from "./Dialog.vue";
import { SelectValue } from "../_shared/options.ts";
import { keys } from "./options.ts";
import Analysis from "./analysis.ts";

export default {
  components: {
    UDialog,
    UMenuItem
  },

  props: {
    datasets: {
      type: Array,
      default: () => [],
    }
  },

  computed: {
    canShow: () => Analysis.canCreate(this.datasets)
  },

  methods: {
    show() {
      const payload = { datasets: this.datasets };
      this.$refs.dialog.show(payload);
    },

    async onRequest(params) {
      if (params.option.key == keys.condition_property ) {
        const values = await this.$store.dispatch("analysis/getMetadataOptions");
        params.option.options = values.map(value => new SelectValue(value, value));
      } else if (params.option.key == keys.feature) {
        const featureType = this.analysis.findOption(keys.feature_type).value;
        const values = await this.$store.dispatch("analysis/getAutocompleteOptions", { model: featureType, field: "symbol", query: params.value });
        params.option.options = values.map(value => new SelectValue(value, value));
      }
    }
  }
}
</script>