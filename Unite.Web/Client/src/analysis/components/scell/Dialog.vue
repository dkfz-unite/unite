<template>
  <u-dialog ref="dialog" :options-height="200" @request="onRequest" />
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

  methods: {
    canShow(datasets) {
      return datasets?.length == 1 && datasets?.every(dataset => dataset.data?.expSc == true);
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
      if (params.option.key == keys.model) {
        const response = await this.$store.dispatch("analysis/getScellAnalysisModels");

        // this.options.model.options = response?.models.map(model => ({
        //   value: model.filename,
        //   label: this.getModelName(model.filename),
        //   details: this.getModelDetails(model.details),
        //   types: model.No_celltypes,
        //   date: (new Date(model.date)).toLocaleDateString()
        // }));

        params.option.options = response?.models
          .map(model => new SelectValue(this.getModelName(model), model.filename, this.getModelDetails(model)));
      }
    },

    getModelName(model) {
      return model.filename.replaceAll("_", " ").replace(".pkl", "");
    },

    getModelDetails(model) {
      return `${model.details.charAt(0).toUpperCase()}${model.details.slice(1)}.<br/>
              <b>${model.No_celltypes}</b> types, updated <b>${new Date(model.date).toLocaleDateString()}</b>.`;
    }
  }
}
</script>