<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Structural Variants (SV)</span>
    </div>

    <div class="row q-col-gutter-sm q-pt-sm">
      <div class="col-12 col-sm-3 col-md-2 q-gutter-y-sm">
        <div class="row">
          <div class="col">
            <u-samples
              v-if="showSamples"
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
          class="sticky-header-slim"
          :title="title"
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
import USamples from "@/domain/_shared/entry/components/filters/samples/Samples.vue";
import UDataTable from "@/domain/omics/variants/svs/components/Table.vue";
import tabSamplesMixin from "@/domain/_shared/entry/components/filters/samples/mixin";
import tabTableMixin from "@/domain/_shared/entry/components/tab-table-mixin";

import Settings from "@/domain/omics/variants/svs/settings";
import FilterModel from "@/_shared/components/filters/filter-models";
import VariantType from "@/domain/omics/variants/_shared/variants/models/enums/variant-type";
import filters from "@/domain/omics/variants/svs/models/filters/sv-filters";

import api from "@/domain/specimens/_shared/specimen/api";

export default {
  components: {
    UFilters,
    UFiltersButtonClear,
    USamples,
    UDataTable
  },

  mixins: [tabSamplesMixin, tabTableMixin],

  props: {
    area: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: Settings.title
    }
  },

  data() {
    return {
      domain: this.getDomain(this.area),
      model: FilterModel.Sv,
      filters: filters
    }
  },

  methods: {
    getDomain(name) {
      return this.$store.state[name][Settings.domain];
    },

    async fetchData(searchCriteria) {
      if (!this.sample) return;
      return await api.searchVariants(this.sample.id, VariantType.SV, searchCriteria);
    }
  }
}
</script>