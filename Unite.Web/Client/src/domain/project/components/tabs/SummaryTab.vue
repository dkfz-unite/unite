<template>
  <div class="col">
    <div class="row q-col-gutter-sm" :class="{ 'q-col-gutter-md': $q.screen.gt.sm }">
      
      <div class="col-12 col-md-7 q-gutter-y-sm">
        <div class="row">
          <u-summary :project="project" />
        </div>
        <div class="row">
          <u-description :project="project" />
        </div>
      </div>

      <div class="col-12 col-md-5 q-gutter-y-sm">
        <div class="row">
          <u-available-data :project="project" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UDescription from "./summary/Description.vue";
import UAvailableData from "./summary/AvailableData.vue";

export default {
  components: {
    USummary,
    UDescription,
    UAvailableData
  },

  props: {
    project: {
      type: Object,
      default() {
        return null;
      }
    }
  }
}
</script>