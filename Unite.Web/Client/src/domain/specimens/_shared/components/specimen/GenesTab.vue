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
                v-model="filtersCriteria.geneFiltersCriteria"
                :context="filtersContext.geneFiltersContext"
                :filters="geneFilters"
                @update:modelValue="filterData"
              />
            </div>
            <div class="row" v-if="filtersCriteria.geneFiltersCriteria.numberOfFilters">
              <u-filters-button-clear @click="filtersCriteria.geneFiltersCriteria.clear(); filterData();" />
            </div>
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-data-table
              title="Specimen Genes"
              class="sticky-header-slim"
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
import UDataTable from "@/domain/_shared/components/genome/genes/GenesTable.vue";
import tablePageMixin from "@/domain/_shared/table-page-mixin";
import geneFilters from "@/_shared/components/filters/domain/genome/genes/gene-filters";

import api from "../../api/specimen";

export default {
  components: {
    UFilters,
    UFiltersButtonClear,
    UDataTable
  },

  mixins: [tablePageMixin],

  props: {
    specimen: Object
  },

  setup() {
    return {
      geneFilters: geneFilters
    }
  },

  computed: {
    domain() {
      const state = 
        this.specimen.tissue ? this.$store.state.tissue :
        this.specimen.cellLine ? this.$store.state.cell :
        this.specimen.organoid ? this.$store.state.organoid :
        this.specimen.xenograft ? this.$store.state.xenograft :
        null;

      return state;
    },

    criteriaPropertyName: () => "genesFiltersCriteria",
    contextPropertyName: () => "genesFiltersContext",
    selectionPropertyName: () => "genesSelected"
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.searchGenes(this.specimen.id, searchCriteria);
    }
  }
}
</script>