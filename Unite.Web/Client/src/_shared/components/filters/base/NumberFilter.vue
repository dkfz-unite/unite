<template>
  <q-input 
    :label="label"
    :placeholder="placeholder"
    :disable="disable"
    v-model.number="modelValue"
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
    }
  },
  
  emits: ["update:modelValue"],

  methods:{
    onUpdate(value){
      this.$emit("update:modelValue", value);
    }
  }
}
</script>