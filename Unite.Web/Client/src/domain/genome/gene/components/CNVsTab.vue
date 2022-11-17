<template>
    <div class="col q-gutter-y-sm">
      <div class="row">
        <div class="col">
          <div class="text-h5 u-text-title">Copy Number Variants (CNVs)</div>
        </div>
      </div>
  
      <div class="row">
        <div class="col">
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-3 col-md-2">
              <div class="row">
                <u-filters
                  v-model="filtersCriteria.copyNumberVariantFiltersCriteria"
                  :context="filtersContext.copyNumberVariantFiltersContext"
                  :filters="filters"
                  @update:modelValue="filterData"
                />
              </div>
            </div>
  
            <div class="col-12 col-sm-9 col-md-10">
              <u-data-table
                title="Gene Copy Number Variants (CNV)"
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
  import UDataTable from "@/domain/_shared/components/genome/variants/CNVsTable.vue";
  import tablePageMixin from "@/domain/_shared/table-page-mixin";
  import filters from "@/_shared/components/filters/domain/genome/variants/cnv/cnv-filters";
  
  import api from "../api";
  
  export default {
    components: {
      UFilters,
      UFiltersButtonClear,
      UDataTable
    },
  
    mixins: [tablePageMixin],
  
    props: {
      gene: Object
    },
  
    setup() {
      return {
        filters: filters
      }
    },
  
    computed: {
      domain() {
        return this.$store.state.gene;
      },
  
      criteriaPropertyName: () => "cnvsFiltersCriteria",
      contextPropertyName: () => "cnvsFiltersContext",
      selectionPropertyName: () => "cnvsSelected"
    },
  
    methods: {
      async fetchData(searchCriteria) {
        return await api.searchVariants(this.gene.id, "cnv", searchCriteria);
      }
    }
  }
  </script>