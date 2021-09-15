<template>
  <div class="col">
    <div class="row q-col-gutter-sm" :class="{ 'q-col-gutter-md': $q.screen.gt.sm }">
      
      <div class="col-12 col-md-7 q-gutter-y-sm">
        <div class="row">
          <u-clinical-data :donor="donor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UClinicalData from "./clinical/ClinicalData.vue";

export default {
  props: ["donor"],

  components: {
    UClinicalData: UClinicalData
  },
};
</script>