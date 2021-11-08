<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <u-mutation-filters 
        v-model="filtersCriteria.mutationFiltersCriteria"
        :context="filtersContext.mutationFiltersContext"
        @update:modelValue="onUpdate" 
      />
    </div>
    <div class="row" v-if="filtersCriteria.mutationFiltersCriteria.numberOfFilters">
      <u-filters-button-clear @click="filtersCriteria.mutationFiltersCriteria.clear(); onUpdate();" />
    </div>
  </div>
</template>

<script>
import UMutationFilters from "../../../../../_shared/components/filters/domain/genome/mutations/MutationFilters.vue";
import UFiltersButtonClear from "../../../../../_shared/components/filters/FiltersButtonClear.vue";
import filtersMixin from "../../../../../_shared/components/filters/filters-mixin";

import FiltersCriteria from "../../../../../_shared/components/filters/filters-criteria";
import FiltersContext from "../../../../../_shared/components/filters/filters-context";

export default {
  components: {
    UMutationFilters,
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