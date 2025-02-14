<template>
  <div class="col q-gutter-y-sm" v-if="donor">
    <div class="row">
      <span class="text-h5 u-text-title">Available Data</span>
    </div>

    <div class="row">
      <div class="col">
        <u-available-data :types="availableDataTypes" />
      </div>
    </div>
  </div>
</template>

<script>
import UAvailableData from "@/domain/_shared/entry/components/tabs/summary/AvailableData.vue";

export default {
  components: {
    UAvailableData
  },

  props: {
    donor: {
      type: Object,
      default() {
        return null;
      }
    }
  },

  computed: {
    availableDataTypes() {
      if (!this.donor) return [];

      return [
        // { title: "Clinical", available: !!this.donor.data.clinical },
        // { title: "Treatments", available: !!this.donor.data.treatments },
        // { title: "MRI Images", available: !!this.donor.data.mris },
        { title: "Simple Somatic Mutations (SSM)", available: !!this.donor.data.ssms },
        { title: "Copy Number Variants (CNV)", available: !!this.donor.data.cnvs },
        { title: "Structural Variants (SV)", available: !!this.donor.data.svs },
        { title: "Bulk Gene Expressions", available: !!this.donor.data.exp },
        { title: "Single Cell Gene Expressions", available: !!this.donor.data.expSc }
      ];
    }
  }
}
</script>