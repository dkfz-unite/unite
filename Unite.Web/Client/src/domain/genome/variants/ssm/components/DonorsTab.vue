<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col">
        <div class="text-h5 u-text-title">Donors</div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-3 col-md-2">
            <div class="row">
              <u-filters
                v-model="filtersCriteria.donorFiltersCriteria"
                :context="filtersContext.donorFiltersContext"
                :filters="filters"
                @update:modelValue="filterData"
              />
            </div>
            <div class="row" v-if="filtersCriteria.donorFiltersCriteria.numberOfFilters">
              <u-filters-button-clear @click="filtersCriteria.donorFiltersCriteria.clear(); filterData();" />
            </div>
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-data-table
              title="Affected Donors"
              :loading="loading"
              :rows="rows"
              :rows-total="rowsTotal"
              v-model:rows-selected="rowsSelected"
              v-model:filters="filtersCriteria.filters"
              @update:filters="loadData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UFilters from "@/_shared/components/filters/CriteriaFilters.vue";
import UFiltersButtonClear from "@/_shared/components/filters/FiltersButtonClear.vue";
import UDataTable from "./donors/DonorsTable.vue";
import tablePageMixin from "@/domain/_shared/table-page-mixin";
import filters from "@/_shared/components/filters/domain/donors/donor-filters";

import api from "../api";

export default {
  components: {
    UFiltersButtonClear,
    UFilters,
    UDataTable
  },

  mixins: [tablePageMixin],

  props: {
    variant: Object
  },

  setup() {
    return {
      filters: filters
    }
  },

  computed: {
    domain() {
      return this.$store.state.ssm;
    },

    criteriaPropertyName: () => "donorsFiltersCriteria",
    contextPropertyName: () => "donorsFiltersContext",
    selectionPropertyName: () => "donorsSelected"
  },

  methods: {
    async fetchData(searchCriteria) {
      console.log(this.variant.id);
      return await api.searchDonors(this.variant.id, searchCriteria);
    }
  }
}
</script>