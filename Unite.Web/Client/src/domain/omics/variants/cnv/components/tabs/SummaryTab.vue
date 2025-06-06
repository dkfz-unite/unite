<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12 col-md-7">
        <u-summary :variant="variant" />
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";

export default {
  components:{
    USummary
  },

  props: {
    variant: Object
  }
}
</script>