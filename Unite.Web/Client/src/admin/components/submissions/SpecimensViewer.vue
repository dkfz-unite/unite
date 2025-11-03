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

import SubmissionType from "@/domain/_shared/common/data/enums/submission-type";

export default {
  components: {
    UTableViewer
  },

  mixins: [mixin],

  data() {
    return {
      tab: "specimens",
      specimenRows: [],
      interventionRows: []
    };
  },

  mounted() {
    const flatten = ["molecular_data"];

    if (this.type === SubmissionType.MAT) {
      flatten.push("material");
    } else if (this.type === SubmissionType.LNE) {
      flatten.push("line");
    } else if (this.type === SubmissionType.ORG) {
      flatten.push("organoid");
    } else if (this.type === SubmissionType.XEN) {
      flatten.push("xenograft");
    }

    this.specimenRows = this.data.map(spe => ({
      id: spe.id,
      parent_id: spe.parent_id,
      donor_id: spe.donor_id,
      creation_date: spe.creation_date,
      ...this.mapProps(spe, ["id", "parent_id", "donor_id", "creation_date", "interventions", "info"], flatten)
    }));

    this.interventionRows = this.data.filter(spe => !!spe.interventions).flatMap(spe => spe.interventions.map(int => ({
      specimen_id: spe.id,
      specimen_type: SubmissionType.getLabel(this.type),
      specimen_donor_id: spe.donor_id,
      ...int
    })));
  }
}
</script>