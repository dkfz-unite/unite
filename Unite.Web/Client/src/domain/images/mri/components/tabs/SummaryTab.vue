<template>
  <div class="col">
    <div class="row q-col-gutter-sm" :class="{ 'q-col-gutter-md': $q.screen.gt.sm }">

      <div class="col-12 col-md-7 q-gutter-y-sm">
        <div class="row">
          <u-summary :image="image" />
        </div>
        <div class="row">
          <u-available-data :image="image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UAvailableData from "./summary/AvailableData.vue";

export default {
  components: {
    USummary,
    UAvailableData
  },

  props: {
    image: Object
  }
}
</script>