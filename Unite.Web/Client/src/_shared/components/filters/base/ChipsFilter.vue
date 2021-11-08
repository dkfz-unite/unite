<template>
  <q-select
    :label="label"
    :placeholder="placeholder"
    :disable="disable"
    v-model="modelValue"
    @update:modelValue="onUpdate"
    new-value-mode="add-unique"
    multiple clearable use-input use-chips
    square outlined dense options-dense hide-dropdown-icon
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Array,
      default() {
        return null;
      }
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    }
  },

  emits: ["update:modelValue"],

  methods: {
    onUpdate(value) {
      this.$emit("update:modelValue", value);
    },
  }
}
</script>