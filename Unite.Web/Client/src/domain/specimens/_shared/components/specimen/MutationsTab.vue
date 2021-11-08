<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Mutations</span>
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
              title="Mutations"
              :loading="loading"
              :rows="rows"
              :rows-total="rowsTotal"
              v-model:rows-selected="model.mutationsSelected"
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
import { useStore } from "vuex";
import UFilters from "./mutations/Filters.vue";
import UDataTable from "./mutations/MutationsTable.vue";
import tablePageMixin from "../../../../_shared/table-page-mixin";

import api from "../../api/specimen";

export default {
  components: {
    UFilters,
    UDataTable
  },

  mixins: [tablePageMixin],

  props: {
    specimen: Object
  },

  setup(props) {
    const store = useStore();

    const state = 
      props.specimen.tissue ? store.state.tissue :
      props.specimen.cellLine ? store.state.cell :
      props.specimen.organoid ? store.state.organoid :
      props.specimen.xenograft ? store.state.xenograft :
      null;

    return {
      model : state
    }
  },

  data() {
    return {
      filtersCriteria: this.model.mutationsFiltersCriteria,
      filtersContext: this.model.mutationsFiltersContext,
    };
  },

  methods: {
    async fetchData() {
      return await api.searchMutations(this.specimen.id, this.filtersCriteria.toSearchCriteria());
    },

    clearSelection() {
      this.model.mutationsSelected = [];
    }
  }
}
</script>