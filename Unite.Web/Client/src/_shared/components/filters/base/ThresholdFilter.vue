<template>
  <q-input 
    :label="label"
    :placeholder="placeholder"
    :disable="disable"
    v-model.number="value"
    type="number"
    debounce="500"
    clearable
    square outlined dense>

    <template v-slot:prepend>
      <q-icon :name="icon" @click="mode = !mode" color="primary" style="margin-left: -5px; cursor: pointer;" />
    </template>
  </q-input>
</template>

<script>
import UNumberFilter from "./NumberFilter.vue";

export default {
  components: {
    UNumberFilter
  },

  props: {
    modelValue: {
      type: [Object, null],
      default: { value: null, mode: true }
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

  computed: {
    value: {
      get() { return this.modelValue?.value },
      set(value) {
        const model = { value: value, mode: this.mode };
        this.$emit("update:modelValue", model);
      }
    },

    mode: {
      get() { return this.modelValue?.mode },
      set(value) {
        const model = { value: this.value, mode: value };
        this.$emit("update:modelValue", model);
      }
    },

    icon() {
      return this.mode ? "las la-angle-right" : "las la-angle-left";
    }
  }
}
</script>