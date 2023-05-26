<template>
  <q-btn icon="las la-ellipsis-v" title="Columns" class="q-px-none" unelevated dense>
    <q-menu>
      <q-list dense>
        <q-item v-for="option in options">
          <q-item-section>
            <q-checkbox
              v-model="option.show"
              :label="option.label"
              :disable="option.required"
              @update:model-value="update"
              dense
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  props: ["modelValue", "columns"],

  emits: ["update:modelValue"],

  data() {
    return {
      options: this.columns.map(column => ({
        name: column.name,
        label: column.label || column.name,
        required: column.required || false,
        show: this.modelValue.includes(column.name)
      }))
    }
  },

  methods: {
    update() {
      const values = this.options.filter((option) => option.show).map((option) => option.name);
      this.$emit("update:modelValue", values);
    }
  }
}
</script>