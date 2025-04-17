<template>
  <div class="col q-gutter-y-sm q-mb-xs">
    <div class="row text-weight-medium">Simple Mutations (SM)</div>

    <div class="row">
      <div class="col">
        <q-select
          label="Category"
          v-model="category"
          :options="categories"
          :disable="!show"
          @update:model-value="update"
          outlined dense options-dense>
        </q-select>
      </div>
    </div>

    <div class="row" v-if="!isImpact">
      <div class="col q-gutter-y-xs">
        <div class="row">Nucleotide:</div>
        <div class="row">
          <u-view-figure class="col" type="square" color="red-4"><b>A</b>denine</u-view-figure>
          <u-view-figure class="col" type="square" color="orange-4"><b>C</b>ytosine</u-view-figure>
        </div>
        <div class="row">
          <u-view-figure class="col" type="square" color="green-4"><b>G</b>uanine</u-view-figure>
          <u-view-figure class="col" type="square" color="blue-4"><b>T</b>hymine</u-view-figure>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col q-gutter-y-xs">
        <div class="row">Impact:</div>
        <div class="row justify-between">
          <u-view-figure type="square" color="red-4" :active="high" :show="isImpact">High</u-view-figure>
          <q-toggle dense v-model="high" @update:model-value="update" />
        </div>
        <div class="row justify-between">
          <u-view-figure type="square" color="orange-4" :active="moderate" :show="isImpact">Moderate</u-view-figure>
          <q-toggle dense v-model="moderate" @update:model-value="update" />
        </div>
        <div class="row justify-between">
          <u-view-figure type="square" color="green-4" :active="low" :show="isImpact">Low</u-view-figure>
          <q-toggle dense v-model="low" @update:model-value="update" />
        </div>
        <div class="row justify-between">
          <u-view-figure type="square" color="grey-4" :active="unknown" :show="isImpact">Unknown</u-view-figure>
          <q-toggle dense v-model="unknown" @update:model-value="update" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UViewFigure from "./ViewFigure.vue";

const categories = ["Impact", "Change from", "Change to"];

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
      category: categories.includes(this.modelValue.category) ? this.modelValue.category : "Impact",
      high: this.setValue(this.modelValue.high, true),
      moderate: this.setValue(this.modelValue.moderate, true),
      low: this.setValue(this.modelValue.low, true),
      unknown: this.setValue(this.modelValue.unknown, false),

      categories: categories
    }
  },

  computed: {
    isImpact() {
      return this.category == categories[0];
    },

    show() {
      return this.high || this.moderate || this.low || this.unknown;
    }
  },

  methods: {
    update() {
      this.$emit("update:modelValue", {
        category: this.category,
        high: this.high,
        moderate: this.moderate,
        low: this.low,
        unknown: this.unknown,
        show: this.show
      });
    },

    setValue(value, defaultValue) {
      return value != null ? value : defaultValue;
    }
  }
}
</script>