<template>
  <q-btn
    v-if="criteria?.numberOfFilters"
    label="Clear"
    title="Clear filters"
    icon="las la-times-circle"
    color="orange"
    dense flat no-caps 
    @click="onClear">
  </q-btn>
</template>

<script>
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";

export default {
  inject: ["domain"],

  computed: {
    criteria: {
      get() { return this.$store.state[this.domain].filtersCriteria; },
      set(value) { this.$store.state[this.domain].filtersCriteria = value }
    }
  },

  methods: {
    onClear() {
      this.criteria = new FiltersCriteria();
    }
  }
}
</script>