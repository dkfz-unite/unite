<template>
  <div class="col q-gutter-y-sm" v-if="variant">
    <div class="row">
      <span class="text-h5 u-text-title">Consequences</span>
    </div>

    <div class="row q-col-gutter-sm q-pt-sm">
      <div class="col-12 col-sm-3 col-md-2 q-gutter-y-sm">
        <div class="row">
          <u-filters
            :criteria="filtersCriteria"
            :context="filtersContext"
            :filters="filters"
            @update="filterData"
          />
        </div>
        <div class="row" v-if="filtersCriteria.numberOfFilters">
          <u-filters-button-clear @click="filtersCriteria.clear(); filterData();" />
        </div>
      </div>

      <div class="col-12 col-sm-9 col-md-10">
        <u-features-table
          title="Affected Transcripts"
          :features="features" 
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import UFilters from "@/_shared/components/filters/CriteriaFilters.vue";
import UFiltersButtonClear from "@/_shared/components/filters/FiltersButtonClear.vue";
import UFeaturesTable from "./effects/FeaturesTable.vue";
import FeatureFiltersCriteria from "./effects/feature-filters-criteria";
import FeatureFiltersContext from "./effects/feature-filters-context";
import filters from "./effects/feature-filters";
import filterService from "./effects/features-filter-service";

export default {
  props: {
    variant: {
      type: Object,
      default: () => null,
      required: true
    }
  },

  data() {
    return {
      features: this.variant?.affectedFeatures,
      filters: filters,
      filtersCriteria: new FeatureFiltersCriteria(),
      filtersContext: new FeatureFiltersContext()
    }
  },

  components: {
    UFilters,
    UFiltersButtonClear,
    UFeaturesTable
  },

  methods: {
    filterData(criteria) {
      this.features = filterService.filter(this.variant?.affectedFeatures, criteria);
    }
  }
}
</script>