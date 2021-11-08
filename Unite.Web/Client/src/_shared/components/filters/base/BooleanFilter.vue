<template>
  <div class="column q-pa-sm u-check-box">
    <q-checkbox
      v-model="modelValue"
      :label="label"
      :disable="disable"
      @update:modelValue="onUpdate"
      toggle-indeterminate dense
    />
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: Boolean,
        default: null
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

    methods: {
      onUpdate(value) {
        this.$emit("update:modelValue", value);
      },
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/quasar.variables.scss';

.u-check-box {
  border: 1px solid $grey-5;
}
</style>