<template>
  <div class="column q-pa-sm u-check-box">
    <q-checkbox
      v-model="value"
      :label="label"
      :disable="disable"
      :toggle-indeterminate="nullable"
      @update:modelValue="onUpdate"
      dense
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
      },
      nullable: {
        type: Boolean,
        default: true
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