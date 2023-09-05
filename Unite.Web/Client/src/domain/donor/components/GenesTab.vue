<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Genes</span>
    </div>

    <div class="row q-col-gutter-sm q-pt-sm">
      <div class="col-12 col-sm-3 col-md-2 q-gutter-y-sm">
        <div class="row">
          <div class="col">
            <u-samples
              v-model="sample"
              :options="samples"
              @update:modelValue="updateFilters"
            />
          </div>
        </div>
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
          title="Donor Genes"
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
import USamples from "@/domain/_shared/components/genome/Samples.vue";
import UDataTable from "@/domain/_shared/components/genome/genes/GenesTable.vue";
import tablePageMixin from "@/domain/_shared/table-page-mixin";
import samplePageMixin from "@/domain/_shared/sample-page-mixin";
import filters from "@/domain/genome/genes/filters/gene-filters";

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

  data() {
    return {
      domain: this.$store.state.donor.genes,
      model: "gene",
      filters: filters
    }
  },

  methods: {
    async fetchData(searchCriteria) {
      if (!this.sample) return;
      return await api.searchGenes(this.donor.id, this.sample.id, searchCriteria);
    }
  }
}
</script>