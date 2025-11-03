<template>
  <div class="col">
    <q-card flat bordered class="q-ma-xs q-pa-none">
      <q-card-section class="q-ma-none q-pa-sm">
        <div class="row">
          <div class="col">
            <row-viewer label="donor_id:" :value="sample.donor_id" />
            <row-viewer label="specimen_id:" :value="sample.specimen_id" />
            <row-viewer label="specimen_type:" :value="sample.specimen_type" />
          </div>

          <div class="col">
            <row-viewer label="analysis_type:" :value="sample.analysis_type" />
            <row-viewer label="analysis_date:" :value="sample.analysis_date" />
            <row-viewer label="analysis_day:" :value="sample.analysis_day" />
            <row-viewer label="genome:" :value="sample.genome" />
          </div>

          <div class="col">
            <row-viewer label="purity:" :value="sample.purity" />
            <row-viewer label="ploidy:" :value="sample.ploidy" />
            <row-viewer label="cells:" :value="sample.cells" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import RowViewer from "./RowViewer.vue";

export default {
  components: {
    RowViewer
  },

  props: {
    sample: {
      type: Object,
      required: true
    }
  }
}
</script>