<template>
  <q-btn 
    label="Show"
    title="Show cohort data"
    icon="las la-search"
    color="secondary"
    dense flat no-caps
    @click="applyFilters">
  </q-btn>
</template>

<script>
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";

export default {
  props: ["domain", "cohort"],

  methods: {
    applyFilters() {
      const domain = this.domain.name;
      const criteria = new FiltersCriteria(this.cohort.criteria);

      this.$store.state[domain].filtersCriteria = criteria;
      this.$router.push({ name: domain });
    }
  }
}
</script>