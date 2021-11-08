<template>
  <div class="col">
    <!-- Title -->
    <div v-if="title">
      <span class="text-subtitle1 text-weight-medium">
        {{title}}
      </span>
    </div>

    <!-- Filters -->
    <div class="q-gutter-y-xs">
      <template v-for="filter in filters" :key="filter.field">
        <div v-if="hasFilters(filter, criteria[filter.field])">
          <!-- Filter label -->
          <span class="text-body2 text-grey-9 text-weight-medium">{{filter.label}}: </span>

          <!-- Values filter criteria -->
          <template v-if="filter.type == FilterType.Values">
            <u-values-filter-data :filter="filter" :values="criteria[filter.field]" />
          </template>

          <!-- Option filter criteria -->
          <template v-else-if="filter.type == FilterType.Option">
            <u-option-filter-data :filter="filter" :value="criteria[filter.field]" />
          </template>

          <!-- Options filter criteria -->
          <template v-else-if="filter.type == FilterType.Options">
            <u-options-filter-data :filter="filter" :values="criteria[filter.field]" />
          </template>

          <!-- Range filter criteria -->
          <template v-else-if="filter.type == FilterType.Range">
            <u-range-filter-data :filter="filter" :value="criteria[filter.field]" />
          </template>

          <!-- Boolean filter criteria -->
          <template v-else-if="filter.type == FilterType.Boolean">
            <u-boolean-filter-data :filter="filter" :value="criteria[filter.field]" />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FilterType from "../../../_shared/components/filters/filter-type";
import UOptionFilterData from "./base/OptionFilterData.vue";
import UOptionsFilterData from "./base/OptionsFilterData.vue";
import URangeFilterData from "./base/RangeFilterData.vue";
import UValuesFilterData from "./base/ValuesFilterData.vue";
import UBooleanFilterData from "./base/BooleanFilterData.vue";

export default {
  components: {
    UOptionFilterData,
    UOptionsFilterData,
    URangeFilterData,
    UValuesFilterData,
    UBooleanFilterData
  },

  props: {
    title: {
      type: String,
      defaul: null
    },

    criteria: {
      type: Object,
      required: true
    },

    filters: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {
      FilterType: FilterType
    };
  },

  methods: {
    hasFilters(filter, value) {
      const arrayFilters = [FilterType.Values, FilterType.Options];
      const rangeFilters = [FilterType.Range];

      if (arrayFilters.includes(filter.type)) {
        return !!value?.length;
      } else if (rangeFilters.includes(filter.type)) {
        return value?.from != null || value?.to != null;
      } else {
        return value != null;
      }
    }
  }
}
</script>