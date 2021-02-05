<template>
  <q-checkbox
    :value="value"
    :label="label"
    :indeterminate-value="null"
    toggle-indeterminate dense
    @input="onInput">
  </q-checkbox>
</template>

<script>
  export default {
    props: ["value", "label"],

    methods: {
      onInput(value) {
        this.$emit("input", value);
      },
    },
  };
</script>