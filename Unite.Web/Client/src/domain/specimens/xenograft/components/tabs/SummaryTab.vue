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
        <div class="row">
          <u-available-data :specimen="specimen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UMolecularData from "@/domain/specimens/_shared/specimen/components/tabs/summary/MolecularData.vue";
import UAvailableData from "@/domain/specimens/_shared/specimen/components/tabs/summary/AvailableData.vue";

export default {
  components: {
    USummary,
    UMolecularData,
    UAvailableData
  },

  props: {
    specimen: {
      type: Object,
      required: true
    }
  }
}
</script>