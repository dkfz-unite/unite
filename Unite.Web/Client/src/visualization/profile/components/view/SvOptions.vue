<template>
  <div class="col q-gutter-y-sm q-mb-xs">
    <div class="row text-weight-medium">Structural Variants (SV)</div>

    <div class="row">
      <div class="col">
        <div class="row justify-between">
          <div>Type</div>
          <q-toggle dense v-model="type" @update:model-value="update" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="row">
          <u-view-figure class="col" type="square" color="purple-4" :active="type">ITX</u-view-figure>
          <u-view-figure class="col" type="square" color="cyan-4" :active="type">CTX</u-view-figure>
          <u-view-figure class="col" type="square" color="green-4" :active="type">DUP</u-view-figure>
        </div>
        <div class="row">
          <u-view-figure class="col" type="square" color="red-4" :active="type">DEL</u-view-figure>
          <u-view-figure class="col" type="square" color="orange-5" :active="type">INS</u-view-figure>
          <u-view-figure class="col" type="square" color="grey-4" :active="type">INV</u-view-figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UViewFigure from "./ViewFigure.vue";

export default {
  components: {
    UViewFigure
  },

  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ["update:modelValue"],

  data() {
    return {
      type: this.setValue(this.modelValue.type, true)
    }
  },

  methods: {
    update() {
      this.$emit("update:modelValue", {
        type: this.type,
        show: this.type == true
      });
    },

    setValue(value, defaultValue) {
      return value != null ? value : defaultValue;
    }
  }
}
</script>
