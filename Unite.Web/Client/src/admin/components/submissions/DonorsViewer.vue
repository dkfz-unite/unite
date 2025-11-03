<template>
  <div v-if="type === SubmissionType.DON" class="col">
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
  <div v-else-if="type === SubmissionType.DON_TRT" class="col">
    <u-table-viewer :entries="treatmentRows" />
  </div>
</template>

<script>
import UTableViewer from "./TableViewer.vue";
import SubmissionType from "@/domain/_shared/common/data/enums/submission-type";

export default {
  components: {
    UTableViewer
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },

  setup() {
    return {
      SubmissionType: SubmissionType
    };
  },

  data() {
    return {
      tab: "donors",
      donorRows: [],
      clinicalRows: [],
      treatmentRows: []
    };
  },

  mounted() {
    if (this.type == SubmissionType.DON) {
      this.donorRows = this.data.map(i => this.mapProps(i, ["clinical_data", "treatments"], ["projects", "studies"]));
      this.clinicalRows = this.data.filter(i => !!i.clinical_data).map(i => ({ donor_id: i.id, ...i.clinical_data }));
      this.treatmentRows = this.data.filter(i => !!i.treatments).flatMap(i => i.treatments.map(t => ({ donor_id: i.id, ...t })));
    } else if (this.type == SubmissionType.DON_TRT) {
      this.treatmentRows = this.data;
    }
  },

  methods: {
    mapProps(obj, ignore = [], flat = []) {
      const mapped = {};

      Object.keys(obj).forEach(key => {
        if (ignore.includes(key))
          return;

        if (flat.includes(key)) {
          mapped[key] = obj[key].join(", ");
        } else {
          mapped[key] = obj[key];
        }
      });

      return mapped;
    }
  }
}
</script>