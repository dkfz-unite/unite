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
      :subtitle="$helpers.content.toTimespanString(treatment.startDay, treatment.durationDays)"
      :color="treatment.progressionStatus ? 'orange': 'primary'"
    >
      <u-treatments-timeline-item :treatment="treatment" />
    </q-timeline-entry>
  </q-timeline>
</template>

<script>
import UTreatmentsTimelineItem from "./TreatmentsTimelineItem.vue";

export default {
  components: {
    UTreatmentsTimelineItem
  },

  props: {
    diagnosisDate: {
      type: String,
      required: false,
      default: null
    },
    
    treatments: {
      type: Array,
      required: true
    }
  }
}
</script>