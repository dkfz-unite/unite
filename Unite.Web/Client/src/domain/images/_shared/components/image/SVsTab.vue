<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Structural Variants (SV)</span>
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
                v-model="filtersCriteria.structuralVariantFiltersCriteria"
                :context="filtersContext.structuralVariantFiltersContext"
                :filters="filters"
                @update:modelValue="filterData"
              />
            </div>
            <div class="row" v-if="filtersCriteria.structuralVariantFiltersCriteria.numberOfFilters">
              <u-filters-button-clear @click="filtersCriteria.structuralVariantFiltersCriteria.clear(); filterData();" />
            </div>
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-data-table
              title="Image Structural Variants (SV)"
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
import UDataTable from "@/domain/_shared/components/genome/variants/SVsTable.vue";
import samplePageMixin from "@/domain/_shared/sample-page-mixin";
import tablePageMixin from "@/domain/_shared/table-page-mixin";
import filters from "@/_shared/components/filters/domain/genome/variants/sv/sv-filters";

import api from "../../api/image";

export default {
  components: {
    UFilters,
    UFiltersButtonClear,
    USamples,
    UDataTable
  },

  mixins: [samplePageMixin, tablePageMixin],

  props: {
    image: Object
  },

  setup() {
    return {
      filters: filters
    }
  },

  computed: {
    domain() {
      const state = 
        this.image.mriImage ? this.$store.state.mri.svs :
        this.image.ctImage ? this.$store.state.ct.svs :
        null;

      return state;
    }
  },

  methods: {
    async fetchData(searchCriteria) {
      if (!this.sample) return;
      return await api.searchVariants(this.image.id, this.sample.id, "sv", searchCriteria);
    }
  }
}
</script>