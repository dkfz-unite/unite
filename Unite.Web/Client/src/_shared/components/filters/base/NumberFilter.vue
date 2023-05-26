<template>
  <q-input 
    :label="label"
    :placeholder="placeholder"
    :disable="disable"
    v-model.number="value"
    @update:modelValue="onUpdate"
    type="number"
    debounce="500"
    clearable
    square outlined dense 
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: null
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
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    default: {
      type: Number,
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

  methods:{
    onUpdate(value) {
      if (value == null || value == "") {
        if (this.default != null) {
          this.value = this.default;
        }
      };
      this.$emit("update:modelValue", this.value);
    }
  }
}
</script>