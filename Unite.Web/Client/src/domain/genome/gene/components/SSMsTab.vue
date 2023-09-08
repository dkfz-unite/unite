<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Mutations (SSM)</span>
    </div>

    <div class="row q-col-gutter-sm q-pt-sm">
      <div class="col-12 col-sm-3 col-md-2 q-gutter-y-xs">
        <div class="row">
          <u-filters
            :criteria="filtersCriteria[model]"
            :context="filtersContext[model]"
            :filters="filters"
            @update="updateFilters"
          />
        </div>
        <div class="row" v-if="filtersCriteria[model].numberOfFilters">
          <u-filters-button-clear @click="filtersCriteria[model].clear(); updateFilters();" />
        </div>
      </div>

      <div class="col-12 col-sm-9 col-md-10">
        <u-data-table
          title="Gene Mutations"
          class="sticky-header-slim"
          :loading="loading"
          :rows="rows"
          :rows-total="rowsTotal"
          v-model:rows-selected="rowsSelected"
          v-model:from="filtersCriteria.from"
          v-model:size="filtersCriteria.size"
          @update:from="updateFrom"
          @update:size="updateSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UFilters from "@/_shared/components/filters/CriteriaFilters.vue";
import UFiltersButtonClear from "@/_shared/components/filters/FiltersButtonClear.vue";
import UDataTable from "@/domain/_shared/components/genome/variants/SSMsTable.vue";
import tablePageMixin from "@/domain/_shared/table-page-mixin";
import filters from "@/domain/genome/variants/ssms/filters/ssm-filters";

import api from "../api";

export default {
  components: {
    UFilters,
    UFiltersButtonClear,
    UDataTable
  },

  mixins: [tablePageMixin],

  props: {
    gene: Object
  },

  data() {
    return {
      domain: this.$store.state.gene.ssms,
      model: "ssm",
      filters: filters
    }
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.searchVariants(this.gene.id, "ssm", searchCriteria);
    }
  }
};
</script>