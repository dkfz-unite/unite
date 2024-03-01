<template>
  <div class="col q-gutter-y-sm" v-if="specimen">
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
    specimen: {
      type: Object,
      default() {
        return null;
      }
    }
  },

  computed: {
    availableDataTypes() {
      if (!this.specimen) return [];

      let data = [];

      // data.push({ title: "Molecular", available: this.specimen.data?.molecular });

      if (this.specimen.type == "Organoid" || this.specimen.type == "Xenograft") {
        data.push({ title: "Interventions", available: this.specimen.data?.interventions });
      }

      if (this.specimen.type != "Material") {
        data.push({ title: "Drug Screenings", available: this.specimen.data?.drugs });
      }

      if (this.specimen.type == "Material" && this.specimen.material?.tumorType != "Normal") {
        data.push({ title: "MRI Images", available: !!this.specimen.data?.mris });
      }

      data.push({ title: "Simple Somatic Mutations (SSM)", available: !!this.specimen.data?.ssms });
      data.push({ title: "Copy Number Variants (CNV)", available: !!this.specimen.data?.cnvs });
      data.push({ title: "Structural Variants (SV)", available: !!this.specimen.data?.svs });
      data.push({ title: "Bulk Gene Expressions (Transcriptomics)", available: !!this.specimen.data?.geneExp });

      return data;
    }
  }
}
</script>