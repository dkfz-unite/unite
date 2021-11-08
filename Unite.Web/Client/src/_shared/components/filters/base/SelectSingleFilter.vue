<template>
  <q-select
    :label="label"
    :disable="disable || !hasOptions"
    :options="options"
    v-model="modelValue"
    @update:modelValue="onUpdate"
    clearable emit-value map-options
    square outlined dense options-dense hide-dropdown-icon
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      default() {
        return null;
      }
    },
    options: {
      type: Array,
      default() {
        return null;
      }
    },
    label: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ["update:modelValue"],

  computed: {
    hasOptions() {
      return !!this.options?.length;
    },
  },

  methods: {
    onUpdate(value) {
      this.$emit("update:modelValue", value);
    },
  }
}
</script>