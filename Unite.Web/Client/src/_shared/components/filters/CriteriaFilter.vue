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
      @update:modelValue="onUpdate"
    />
  </template>

  <!-- Range filter -->
  <template v-else-if="filter.type == FilterType.Range">
    <q-expansion-item :model-value="true" :label="filter.label" dense dense-toggle>
      <div class="col q-pt-xs q-gutter-y-sm">
        <div>
          <u-number-filter
            :label="filter.labelFrom || 'From'"
            :placeholder="filter.placeholderFrom"
            v-model="filterValue.from"
            @update:modelValue="onUpdate"
          />
        </div>

        <div>
          <u-number-filter
            :label="filter.labelTo || 'To'"
            :placeholder="filter.placeholderTo"
            v-model="filterValue.to"
            @update:modelValue="onUpdate"
          />
        </div>
      </div>
    </q-expansion-item>
  </template>
</template>

<script>
import UChipsFilter from "./base/ChipsFilter.vue";
import USelectOneFilter from "./base/SelectSingleFilter.vue";
import USelectManyFilter from "./base/SelectFilter.vue";
import UBooleanFilter from "./base/BooleanFilter.vue";
import UNumberFilter from "./base/NumberFilter.vue";

import FilterType from "./filter-type";
import ValueType from "./filter-value-type";

export default {
  components: {
    UChipsFilter,
    USelectOneFilter,
    USelectManyFilter,
    UBooleanFilter,
    UNumberFilter
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

  methods: {
    onUpdate() {
      let value = this.filterValue;

      if (this.filter.sanitize != null) {
        value = this.filter.sanitize(this.value);
      }

      this.$emit("update:modelValue", value);
    }
  }
}
</script>