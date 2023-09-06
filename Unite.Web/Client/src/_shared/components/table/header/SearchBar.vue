<template>
  <q-input
    v-model="value"
    @update:modelValue="onUpdate"
    placeholder="Search" 
    debounce="300" 
    style="width: 300px" 
    clearable dense>
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: null
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

  methods: {
    onUpdate(value) {
      this.$emit("update:modelValue", value?.trim());
    },
  }
}
</script>