<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <u-donor-filters 
        v-model="filtersCriteria.donorFiltersCriteria"
        :context="filtersContext.donorFiltersContext"
        @update:modelValue="onUpdate"
      />
    </div>
    <div class="row" v-if="filtersCriteria.donorFiltersCriteria.numberOfFilters">
      <u-filters-button-clear @click="filtersCriteria.donorFiltersCriteria.clear(); onUpdate();" />
    </div>
  </div>
</template>

<script>
import UDonorFilters from "../../../../../_shared/components/filters/domain/donors/DonorFilters.vue";
import UFiltersButtonClear from "../../../../../_shared/components/filters/FiltersButtonClear.vue";
import filtersMixin from "../../../../../_shared/components/filters/filters-mixin";

import FiltersCriteria from "../../../../../_shared/components/filters/filters-criteria";
import FiltersContext from "../../../../../_shared/components/filters/filters-context";

export default {
  components: {
    UDonorFilters,
    UFiltersButtonClear
  },

  mixins: [filtersMixin],

  data() {
    return {
      filtersCriteria: this.modelValue || new FiltersCriteria(),
      filtersContext: this.context || new FiltersContext(),
    };
  }
}
</script>