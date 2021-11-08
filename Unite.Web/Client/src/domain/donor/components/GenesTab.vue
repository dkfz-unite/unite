<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Genes</span>
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
              title="Donor Genes"
              :loading="loading"
              :rows="rows"
              :rows-total="rowsTotal"
              v-model:rows-selected="$store.state.donor.genesSelected"
              v-model:filters="$store.state.donor.genesFiltersCriteria.filters"
              @update:filters="loadData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UFilters from "./genes/Filters.vue";
import UDataTable from "./genes/GenesTable.vue";
import tablePageMixin from "../../_shared/table-page-mixin";

import api from "../api";

export default {
  components: {
    UFilters,
    UDataTable
  },

  mixins: [tablePageMixin],

  props: {
    donor: Object
  },

  data() {
    return {
      filtersCriteria: this.$store.state.donor.genesFiltersCriteria,
      filtersContext: this.$store.state.donor.genesFiltersContext,
    };
  },

  methods: {
    async fetchData() {
      return await api.searchGenes(this.donor.id, this.filtersCriteria.toSearchCriteria());
    },

    clearSelection() {
      this.$store.state.donor.genesSelected = [];
    }
  }
}
</script>