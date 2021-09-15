<template>
  <div class="col q-gutter-y-sm">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-7">
        <u-summary :gene="gene" />
      </div>

      <div class="col-12 col-md-5">
        <u-info :gene="gene" />
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UInfo from "./summary/Info.vue";

export default {
  props: ["gene"],

  components:{
    USummary: USummary,
    UInfo: UInfo
  }
};
</script>