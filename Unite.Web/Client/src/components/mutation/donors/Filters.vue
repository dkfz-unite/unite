<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <u-donor-filters v-model="criteria.donorFilters" @input="onInput" />
    </div>
  </div>
</template>

<script>
import UDonorFilters from "@/components/common/filters/DonorFilters.vue";

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

  components:{
    UDonorFilters: UDonorFilters
  }
};
</script>