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
    
    
    <q-separator v-if="cohort.criteria" />

    <!-- Filters -->
    <div class="row q-pa-sm" v-if="cohort.criteria">
      <div class="col q-gutter-y-sm">
        <!-- Query -->
        <div v-if="cohort.criteria.filters?.query">
          <div class="col">
            <div>
              <span class="text-subtitle1 text-weight-medium">Query: </span>
              <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">
                {{cohort.criteria.filters.query}}
              </q-badge>
            </div>
          </div>
        </div>

        <!-- Donor filters -->
        <div class="row" v-if="hasGroupFilters(donorFilters, cohort.criteria.donor)">
          <u-filters-data
            title="Donor filters"
            :criteria="cohort.criteria.donor"
            :filters="donorFilters"
          />
        </div>

        <!-- MRI filters -->
        <div class="row" v-if="hasGroupFilters(mriFilters, cohort.criteria.mri)">
          <u-filters-data
            title="MRI filters"
            :criteria="cohort.criteria.mri"
            :filters="mriFilters"
          />
        </div>

        <!-- Tissue filters -->
        <div class="row" v-if="hasGroupFilters(tissueFilters, cohort.criteria.tissue)">
          <u-filters-data
            title="Tissue filters"
            :criteria="cohort.criteria.tissue"
            :filters="tissueFilters"
          />
        </div>

        <!-- Cell filters -->
        <div class="row" v-if="hasGroupFilters(cellFilters, cohort.criteria.cell)">
          <u-filters-data
            title="Cell line filters"
            :criteria="cohort.criteria.cell"
            :filters="cellFilters"
          />
        </div>

        <!-- Organoid filters -->
        <div class="row" v-if="hasGroupFilters(organoidFilters, cohort.criteria.organoid)">
          <u-filters-data
            title="Organoid filters"
            :criteria="cohort.criteria.organoid"
            :filters="organoidFilters"
          />
        </div>

        <!-- Xenograft filters -->
        <div class="row" v-if="hasGroupFilters(xenograftFilters, cohort.criteria.xenograft)">
          <u-filters-data
            title="Xenograft filters"
            :criteria="cohort.criteria.xenograft"
            :filters="xenograftFilters"
          />
        </div>

        <!-- Gene filters -->
        <div class="row" v-if="hasGroupFilters(geneFilters, cohort.criteria.gene)">
          <u-filters-data
            title="Gene filters"
            :criteria="cohort.criteria.gene"
            :filters="geneFilters"
          />
        </div>

        <!-- SSM filters -->
        <div class="row" v-if="hasGroupFilters(ssmFilters, cohort.criteria.ssm)">
          <u-filters-data
            title="SSM filters"
            :criteria="cohort.criteria.ssm"
            :filters="ssmFilters"
          />
        </div>

        <!-- CNV filters -->
        <div class="row" v-if="hasGroupFilters(cnvFilters, cohort.criteria.cnv)">
          <u-filters-data
            title="CNV filters"
            :criteria="cohort.criteria.cnv"
            :filters="cnvFilters"
          />
        </div>

        <!-- SV filters -->
        <div class="row" v-if="hasGroupFilters(svFilters, cohort.criteria.sv)">
          <u-filters-data
            title="SV filters"
            :criteria="cohort.criteria.sv"
            :filters="svFilters"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UFiltersData from "./data/FiltersData.vue";

import FilterType from "@/_shared/components/filters/filter-type";
import donorFilters from "@/_shared/components/filters/domain/donors/donor-filters";
import mriFilters from "@/_shared/components/filters/domain/images/mris/mri-filters";
import tissueFilters from "@/_shared/components/filters/domain/specimens/tissues/tissue-filters";
import cellFilters from "@/_shared/components/filters/domain/specimens/cells/cell-filters";
import organoidFilters from "@/_shared/components/filters/domain/specimens/organoids/organoid-filters";
import xenograftFilters from "@/_shared/components/filters/domain/specimens/xenografts/xenograft-filters";
import geneFilters from "@/_shared/components/filters/domain/genome/genes/gene-filters";
import ssmFilters from "@/_shared/components/filters/domain/genome/variants/ssm/ssm-filters";
import cnvFilters from "@/_shared/components/filters/domain/genome/variants/cnv/cnv-filters";
import svFilters from "@/_shared/components/filters/domain/genome/variants/sv/sv-filters";

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
      mriFilters: mriFilters,
      tissueFilters: tissueFilters,
      cellFilters: cellFilters,
      organoidFilters: organoidFilters,
      xenograftFilters: xenograftFilters,
      geneFilters: geneFilters,
      ssmFilters: ssmFilters,
      cnvFilters: cnvFilters,
      svFilters: svFilters
    }
  },

  methods: {
    hasGroupFilters(filters, criteria) {
      let filterItems = filters.flatMap(item => item.group ? [...item.filters] : [item]);

      if (criteria) {
        for (let i = 0; i < filterItems.length; i++) {
          const filter = filterItems[i];
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