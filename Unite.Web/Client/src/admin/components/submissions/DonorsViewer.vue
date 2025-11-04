<template>
  <div class="col">
    <q-tabs class="q-ml-xs" dense align="left" v-model="tab">
      <q-tab v-if="donorRows?.length" name="donors" no-caps>Donors ({{ donorRows.length }})</q-tab>
      <q-tab v-if="clinicalRows?.length" name="clinical" no-caps>Clinical Data ({{ clinicalRows.length }})</q-tab>
      <q-tab v-if="treatmentRows?.length" name="treatments" no-caps>Treatments ({{ treatmentRows.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="donorRows?.length" name="donors" class="q-pa-xs">
        <u-table-viewer :entries="donorRows" />
      </q-tab-panel>

      <q-tab-panel v-if="clinicalRows?.length" name="clinical" class="q-pa-xs">
        <u-table-viewer :entries="clinicalRows" />
      </q-tab-panel>

      <q-tab-panel v-if="treatmentRows?.length" name="treatments" class="q-pa-xs">
        <u-table-viewer :entries="treatmentRows" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UTableViewer from "./TableViewer.vue";
import mixin from "./viewer-mixin.js";

import SubmissionType from "@/domain/submissions/models/enums/submission-type-donor";

export default {
  components: {
    UTableViewer
  },

  mixins: [mixin],

  data() {
    return {
      tab: "donors",
      donorRows: [],
      clinicalRows: [],
      treatmentRows: []
    };
  },

  mounted() {
    if (SubmissionType.isEntryType(this.type)) {
      this.tab = "donors";

      this.donorRows = this.data.map(i => this.mapProps(i, ["clinical_data", "treatments"], ["projects", "studies"]));

      this.clinicalRows = this.data
        .filter(i => !!i.clinical_data)
        .map(i => ({
          donor_id: i.id,
          ...i.clinical_data
        }));

      this.treatmentRows = this.data
        .filter(i => !!i.treatments)
        .flatMap(i => i.treatments.map(t => ({
          donor_id: i.id, 
          ...t
        })));

      return;
    }
    
    if (SubmissionType.isListType(this.type)) {
      this.tab = "treatments";

      this.treatmentRows = this.data
        .filter(i => !!i.entries)
        .flatMap(i => i.entries.map(t => ({
          donor_id: i.donor_id, 
          ...t 
        })));

      return;
    }
  }
}
</script>