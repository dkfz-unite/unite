<template>
  <div class="col">
    <q-card flat bordered class="q-ma-xs q-pa-none">
      <q-card-section class="q-ma-none q-pa-sm">
        <div class="row">
          <div class="col">
            <u-row-viewer label="donor_id:" :value="sample.donor_id" />
            <u-row-viewer label="image_id:" :value="sample.image_id" />
            <u-row-viewer label="image_type:" :value="sample.image_type" />
          </div>

          <div class="col">
            <u-row-viewer label="analysis_type:" :value="sample.analysis_type" />
            <u-row-viewer label="analysis_date:" :value="sample.analysis_date" />
            <u-row-viewer label="analysis_day:" :value="sample.analysis_day" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="entries?.length" name="entries" no-caps>Entries ({{ entries.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="entries?.length" name="entries" class="q-pa-xs">
        <u-table-viewer :entries="entries" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import URowViewer from "./RowViewer.vue";
import UTableViewer from "./TableViewer.vue";
import mixin from "./viewer-mixin.js";

export default {
  components: {
    URowViewer,
    UTableViewer
  },

  mixins: [mixin],

  data() {
    return {
      tab: "entries",
      sample: this.data.sample,
      entries: this.data.entries.map(e => this.mapProps(e, [], [], ["doses", "responses"]))
    };
  }
}
</script>