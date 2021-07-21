<template>
  <q-timeline>
    <q-timeline-entry
      v-if="diagnosisDate"
      title="Diagnosis Statement" 
      subtitle="Day 0" 
    />

    <q-timeline-entry
      v-for="(treatment, index) in treatments"
      :key="index"
      :title="treatment.therapy"
      :subtitle="contentHelpers.toTimespanString(treatment.startDay, treatment.durationDays)"
      :color="treatment.progressionStatus ? 'orange': 'primary'">
      <u-treatments-timeline-item :treatment="treatment" />
    </q-timeline-entry>
  </q-timeline>
</template>

<script>
import UTreatmentsTimelineItem from "./TreatmentsTimelineItem.vue";

import contentHelpers from "../../../services/helpers/helpers.content.js";

export default {
  props: {
    diagnosisDate: {
      type: String,
      required: false,
      default: null
    },
    treatments: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      contentHelpers: contentHelpers
    }
  },

  components: {
    UTreatmentsTimelineItem: UTreatmentsTimelineItem,
  },
};
</script>