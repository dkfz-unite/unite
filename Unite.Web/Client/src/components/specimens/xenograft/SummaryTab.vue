<template>
  <div class="col">
    <div class="row q-col-gutter-sm" :class="{ 'q-col-gutter-md': $q.screen.gt.sm }">

      <div class="col-12 col-md-7 q-gutter-y-sm">
        <div class="row">
          <u-summary :specimen="specimen" />
        </div>
        <div class="row">
          <u-molecular-data :specimen="specimen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UMolecularData from "../_common/summary/MolecularData.vue";

export default {
  props: ["specimen"],

  components: {
    USummary: USummary,
    UMolecularData: UMolecularData
  },
};
</script>