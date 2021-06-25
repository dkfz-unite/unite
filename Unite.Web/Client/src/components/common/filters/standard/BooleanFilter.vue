<template>
  <div class="column q-pa-sm u-check-box">
    <q-checkbox
      :value="value"
      :label="label"
      :indeterminate-value="null"
      toggle-indeterminate dense
      @input="onInput">
    </q-checkbox>
  </div>
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

<style lang="scss" scoped>
@import '@/styles/quasar.variables.scss';

.u-check-box {
  border: 1px solid $grey-5;
}
</style>