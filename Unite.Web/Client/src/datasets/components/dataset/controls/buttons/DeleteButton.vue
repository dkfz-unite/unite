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
    dataset: {
      type: Object,
      required: true
    }
  },

  emits: ["click"],

  methods: {
    async onDelete() {
      await this.$store.dispatch("datasets/deleteOne", this.dataset.id);
      this.$emit("click");
    }
  }
}
</script>
