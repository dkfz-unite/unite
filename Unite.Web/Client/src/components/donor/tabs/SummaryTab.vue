<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12 col-md-6">
        <u-summary :donor="donor" />
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <u-available-data :donor="donor" />
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "@/components/donor/summary/Summary.vue";
import UAvailableData from "@/components/donor/summary/AvailableData.vue";

export default {
  props: ["donor"],

  components: {
    USummary: USummary,
    UAvailableData: UAvailableData,
  },
};
</script>