<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">{{ Tabs.donors.title }}</span>
    </div>

    <div class="row q-col-gutter-sm q-pt-sm">
      <div class="col-12 col-sm-3 col-md-2 q-gutter-y-sm">
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
          title="Affected donors"
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
import UDataTable from "@/domain/donors/components/Table.vue";
import tablePageMixin from "@/domain/_shared/table-page-mixin";

import { Tabs } from "../../settings";
import FilterModel from "@/_shared/components/filters/filter-models";
import filters from "@/domain/donors/filters/donor-filters";
import api from "@/domain/genome/variants/_shared/variant/api";

export default {
  components: {
    UFilters,
    UFiltersButtonClear,
    UDataTable
  },

  mixins: [tablePageMixin],

  props: {
    variant: Object
  },

  setup() {
    return {
      Tabs
    };
  },

  data() {
    return {
      domain: this.$store.state.ssm.donors,
      model: FilterModel.Donor,
      filters: filters
    }
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.searchDonors(this.variant.id, searchCriteria);
    }
  }
}
</script>