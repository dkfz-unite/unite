<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-interventions :interventions="specimen.organoid.interventions" />
      </div>
    </div>
  </div>
</template>

<script>
import UInterventions from "./interventions/Interventions.vue";

export default {
  components: {
    UInterventions
  },

  props: {
    specimen: {
      type: Object,
      required: true
    }
  }
}
</script>