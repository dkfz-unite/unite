<template>
  <!-- Values filter -->
  <template v-if="filter.type == FilterType.Values">
    <u-chips-filter
      v-model="filterValue"
      :label="filter.label"
      :placeholder="filter.placeholder"
      @update:modelValue="onUpdate"
    />
  </template>
  
  <!-- Option filter -->
  <template v-else-if="filter.type == FilterType.Option">
    <u-select-one-filter
      v-model="filterValue"
      :label="filter.label"
      :options="filterOptions"
      @update:modelValue="onUpdate"
    />
  </template>

  <!-- Options filter -->
  <template v-else-if="filter.type == FilterType.Options">
    <u-select-many-filter
      v-model="filterValue"
      :label="filter.label"
      :options="filterOptions"
      @update:modelValue="onUpdate"
    />
  </template>

  <!-- Boolean filter -->
  <template v-else-if="filter.type == FilterType.Boolean">
    <u-boolean-filter
      v-model="filterValue"
      :label="filter.label"
      :nullable="filter.nullable"
      @update:modelValue="onUpdate"
    />
  </template>

  <!-- Range filter -->
  <template v-else-if="filter.type == FilterType.Range">
    <u-range-filter
      v-model="filterValue"
      :label="filter.label"
      :labelFrom="filter.labelFrom"
      :labelTo="filter.labelTo"
      :placeholderFrom="filter.placeholderFrom"
      :placeholderTo="filter.placeholderTo"
      :showFrom="filter.showFrom"
      :showTo="filter.showTo"
      :expandable="filter.expandable"
      @update:modelValue="onUpdate"
    />
  </template>

  <!-- Threshold filter -->
  <template v-else-if="filter.type == FilterType.Threshold">
    <u-threshold-filter
      v-model="filterValue"
      :label="filter.label"
      :placeholder="filter.placeholder"
      @update:modelValue="onUpdate"
    />
  </template>
  
</template>

<script>
import UChipsFilter from "./base/ChipsFilter.vue";
import USelectOneFilter from "./base/SelectSingleFilter.vue";
import USelectManyFilter from "./base/SelectFilter.vue";
import UBooleanFilter from "./base/BooleanFilter.vue";
import UNumberFilter from "./base/NumberFilter.vue";
import URangeFilter from "./base/RangeFilter.vue";
import UThresholdFilter from "./base/ThresholdFilter.vue";

import FilterType from "./filter-type";
import ValueType from "./filter-value-type";

export default {
  components: {
    UChipsFilter,
    USelectOneFilter,
    USelectManyFilter,
    UBooleanFilter,
    UNumberFilter,
    URangeFilter,
    UThresholdFilter
  },

  props: {
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      required: false
    },

    filter: {
      type: Object,
      required: true
    },

    options: {
      type: Array,
      default: () => null
    }
  },

  emits: ["update:modelValue"],

  setup() {
    return {
      FilterType: FilterType,
      ValueType: ValueType
    };
  },

  data() {
    return {
      filterValue: this.modelValue,
      filterOptions: this.options
    };
  },

  watch: {
    modelValue(value) {
      this.filterValue = value;
    },

    options(value) {
      this.filterOptions = value;
    }
  },

  methods: {
    onUpdate() {
      let value = this.filterValue;

      if (this.filter.sanitize != null) {
        value = this.filter.sanitize(value);
      }

      this.$emit("update:modelValue", value);
    }
  }
}
</script>