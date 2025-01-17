<template>
  <q-btn 
    label="Show"
    title="Show dataset"
    icon="las la-search"
    color="secondary"
    dense flat no-caps
    @click="applyFilters">
  </q-btn>
</template>

<script>
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";

export default {
  props: {
    dataset: {
      type: Object,
      required: true
    }
  },

  methods: {
    applyFilters() {
      const domain = this.dataset.domain;
      const criteria = new FiltersCriteria(this.dataset.criteria);

      this.$store.state[domain].filtersCriteria = criteria;
      this.$router.push({ name: domain });
    }
  }
}
</script>
