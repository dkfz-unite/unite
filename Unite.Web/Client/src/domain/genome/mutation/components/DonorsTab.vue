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
                v-model="filtersCriteria"
                :context="filtersContext" 
                @update:modelValue="filterData"
              />
            </div>
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-data-table
              title="Affected Donors"
              :loading="loading"
              :rows="rows"
              :rows-total="rowsTotal"
              v-model:rows-selected="$store.state.mutation.donorsSelected"
              v-model:filters="$store.state.mutation.donorsFiltersCriteria.filters"
              @update:filters="loadData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UFilters from "./donors/Filters.vue";
import UDataTable from "./donors/DonorsTable.vue";
import tablePageMixin from "../../../_shared/table-page-mixin";

import api from "../api";

export default {
  components: {
    UFilters,
    UDataTable
  },

  mixins: [tablePageMixin],

  props: {
    mutation: Object
  },

  data() {
    return {
      filtersCriteria: this.$store.state.mutation.donorsFiltersCriteria,
      filtersContext: this.$store.state.mutation.donorsFiltersContext,
    };
  },

  methods: {
    async fetchData() {
      return await api.searchDonors(this.mutation.id, this.filtersCriteria.toSearchCriteria());
    },

    clearSelection() {
      this.$store.state.mutation.donorsSelected = [];
    }
  }
}
</script>