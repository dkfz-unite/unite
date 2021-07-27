<template>
  <q-timeline>
    <q-timeline-entry
      v-if="interventions[0].startDay > 0"
      title="Observation" 
      subtitle="Day 0" 
    />

    <q-timeline-entry
      v-for="(intervention, index) in interventions"
      :key="index"
      :title="intervention.type"
      :subtitle="contentHelpers.toTimespanString(intervention.startDay, intervention.durationDays)">
      <u-interventions-timeline-item :intervention="intervention" />
    </q-timeline-entry>
  </q-timeline>
</template>

<script>
import UInterventionsTimelineItem from "./InterventionsTimelineItem.vue";

import contentHelpers from "../../../../services/helpers/helpers.content.js";

export default {
  props: {
    interventions: {
      type: Array,
      required: true,
    },
  },

  data(){
    return {
      contentHelpers: contentHelpers
    }
  },

  components: {
    UInterventionsTimelineItem: UInterventionsTimelineItem,
  },
};
</script>