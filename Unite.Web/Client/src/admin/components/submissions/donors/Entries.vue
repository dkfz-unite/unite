<template>
  <div class="col">
    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="donorRows?.length" :name="tabs.donors" no-caps>Donors ({{ donorRows.length }})</q-tab>
      <q-tab v-if="clinicalRows?.length" :name="tabs.clinical" no-caps>Clinical Data ({{ clinicalRows.length }})</q-tab>
      <q-tab v-if="treatmentRows?.length" :name="tabs.treatments" no-caps>Treatments ({{ treatmentRows.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="donorRows?.length" :name="tabs.donors" class="q-pa-xs">
        <u-table-viewer :entries="donorRows" />
      </q-tab-panel>

      <q-tab-panel v-if="clinicalRows?.length" :name="tabs.clinical" class="q-pa-xs">
        <u-table-viewer :entries="clinicalRows" />
      </q-tab-panel>

      <q-tab-panel v-if="treatmentRows?.length" :name="tabs.treatments" class="q-pa-xs">
        <u-table-viewer :entries="treatmentRows" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UTableViewer from "../TableViewer.vue";
import mixin from "../viewer-mixin.js";

export default {
  components: {
    UTableViewer
  },

  mixins: [mixin],

  setup() {
    return {
      tabs: {
        donors: "donors",
        clinical: "clinical",
        treatments: "treatments"
      }
    };
  },

  data() {
    return {
      tab: this.tabs.donors,
      donorRows: [],
      clinicalRows: [],
      treatmentRows: []
    };
  },

  mounted() {
    this.tab = this.tabs.donors;

    const ignore = ["clinical_data", "treatments"];
    const flatten = [];
    const wrap = ["projects", "studies"];
    this.donorRows = this.data
      .map(row => this.mapProps(row, ignore, flatten, wrap));

    this.clinicalRows = this.data
      .filter(row => !!row.clinical_data)
      .map(row => ({
        donor_id: row.id,
        ...row.clinical_data
      }));

    this.treatmentRows = this.data
      .filter(row => !!row.treatments)
      .flatMap(row => row.treatments.map(trt => ({
        donor_id: row.id, 
        ...trt
      })));
  }
}
</script>