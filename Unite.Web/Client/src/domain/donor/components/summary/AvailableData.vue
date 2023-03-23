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
import UAvailableData from "@/domain/_shared/components/summary/AvailableData.vue";

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
        { title: "Clinical Data", available: !!this.donor.clinicalData },
        { title: "Treatment Data", available: !!this.donor.treatments?.length },
        { title: "Images", available: !!this.donor.numberOfImages },
        { title: "Simple Somatic Mutations (SSM)", available: !!this.donor.numberOfMutations },
        { title: "Copy Number Variants (CNV)", available: !!this.donor.numberOfCopyNumberVariants },
        { title: "Structural Variants (SV)", available: !!this.donor.numberOfStructuralVariants },
        { title: "Gene Expressions (Transcriptomics)", available: !!this.donor.hasGeneExpressions }
      ];
    }
  }
}
</script>