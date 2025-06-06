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
import tabTableMixin from "@/domain/_shared/entry/components/tab-table-mixin";

import { Tabs } from "../../settings";
import VariantType from "../../../_shared/variants/models/enums/variant-type";
import MutationFiltersCriteria from "../../../sms/models/filters/sm-filters-criteria";
import FilterModel from "@/_shared/components/filters/filter-models";
import filters from "@/domain/donors/models/filters/donor-filters";
import api from "@/domain/omics/variants/_shared/variant/api";


export default {
  components: {
    UFilters,
    UFiltersButtonClear,
    UDataTable
  },

  mixins: [tabTableMixin],

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
      domain: this.$store.state.sm.donors,
      model: FilterModel.Donor,
      filters: filters
    }
  },

  methods: {
    async fetchData(searchCriteria) {
      if (!searchCriteria.sm)
        searchCriteria.sm = new MutationFiltersCriteria();

      searchCriteria.sm.id = [this.variant.id];

      return await api.searchDonors(this.variant.id, VariantType.SM, searchCriteria);
    }
  }
}
</script>