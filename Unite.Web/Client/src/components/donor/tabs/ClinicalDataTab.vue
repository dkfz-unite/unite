<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-clinical-data :donor="donor" />
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <u-treatment-data :donor="donor" />
      </div>
    </div>
  </div>
</template>

<script>
import UClinicalData from "@/components/donor/clinical/ClinicalData.vue";
import UTreatmentData from "@/components/donor/clinical/TreatmentData.vue";

export default {
  props: ["donor"],

  components: {
    UClinicalData: UClinicalData,
    UTreatmentData: UTreatmentData,
  },
};
</script>