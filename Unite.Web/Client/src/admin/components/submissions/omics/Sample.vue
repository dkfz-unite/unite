<template>
  <q-card flat bordered class="q-ma-xs q-pa-none">
    <q-card-section class="q-ma-none q-pa-sm">
      <div class="row">
        <div class="col">
          <u-row-viewer label="donor_id:" :value="sample.donor_id" />
          <u-row-viewer label="specimen_id:" :value="sample.specimen_id" />
          <u-row-viewer label="specimen_type:" :value="sample.specimen_type" />
        </div>

        <div class="col">
          <u-row-viewer label="analysis_type:" :value="sample.analysis_type" />
          <u-row-viewer label="analysis_date:" :value="sample.analysis_date" />
          <u-row-viewer label="analysis_day:" :value="sample.analysis_day" />
          <u-row-viewer label="genome:" :value="sample.genome" />
        </div>

        <div class="col">
          <u-row-viewer label="purity:" :value="sample.purity" />
          <u-row-viewer label="ploidy:" :value="sample.ploidy" />
          <u-row-viewer label="cells:" :value="sample.cells" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import URowViewer from "../RowViewer.vue";

export default {
  components: {
    URowViewer
  },

  props: {
    sample: {
      type: Object,
      required: true
    }
  }
}
</script>