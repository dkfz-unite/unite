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

      // if (this.specimen.type != "Material") {
      //   data.push({ title: "Interventions", available: this.specimen.data?.interventions });
      //   data.push({ title: "Drug Screenings", available: this.specimen.data?.drugs });
      // }

      // if (this.specimen.type == "Material" && this.specimen.material?.tumorType != "Normal") {
      //   data.push({ title: "MR Images", available: !!this.specimen.data?.mrs });
      // }

      data.push({ title: "Simple Mutations (SM)", available: !!this.specimen.data?.sms });
      data.push({ title: "Copy Number Variants (CNV)", available: !!this.specimen.data?.cnvs });
      data.push({ title: "Structural Variants (SV)", available: !!this.specimen.data?.svs });
      data.push({ title: "Methylation", available: !!this.specimen.data?.meth });
      data.push({ title: "Bulk Gene Expressions", available: !!this.specimen.data?.exp });
      data.push({ title: "Single Cell Gene Expressions", available: !!this.specimen.data?.expSc });

      return data;
    }
  }
}
</script>