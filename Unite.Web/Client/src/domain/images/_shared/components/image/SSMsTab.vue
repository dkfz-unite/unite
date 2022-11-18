<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Mutations (SSM)</span>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-3 col-md-2">
            <div class="row">
              <u-filters
                v-model="filtersCriteria.mutationFiltersCriteria"
                :context="filtersContext.mutationFiltersContext"
                :filters="filters"
                @update:modelValue="filterData"
              />
            </div>
            <div class="row" v-if="filtersCriteria.mutationFiltersCriteria.numberOfFilters">
              <u-filters-button-clear @click="filtersCriteria.mutationFiltersCriteria.clear(); filterData();" />
            </div>
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-data-table
              title="Image Mutations (SSM)"
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
import UDataTable from "@/domain/_shared/components/genome/variants/SSMsTable.vue";
import tablePageMixin from "@/domain/_shared/table-page-mixin";
import filters from "@/_shared/components/filters/domain/genome/variants/ssm/ssm-filters";

import api from "../../api/image";

export default {
  components: {
    UFilters,
    UFiltersButtonClear,
    UDataTable
  },

  mixins: [tablePageMixin],

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
        this.image.mriImage ? this.$store.state.mri :
        this.image.ctImage ? this.$store.state.ct :
        null;

      return state;
    },

    criteriaPropertyName: () => "ssmsFiltersCriteria",
    contextPropertyName: () => "ssmsFiltersContext",
    selectionPropertyName: () => "ssmsSelected"
  },

  methods: {
    async fetchData(searchCriteria) {
      return await api.searchVariants(this.image.id, "ssm", searchCriteria);
    }
  }
}
</script>