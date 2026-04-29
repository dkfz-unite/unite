<template>
  <div class="col q-gutter-y-sm">
    <!-- Query -->
    <div v-if="dataset.criteria.filters?.query">
      <div class="col">
        <div>
          <span class="text-subtitle1 text-weight-medium">Query: </span>
          <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">
            {{ dataset.criteria.filters.query }}
          </q-badge>
        </div>
      </div>
    </div>

    <!-- Donor data criteria -->
    <div class="row" v-if="hasGroupFilters(dataFilters, dataset.criteria.donor)">
      <u-criteria-group
        title="Donor data criteria"
        :criteria="dataset.criteria.donor"
        :filters="dataFilters"
      />
    </div>

    <!-- Donor criteria -->
    <div class="row" v-if="hasGroupFilters(donorFilters, dataset.criteria.donor)">
      <u-criteria-group
        title="Donor criteria"
        :criteria="dataset.criteria.donor"
        :filters="donorFilters"
      />
    </div>

    <!-- MR data criteria -->
    <div class="row" v-if="hasGroupFilters(dataFilters, dataset.criteria.mr)">
      <u-criteria-group
        title="Image data criteria"
        :criteria="dataset.criteria.mr"
        :filters="dataFilters"
      />
    </div>

    <!-- MR criteria -->
    <div class="row" v-if="hasGroupFilters(mrFilters, dataset.criteria.mr)">
      <u-criteria-group
        title="MR criteria"
        :criteria="dataset.criteria.mr"
        :filters="mrFilters"
      />
    </div>

    <!-- Material data criteria -->
    <div class="row" v-if="hasGroupFilters(dataFilters, dataset.criteria.material)">
      <u-criteria-group
        title="Specimen data criteria"
        :criteria="dataset.criteria.material"
        :filters="dataFilters"
      />
    </div>

    <!-- Material criteria -->
    <div class="row" v-if="hasGroupFilters(materialFilters, dataset.criteria.material)">
      <u-criteria-group
        title="Material criteria"
        :criteria="dataset.criteria.material"
        :filters="materialFilters"
      />
    </div>

    <!-- Cell Line data criteria -->
    <div class="row" v-if="hasGroupFilters(dataFilters, dataset.criteria.line)">
      <u-criteria-group
        title="Cell line data criteria"
        :criteria="dataset.criteria.line"
        :filters="dataFilters"
      />
    </div>

    <!-- Cell Line criteria -->
    <div class="row" v-if="hasGroupFilters(lineFilters, dataset.criteria.line)">
      <u-criteria-group
        title="Cell line criteria"
        :criteria="dataset.criteria.line"
        :filters="lineFilters"
      />
    </div>

    <!-- Organoid data criteria -->
    <div class="row" v-if="hasGroupFilters(dataFilters, dataset.criteria.organoid)">
      <u-criteria-group
        title="Organoid data criteria"
        :criteria="dataset.criteria.organoid"
        :filters="dataFilters"
      />
    </div>

    <!-- Organoid criteria -->
    <div class="row" v-if="hasGroupFilters(organoidFilters, dataset.criteria.organoid)">
      <u-criteria-group
        title="Organoid criteria"
        :criteria="dataset.criteria.organoid"
        :filters="organoidFilters"
      />
    </div>

    <!-- Xenograft data criteria -->
    <div class="row" v-if="hasGroupFilters(dataFilters, dataset.criteria.xenograft)">
      <u-criteria-group
        title="Xenograft data criteria"
        :criteria="dataset.criteria.xenograft"
        :filters="dataFilters"
      />
    </div>

    <!-- Xenograft criteria -->
    <div class="row" v-if="hasGroupFilters(xenograftFilters, dataset.criteria.xenograft)">
      <u-criteria-group
        title="Xenograft criteria"
        :criteria="dataset.criteria.xenograft"
        :filters="xenograftFilters"
      />
    </div>

    <!-- Gene criteria -->
    <div class="row" v-if="hasGroupFilters(geneFilters, dataset.criteria.gene)">
      <u-criteria-group
        title="Gene criteria"
        :criteria="dataset.criteria.gene"
        :filters="geneFilters"
      />
    </div>

    <!-- Protein criteria -->
    <div class="row" v-if="hasGroupFilters(proteinFilters, dataset.criteria.protein)">
      <u-criteria-group
        title="Protein criteria"
        :criteria="dataset.criteria.protein"
        :filters="proteinFilters"
      />
    </div>

    <!-- SM criteria -->
    <div class="row" v-if="hasGroupFilters(smFilters, dataset.criteria.sm)">
      <u-criteria-group
        title="SM criteria"
        :criteria="dataset.criteria.sm"
        :filters="smFilters"
      />
    </div>

    <!-- CNV criteria -->
    <div class="row" v-if="hasGroupFilters(cnvFilters, dataset.criteria.cnv)">
      <u-criteria-group
        title="CNV criteria"
        :criteria="dataset.criteria.cnv"
        :filters="cnvFilters"
      />
    </div>

    <!-- CNV profile criteria -->
    <div class="row" v-if="hasGroupFilters(cnvprofileFilters, dataset.criteria.cnvProfile)">
      <u-criteria-group
        title="CNV profile criteria"
        :criteria="dataset.criteria.cnvProfile"
        :filters="cnvprofileFilters"
      />
    </div>

    <!-- SV criteria -->
    <div class="row" v-if="hasGroupFilters(svFilters, dataset.criteria.sv)">
      <u-criteria-group
        title="SV criteria"
        :criteria="dataset.criteria.sv"
        :filters="svFilters"
      />
    </div>
  </div>
</template>

<script>
import UCriteriaGroup from "./CriteriaGroup.vue";

import FilterType from "@/_shared/components/filters/filter-type";
import dataFilters from "@/domain/_shared/entries/models/filters/data-filters";
import donorFilters from "@/domain/donors/models/filters/donor-filters";
import mrFilters from "@/domain/images/mrs/models/filters/mr-filters";
import materialFilters from "@/domain/specimens/materials/models/filters/material-filters";
import lineFilters from "@/domain/specimens/lines/models/filters/line-filters";
import organoidFilters from "@/domain/specimens/organoids/models/filters/organoid-filters";
import xenograftFilters from "@/domain/specimens/xenografts/models/filters/xenograft-filters";
import geneFilters from "@/domain/omics/genes/models/filters/gene-filters";
import proteinFilters from "@/domain/omics/proteins/models/filters/protein-filters";
import smFilters from "@/domain/omics/variants/sms/models/filters/sm-filters";
import cnvFilters from "@/domain/omics/variants/cnvs/models/filters/cnv-filters";
import cnvprofileFilters from "@/domain/omics/variants/cnvProfiles/models/filters/cnv-profile-filters";
import svFilters from "@/domain/omics/variants/svs/models/filters/sv-filters";

export default {
  components: {
    UCriteriaGroup
  },

  props: {
    dataset: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {
      dataFilters: dataFilters,
      donorFilters: donorFilters,
      mrFilters: mrFilters,
      materialFilters: materialFilters,
      lineFilters: lineFilters,
      organoidFilters: organoidFilters,
      xenograftFilters: xenograftFilters,
      geneFilters: geneFilters,
      proteinFilters: proteinFilters,
      smFilters: smFilters,
      cnvFilters: cnvFilters,
      cnvprofileFilters: cnvprofileFilters,
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

          if (this.hasCriteriaFilters(filter, value)) {
            return true;
          }
        }
      } else {
        return false;
      } 
    },

    hasCriteriaFilters(filter, value) {
      const arrayFilters = [FilterType.Values, FilterType.Options];
      const rangeFilters = [FilterType.Range];

      if (arrayFilters.includes(filter.type)) {
        if (!!value?.value?.length) {
          return true;
        }
      } else if (rangeFilters.includes(filter.type)) {
        if (value?.value?.from != null || value?.value?.to != null) {
           return true;
        }
      } else {
        if (value?.value != null) {
          return true;
        }
      }
    }
  }
}
</script>