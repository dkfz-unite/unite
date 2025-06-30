<template>
  <!-- Values filter -->
  <template v-if="filter.type == FilterType.Values">
    <u-values-filter
      v-model:value="filterValue"
      v-model:exclude="filterExclude"
      :label="filter.label"
      :placeholder="filter.placeholder"
      @update:value="onUpdate"
      @update:exclude="onExclude"
    />
  </template>
  
  <!-- Option filter -->
  <template v-else-if="filter.type == FilterType.Option">
    <u-option-filter
      v-model:value="filterValue"
      v-model:exclude="filterExclude"
      :label="filter.label"
      :options="filterOptions"
      @update:value="onUpdate"
      @update:exclude="onExclude"
    />
  </template>

  <!-- Options filter -->
  <template v-else-if="filter.type == FilterType.Options">
    <u-options-filter
      v-model:value="filterValue"
      v-model:exclude="filterExclude"
      :label="filter.label"
      :options="filterOptions"
      @update:value="onUpdate"
      @update:exclude="onExclude"
    />
  </template>

  <!-- Boolean filter -->
  <template v-else-if="filter.type == FilterType.Boolean">
    <u-boolean-filter
      v-model:value="filterValue"
      :label="filter.label"
      :nullable="filter.nullable"
      @update:value="onUpdate"
    />
  </template>

  <!-- Boolean filter -->
  <template v-else-if="filter.type == FilterType.Number">
    <u-number-filter
      v-model:value="filterValue"
      v-model:exclude="filterExclude"
      :label="filter.label"
      :default="filter.default"
      @update:value="onUpdate"
      @update:exclude="onExclude"
    />
  </template>

  <!-- Range filter -->
  <template v-else-if="filter.type == FilterType.Range">
    <u-range-filter
      v-model:value="filterValue"
      v-model:exclude="filterExclude"
      :label="filter.label"
      :labelFrom="filter.labelFrom"
      :labelTo="filter.labelTo"
      :placeholderFrom="filter.placeholderFrom"
      :placeholderTo="filter.placeholderTo"
      :showFrom="filter.showFrom"
      :showTo="filter.showTo"
      :expandable="filter.expandable"
      @update:value="onUpdate"
      @update:exclude="onExclude"
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
import UValuesFilter from "./base/ValuesFilter.vue";
import UOptionFilter from "./base/OptionFilter.vue";
import UOptionsFilter from "./base/OptionsFilter.vue";
import UBooleanFilter from "./base/BooleanFilter.vue";
import UNumberFilter from "./base/NumberFilter.vue";
import URangeFilter from "./base/RangeFilter.vue";
import UThresholdFilter from "./base/ThresholdFilter.vue";

import FilterType from "./filter-type";
import ValueType from "./filter-value-type";

export default {
  components: {
    UValuesFilter,
    UOptionFilter,
    UOptionsFilter,
    UBooleanFilter,
    UNumberFilter,
    URangeFilter,
    UThresholdFilter
  },

  props: {
    value: {
      type: [String, Number, Boolean, Object, Array],
      required: false
    },

    exclude: {
      type: Boolean,
      default: false
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

  emits: ["update:value", "update:exclude"],

  setup() {
    return {
      FilterType: FilterType,
      ValueType: ValueType
    };
  },

  data() {
    return {
      filterValue: this.value,
      filterExclude: this.exclude,
      filterOptions: this.options
    };
  },

  watch: {
    value(value) {
      this.filterValue = value;
    },

    exclude(value) {
      this.filterExclude = value;
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

      this.$emit("update:value", value);
    },

    onExclude() {
      let exclude = this.filterExclude;

      this.$emit("update:exclude", exclude);
    }
  }
}
</script>