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
export default {
  props: ["domain", "cohort"],

  emits: ["click"],

  methods: {
    onDelete() {
      this.$store.dispatch(`${this.domain.name}/deleteCohort`, this.cohort.name);
      this.$emit("click");
    }
  }
}
</script>