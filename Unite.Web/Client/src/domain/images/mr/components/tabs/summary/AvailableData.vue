<template>
  <div class="col q-gutter-y-sm" v-if="image">
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
    image: {
      type: Object,
      default() {
        return null;
      }
    }
  },

  computed: {
    availableDataTypes() {
      if (!this.image) return [];

      return [
        { title: "Simple Mutations (SM)", available: !!this.image.data.sms },
        { title: "Copy Number Variants (CNV)", available: !!this.image.data.cnvs },
        { title: "Structural Variants (SV)", available: !!this.image.data.svs },
        { title: "Methylation", available: !!this.image.data.meth },
        { title: "Bulk Gene Expressions", available: !!this.image.data.exp },
        { title: "Single Cell Gene Expressions", available: !!this.image.data.expSc },
      ];
    }
  }
}
</script>