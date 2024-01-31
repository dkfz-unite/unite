<template>
  <q-timeline>
    <q-timeline-entry
      v-if="interventions[0].startDay > 1"
      title="Creation" 
      subtitle="Day 1" 
    />

    <q-timeline-entry
      v-for="(intervention, index) in interventions"
      :key="index"
      :title="intervention.type"
      :subtitle="$helpers.content.toTimespanString(intervention.startDay, intervention.durationDays)">
      <u-interventions-timeline-item :intervention="intervention" />
    </q-timeline-entry>
  </q-timeline>
</template>

<script>
import UInterventionsTimelineItem from "./InterventionsTimelineItem.vue";

export default {
  components: {
    UInterventionsTimelineItem
  },

  props: {
    interventions: {
      type: Array,
      required: true
    }
  }
}
</script>