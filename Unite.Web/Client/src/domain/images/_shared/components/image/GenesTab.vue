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
              title="Genes"
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
import UFilters from "./genes/Filters.vue";
import UDataTable from "./genes/GenesTable.vue";
import tablePageMixin from "../../../../_shared/table-page-mixin";

import api from "../../api/image";

export default {
  components: {
    UFilters,
    UDataTable
  },

  mixins: [tablePageMixin],

  props: {
    image: Object
  },

  computed: {
    domain() {
      const state = 
        this.image.mriImage ? this.$store.state.mri :
        this.image.ctImage ? this.$store.state.ct :
        null;

      return state;
    },

    criteriaPropertyName: () => "genesFiltersCriteria",
    contextPropertyName: () => "genesFiltersContext",
    selectionPropertyName: () => "genesSelected"
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.searchGenes(this.image.id, searchCriteria);
    }
  }
}
</script>