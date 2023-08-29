<template>
  <q-select
    :label="label"
    :disable="disable || !hasOptions"
    :options="options"
    v-model="value"
    @update:modelValue="onUpdate"
    multiple clearable use-chips emit-value map-options
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

  data() {
    return {
      value: this.modelValue
    }
  },

  watch: {
    modelValue(value) {
      this.value = value;
    }
  },

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