<template>
  <q-btn
    label="Delete"
    title="Delete cohort"
    icon="las la-trash"
    color="red"
    dense flat no-caps
    @click="onDelete">
  </q-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["domain", "cohort"],

  methods: {
    ...mapActions("filters", ["deleteCohort"]),

    onDelete() {
      this.deleteCohort({ domainName: this.domain.name, cohortName: this.cohort.name });
    }
  }
}
</script>