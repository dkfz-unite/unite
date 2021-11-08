<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Interventions</span>
    </div>

    <div class="row">
      <div class="col-12 col-md-7">
        <u-interventions-timeline :interventions="interventions" />
      </div>
    </div>
  </div>
</template>

<script>
import UInterventionsTimeline from "./InterventionsTimeline.vue";

export default {
  components: {
    UInterventionsTimeline
  },

  props: {
    interventions: {
      type: Array,
      required: true
    }
  }
}
</script>