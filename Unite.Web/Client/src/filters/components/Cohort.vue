<template>
  <div class="col">
    <!-- Header -->
    <div class="row q-pa-sm">
      <div class="col">
        <!-- Title -->
        <div>
          <span class="text-h6">
            {{cohort.name}}
          </span>
        </div>

        <!-- Description -->
        <div v-if="cohort.description">
          <span class="text-subtitle1">
            {{cohort.description}}
          </span>
        </div>

        <!-- Date and rows number -->
        <div>
          <span class="text-caption q-gutter-x-lg">
            <span class="text-weight-bold">{{$helpers.content.toDateTimeString(cohort.date)}}</span>
            <span class="text-weight-bold" v-if="cohort.size != null">{{cohort.size }} rows of data</span>
          </span>
        </div>
      </div>
    </div>
    
    <!-- Filters -->
    <q-separator v-if="cohort.criteria" />
    <div class="row q-pa-sm" v-if="cohort.criteria">
      <div class="col q-gutter-y-sm">
        <!-- Donor filters -->
        <div class="row" v-if="hasGroupFilters(donorFilters, cohort.criteria.donorFiltersCriteria)">
          <u-filters-data
            title="Donor filters"
            :criteria="cohort.criteria.donorFiltersCriteria"
            :filters="donorFilters"
          />
        </div>

        <!-- Tissue filters -->
        <div class="row" v-if="hasGroupFilters(tissueFilters, cohort.criteria.tissueFiltersCriteria)">
          <u-filters-data
            title="Tissue filters"
            :criteria="cohort.criteria.tissueFiltersCriteria"
            :filters="tissueFilters"
          />
        </div>

        <!-- Cell filters -->
        <div class="row" v-if="hasGroupFilters(cellFilters, cohort.criteria.cellFiltersCriteria)">
          <u-filters-data
            title="Cell line filters"
            :criteria="cohort.criteria.cellFiltersCriteria"
            :filters="cellFilters"
          />
        </div>

        <!-- Organoid filters -->
        <div class="row" v-if="hasGroupFilters(organoidFilters, cohort.criteria.organoidFiltersCriteria)">
          <u-filters-data
            title="Organoid filters"
            :criteria="cohort.criteria.organoidFiltersCriteria"
            :filters="organoidFilters"
          />
        </div>

        <!-- Xenograft filters -->
        <div class="row" v-if="hasGroupFilters(xenograftFilters, cohort.criteria.xenograftFiltersCriteria)">
          <u-filters-data
            title="Xenograft filters"
            :criteria="cohort.criteria.xenograftFiltersCriteria"
            :filters="xenograftFilters"
          />
        </div>

        <!-- Gene filters -->
        <div class="row" v-if="hasGroupFilters(geneFilters, cohort.criteria.geneFiltersCriteria)">
          <u-filters-data
            title="Gene filters"
            :criteria="cohort.criteria.geneFiltersCriteria"
            :filters="geneFilters"
          />
        </div>

        <!-- Mutation filters -->
        <div class="row" v-if="hasGroupFilters(mutationFilters, cohort.criteria.mutationFiltersCriteria)">
          <u-filters-data
            title="Mutation filters"
            :criteria="cohort.criteria.mutationFiltersCriteria"
            :filters="mutationFilters"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UFiltersData from "./data/FiltersData.vue";

import FilterType from "../../_shared/components/filters/filter-type";
import donorFilters from "../../_shared/components/filters/domain/donors/donor-filters";
import tissueFilters from "../../_shared/components/filters/domain/specimens/tissues/tissue-filters";
import cellFilters from "../../_shared/components/filters/domain/specimens/cells/cell-filters";
import organoidFilters from "../../_shared/components/filters/domain/specimens/organoids/organoid-filters";
import xenograftFilters from "../../_shared/components/filters/domain/specimens/xenografts/xenograft-filters";
import geneFilters from "../../_shared/components/filters/domain/genome/genes/gene-filters";
import mutationFilters from "../../_shared/components/filters/domain/genome/mutations/mutation-filters";

export default {
  components: {
    UFiltersData
  },

  props: {
    cohort: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {
      donorFilters: donorFilters,
      tissueFilters: tissueFilters,
      cellFilters: cellFilters,
      organoidFilters: organoidFilters,
      xenograftFilters: xenograftFilters,
      geneFilters: geneFilters,
      mutationFilters: mutationFilters
    }
  },

  methods: {
    hasGroupFilters(filters, criteria) {
      if (criteria) {
        for (let i = 0; i < filters.length; i++) {
          const filter = filters[i];
          const value = criteria[filter.field];

          if (this.hasFilters(filter, value)) {
            return true;
          }
        }
      } else {
        return false;
      } 
    },

    hasFilters(filter, value) {
      const arrayFilters = [FilterType.Values, FilterType.Options];
      const rangeFilters = [FilterType.Range];

      if (arrayFilters.includes(filter.type)) {
        if (!!value?.length) {
          return true;
        }
      } else if (rangeFilters.includes(filter.type)) {
        if (value?.from != null || value?.to != null) {
           return true;
        }
      } else {
        if (value != null) {
          return true;
        }
      }
    }
  }
}
</script>