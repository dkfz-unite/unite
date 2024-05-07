<template>
  <q-btn
    label="Delete"
    title="Delete dataset"
    icon="las la-trash"
    color="red"
    dense flat no-caps
    @click="onDelete">
  </q-btn>
</template>

<script>
export default {
  props: {
    domain: {
      type: Object,
      required: true
    },
    dataset: {
      type: Object,
      required: true
    }
  },

  emits: ["click"],

  methods: {
    onDelete() {
      this.$store.dispatch(`${this.domain.name}/deleteDataset`, this.dataset.name);
      this.$emit("click");
    }
  }
}
</script>