<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <u-gene-filters
        v-model="filtersCriteria.geneFiltersCriteria"
        :context="filtersContext.geneFiltersContext"
        @update:modelValue="onUpdate"
      />
    </div>
    <div class="row" v-if="filtersCriteria.geneFiltersCriteria.numberOfFilters">
      <u-filters-button-clear @click="filtersCriteria.geneFiltersCriteria.clear(); onUpdate();" />
    </div>
  </div>
</template>

<script>
import UGeneFilters from "../../../../_shared/components/filters/domain/genome/genes/GeneFilters.vue";
import UFiltersButtonClear from "../../../../_shared/components/filters/FiltersButtonClear.vue";
import filtersMixin from "../../../../_shared/components/filters/filters-mixin";

import FiltersCriteria from "../../../../_shared/components/filters/filters-criteria";
import FiltersContext from "../../../../_shared/components/filters/filters-context";

export default {
  components: {
    UGeneFilters,
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