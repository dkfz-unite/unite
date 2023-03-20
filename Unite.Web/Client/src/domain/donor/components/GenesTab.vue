<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Genes</span>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-3 col-md-2 q-gutter-sm">
            <div class="row">
              <div class="col">
                <u-samples 
                  v-model="sample"
                  :options="samples"
                  @update:modelValue="filterData"
                />
              </div>
            </div>
            <div class="row">
              <u-filters
                v-model="filtersCriteria.geneFiltersCriteria"
                :context="filtersContext.geneFiltersContext"
                :filters="filters"
                @update:modelValue="filterData"
              />
            </div>
            <div class="row" v-if="filtersCriteria.geneFiltersCriteria.numberOfFilters">
              <u-filters-button-clear @click="filtersCriteria.geneFiltersCriteria.clear(); filterData();" />
            </div>
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-data-table
              title="Donor Genes"
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
import USamples from "@/domain/_shared/components/genome/Samples.vue";
import UDataTable from "@/domain/_shared/components/genome/genes/GenesTable.vue";
import tablePageMixin from "@/domain/_shared/table-page-mixin";
import samplePageMixin from "@/domain/_shared/sample-page-mixin";
import filters from "@/_shared/components/filters/domain/genome/genes/gene-filters";

import api from "../api";

export default {
  components: {
    UFilters,
    UFiltersButtonClear,
    USamples,
    UDataTable
  },

  mixins: [tablePageMixin, samplePageMixin],

  props: {
    donor: Object
  },

  setup(props) {
    return {
      filters: filters
    }
  },

  computed: {
    domain() {
      return this.$store.state.donor;
    },

    criteriaPropertyName: () => "genesFiltersCriteria",
    contextPropertyName: () => "genesFiltersContext",
    selectionPropertyName: () => "genesSelected"
  },

  methods: {
    async fetchData(searchCriteria) {
      if (!this.sample) return;
      return await api.searchGenes(this.donor.id, this.sample.id, searchCriteria);
    }
  }
}
</script>