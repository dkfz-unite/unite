<template>
  <div class="col">
    <q-tabs v-model="tab" class="q-ml-xs" align="left" dense>
      <q-tab v-if="specimenRows?.length" name="specimens" no-caps>Specimens ({{ specimenRows.length }})</q-tab>
      <q-tab v-if="interventionRows?.length" name="interventions" no-caps>Interventions ({{ interventionRows.length }})</q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel v-if="specimenRows?.length" name="specimens" class="q-pa-xs">
        <u-table-viewer :entries="specimenRows" />
      </q-tab-panel>

      <q-tab-panel v-if="interventionRows?.length" name="interventions" class="q-pa-xs">
        <u-table-viewer :entries="interventionRows" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import UTableViewer from "./TableViewer.vue";
import mixin from "./viewer-mixin.js";

import SubmissionType from "@/domain/submissions/models/enums/submission-type-specimen";

export default {
  components: {
    UTableViewer
  },

  mixins: [mixin],

  data() {
    return {
      tab: "specimens",
      specimenRows: [],
      interventionRows: [],
      drugRows: []
    };
  },

  mounted() {
    if (SubmissionType.isEntryType(this.type)) {
      this.tab = "specimens";

      const ignore = ["id", "parent_id", "parent_type", "donor_id", "creation_date", "creation_day", "interventions"];
      const flatten = ["material", "line", "organoid", "xenograft", "info", "molecular_data"];

      this.specimenRows = this.data
        .map(spe => ({
          id: spe.id,
          parent_id: spe.parent_id,
          parent_type: SubmissionType.getLabel(spe.parent_type),
          donor_id: spe.donor_id,
          creation_date: spe.creation_date,
          creation_day: spe.creation_day,
          ...this.mapProps(spe, ignore, flatten)
        }));

      this.interventionRows = this.data
        .filter(spe => !!spe.interventions)
        .flatMap(spe => spe.interventions.map(int => ({
          specimen_id: spe.id,
          specimen_type: SubmissionType.getLabel(this.type),
          specimen_donor_id: spe.donor_id,
          ...int
        })));

      return;
    }

    if (SubmissionType.isListType(this.type)) {
      this.tab = "interventions";

      this.interventionRows = this.data
        .filter(spe => !!spe.entries)
        .flatMap(spe => spe.entries.map(int => ({
          donor_id: spe.donor_id,
          specimen_id: spe.specimen_id,
          specimen_type: spe.type,
          ...int
        })));

      return;
    }
  }
}
</script>