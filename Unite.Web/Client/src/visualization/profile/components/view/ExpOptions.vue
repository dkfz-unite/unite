<template>
  <div class="col q-gutter-y-sm q-mb-xs">
    <div class="row text-weight-medium">Gene expressions</div>

    <div class="row">
      <div class="col q-gutter-y-xs">
        <div class="row">Value:</div>

        <div class="row justify-between">
          <u-view-figure type="square" color="red-4" :active="reads">Reads</u-view-figure>
          <q-toggle dense v-model="reads" @update:model-value="update" />
        </div>
        <div class="row justify-between">
          <u-view-figure type="square" color="orange-4" :active="tpm">TPM</u-view-figure>
          <q-toggle dense v-model="tpm" @update:model-value="update" />
        </div>
        <div class="row justify-between">
          <u-view-figure type="square" color="green-4" :active="fpkm">FPKM</u-view-figure>
          <q-toggle dense v-model="fpkm" @update:model-value="update" />
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
      reads: this.setValue(this.modelValue.reads, false),
      tpm: this.setValue(this.modelValue.tpm, false),
      fpkm: this.setValue(this.modelValue.fpkm, true)
    }
  },

  computed: {
    show() {
      return this.reads || this.tpm || this.fpkm;
    }
  },

  methods: {
    update() {
      this.$emit("update:modelValue", {
        reads: this.reads,
        tpm: this.tpm,
        fpkm: this.fpkm,
        show: this.show
      });
    },

    setValue(value, defaultValue) {
      return value != null ? value : defaultValue;
    }
  }
}
</script>