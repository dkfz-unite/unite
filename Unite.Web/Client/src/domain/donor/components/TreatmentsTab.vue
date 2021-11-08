<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-treatments
          :diagnosisDate="diagnosisDate"
          :treatments="treatments" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import UTreatments from "./treatments/Treatments.vue";

export default {
  components: {
    UTreatments
  },

  props: {
    donor: {
      type: Object,
      required: true,
    }
  },

  computed: {
    diagnosisDate() {
      return this.donor.clinicalData?.diagnosisDate;
    },

    treatments() {
      return this.donor.treatments;
    }
  }
}
</script>