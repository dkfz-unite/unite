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
            <span class="text-weight-bold" v-if="cohort.data != null">{{cohort.data.total }} rows of data</span>
          </span>
        </div>
      </div>
    </div>
    
    <q-separator v-if="cohort.data" />

    <!-- Sub Header -->
    <div v-if="cohort.data" class="row q-pa-sm">
      <div class="col">
        <div class="row">
          <span class="text-subtitle1 text-weight-medium">Available data</span>
        </div>
        <u-cohort-data :data="cohort.data" />
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

        <!-- Material filters -->
        <div class="row" v-if="hasGroupFilters(materialFilters, cohort.criteria.material)">
          <u-filters-data
            title="Material filters"
            :criteria="cohort.criteria.material"
            :filters="materialFilters"
          />
        </div>

        <!-- Cell Line filters -->
        <div class="row" v-if="hasGroupFilters(lineFilters, cohort.criteria.line)">
          <u-filters-data
            title="Cell line filters"
            :criteria="cohort.criteria.line"
            :filters="lineFilters"
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
import UCohortData from "./data/CohortData.vue";
import UFiltersData from "./filters/FiltersData.vue";
import FilterType from "@/_shared/components/filters/filter-type";
import donorFilters from "@/domain/donors/filters/donor-filters";
import mriFilters from "@/domain/images/mris/filters/mri-filters";
import materialFilters from "@/domain/specimens/tissues/filters/tissue-filters";
import lineFilters from "@/domain/specimens/cells/filters/cell-filters";
import organoidFilters from "@/domain/specimens/organoids/filters/organoid-filters";
import xenograftFilters from "@/domain/specimens/xenografts/filters/xenograft-filters";
import geneFilters from "@/domain/genome/genes/filters/gene-filters";
import ssmFilters from "@/domain/genome/variants/ssms/filters/ssm-filters";
import cnvFilters from "@/domain/genome/variants/cnvs/filters/cnv-filters";
import svFilters from "@/domain/genome/variants/svs/filters/sv-filters";

export default {
  components: {
    UCohortData,
    UFiltersData
  },

  props: {
    cohort: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      default: () => null
    }
  },

  setup() {
    return {
      donorFilters: donorFilters,
      mriFilters: mriFilters,
      materialFilters: materialFilters,
      lineFilters: lineFilters,
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