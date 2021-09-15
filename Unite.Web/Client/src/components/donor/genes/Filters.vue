<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <u-gene-filters v-model="criteria.geneFilters" @input="onInput" />
    </div>
  </div>
</template>

<script>
import UGeneFilters from "../../_common/filters/GeneFilters.vue";

export default {
  props: ["value"],

  data() {
    return {
      criteria: this.value,
    };
  },

  methods: {
    onInput() {
      this.$emit("input", this.criteria);
    },
  },

  components: {
    UGeneFilters: UGeneFilters
  },
}
</script>