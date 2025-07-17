<template>
  <div class="col">
    <!-- Title -->
    <div v-if="title">
      <span class="text-subtitle1 text-weight-medium">
        {{ title }}
      </span>
    </div>

    <!-- Criteria -->
    <div class="q-gutter-y-xs">
      <template v-for="filter in filterItems" :key="filter.field">
        <div v-if="hasFilters(filter, criteria[filter.field])">
          <!-- Criteria title -->
          <span class="text-body2 text-grey-9 text-weight-medium">{{ filter.label }}: </span>

          <!-- Values criteria -->
          <template v-if="filter.type == FilterType.Values">
            <u-values-criteria :filter="filter" :values="criteria[filter.field].value" :not="criteria[filter.field].not" />
          </template>

          <!-- Option criteria -->
          <template v-else-if="filter.type == FilterType.Option">
            <u-option-criteria :filter="filter" :value="criteria[filter.field].value" :not="criteria[filter.field].not"/>
          </template>

          <!-- Options criteria -->
          <template v-else-if="filter.type == FilterType.Options">
            <u-options-criteria :filter="filter" :values="criteria[filter.field].value" :not="criteria[filter.field].not" />
          </template>

          <!-- Range criteria -->
          <template v-else-if="filter.type == FilterType.Range">
            <u-range-criteria :filter="filter" :value="criteria[filter.field].value" :not="criteria[filter.field].not" />
          </template>

          <!-- Boolean criteria -->
          <template v-else-if="filter.type == FilterType.Boolean">
            <u-boolean-criteria :filter="filter" :value="criteria[filter.field].value" />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import FilterType from "@/_shared/components/filters/filter-type";
import UOptionCriteria from "./base/OptionCriteria.vue";
import UOptionsCriteria from "./base/OptionsCriteria.vue";
import URangeCriteria from "./base/RangeCriteria.vue";
import UValuesCriteria from "./base/ValuesCriteria.vue";
import UBooleanCriteria from "./base/BooleanCriteria.vue";

export default {
  components: {
    UOptionCriteria,
    UOptionsCriteria,
    URangeCriteria,
    UValuesCriteria,
    UBooleanCriteria
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

  computed: {
    filterItems() {
      return this.filters.flatMap(item => item.group ? [...item.filters] : [item]);
    }
  },

  methods: {
    hasFilters(filter, value) {      
      const arrayFilters = [FilterType.Values, FilterType.Options];
      const rangeFilters = [FilterType.Range];      

      if (arrayFilters.includes(filter.type)) {
        return !!value?.value?.length;
      } else if (rangeFilters.includes(filter.type)) {
        return value?.value?.from != null || value?.value?.to != null;
      } else {
        return value?.value != null;
      }
    }
  }
}
</script>