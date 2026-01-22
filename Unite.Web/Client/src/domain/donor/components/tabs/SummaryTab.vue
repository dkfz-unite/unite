<template>
  <div class="col">
    <div class="row q-col-gutter-sm" :class="{ 'q-col-gutter-md': $q.screen.gt.sm }">
      
      <div class="col-12 col-md-7 q-gutter-y-sm">
        <div class="row">
          <u-summary :donor="donor" />
        </div>
        <div>
          <u-clinical-data :donor="donor" />
        </div>
      </div>

      <div class="col-12 col-md-5 q-gutter-y-sm">
        <div class="row">
          <u-available-data :donor="donor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UClinicalData from "./summary/ClinicalData.vue";
import UAvailableData from "./summary/AvailableData.vue";

export default {
  components: {
    USummary,
    UClinicalData,
    UAvailableData
  },

  props: {
    donor: {
      type: Object,
      default() {
        return null;
      }
    }
  }
}
</script>