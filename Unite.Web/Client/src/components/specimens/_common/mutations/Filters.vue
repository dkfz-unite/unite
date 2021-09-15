<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <u-mutation-filters v-model="criteria.mutationFilters" @input="onInput" />
    </div>
  </div>
</template>

<script>
import UMutationFilters from "../../../_common/filters/MutationFilters.vue";

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
    UMutationFilters: UMutationFilters
  },
}
</script>