<template>
  <q-btn
    label="Delete"
    title="Delete filters"
    icon="las la-trash"
    color="orange"
    dense flat no-caps
    @click="deleteFilters">
  </q-btn>
</template>

<script>
import cohortsStorage from "../../../services/cohorts-storage";

export default {
  props: ["identity", "domain", "cohort"],
  emits: ["deleted"],

  methods: {
    deleteFilters() {
      const data = {
        domain: this.domain.name,
        cohort: this.cohort.name
      };

      cohortsStorage.deleteCohort(this.identity, data);
      
      this.$emit("deleted");
    }
  }
}
</script>