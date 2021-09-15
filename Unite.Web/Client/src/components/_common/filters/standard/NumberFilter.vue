<template>
  <q-input 
    :label="label"
    :placeholder="placeholder"
    :value="value"
    @input="onInput"
    type="number"
    debounce="500"
    clearable
    square outlined dense 
  />
</template>

<script>
export default {
  props: ["value", "label", "placeholder"],

  methods:{
    onInput(value){
      this.$emit("input", value);
    }
  }
}
</script>