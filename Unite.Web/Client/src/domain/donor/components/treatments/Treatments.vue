<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Treatments</span>
    </div>

    <div class="row">
      <div class="col-12 col-md-7">
        <u-treatments-timeline
          :diagnosisDate="diagnosisDate"
          :treatments="treatments" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import UTreatmentsTimeline from "./TreatmentsTimeline.vue";

export default {
  components: {
    UTreatmentsTimeline
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