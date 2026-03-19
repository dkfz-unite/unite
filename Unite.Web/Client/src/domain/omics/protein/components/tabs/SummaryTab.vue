<template>
  <div class="col q-gutter-y-sm">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-7">
        <u-summary :protein="protein" />
      </div>

      <div class="col-12 col-md-5">
        <u-info :protein="protein" />
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UInfo from "./summary/Info.vue";

export default {
  components:{
    USummary,
    UInfo
  },

  props: {
    protein: Object
  }
}
</script>