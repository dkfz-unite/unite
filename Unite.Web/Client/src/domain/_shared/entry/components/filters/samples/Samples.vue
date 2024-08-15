<template>
  <q-select
    label="Specimen"
    option-label="referenceId"
    v-model="value"
    :options="sampleOptions"
    :disable="!sampleOptions?.length"
    @update:model-value="$emit('update:modelValue', modelValue)"
    square dense>

    <template v-slot:selected-item="scope">
      <u-sample :sample="scope.opt" class="q-mt-sm q-ma-xs"/>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" dense class="q-mx-none q-px-xs">
        <u-sample :sample="scope.opt" :showAnalyses="true" />  
      </q-item>
    </template>

  </q-select>
</template>

<script>
import USample from "./Sample.vue";

export default {
  components: { USample },

  props: {
    modelValue: {
      type: Object
    },
    options: {
      type: [Array, Object, null],
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      value: this.modelValue
    }
  },

  computed: {
    sampleOptions() {
      return this.options.filter(option => option.analyses?.some(analysis => !!analysis.data));
    }
  },

  mounted() {
    if (!this.modelValue) {
      var option = this.options?.length ? this.options[0] : null;
      this.$emit("update:modelValue", option);
    }
  },

  watch: {
    modelValue(value) {
      this.value = value;
    },

    options(options) {
      var option = options?.length ? options[0] : null;
      this.$emit("update:modelValue", option);
    }
  }
}
</script>