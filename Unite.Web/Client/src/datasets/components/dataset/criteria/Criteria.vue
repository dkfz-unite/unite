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
    <div class="row" v-if="hasGroupFilters(donorDataFilters, dataset.criteria.donor)">
      <u-criteria-group
        title="Donor data criteria"
        :criteria="dataset.criteria.donor"
        :filters="donorDataFilters"
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

    <!-- Image data criteria -->
    <div class="row" v-if="hasGroupFilters(imageDataFilters, dataset.criteria.image)">
      <u-criteria-group
        title="Image data criteria"
        :criteria="dataset.criteria.image"
        :filters="imageDataFilters"
      />
    </div>

    <!-- MRI criteria -->
    <div class="row" v-if="hasGroupFilters(mriFilters, dataset.criteria.mri)">
      <u-criteria-group
        title="MRI criteria"
        :criteria="dataset.criteria.mri"
        :filters="mriFilters"
      />
    </div>

    <!-- Specimen data criteria -->
    <div class="row" v-if="hasGroupFilters(specimenDataFilters, dataset.criteria.specimen)">
      <u-criteria-group
        title="Specimen data criteria"
        :criteria="dataset.criteria.specimen"
        :filters="specimenDataFilters"
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

    <!-- Cell Line criteria -->
    <div class="row" v-if="hasGroupFilters(lineFilters, dataset.criteria.line)">
      <u-criteria-group
        title="Cell line criteria"
        :criteria="dataset.criteria.line"
        :filters="lineFilters"
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

    <!-- SSM criteria -->
    <div class="row" v-if="hasGroupFilters(ssmFilters, dataset.criteria.ssm)">
      <u-criteria-group
        title="SSM criteria"
        :criteria="dataset.criteria.ssm"
        :filters="ssmFilters"
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
import donorDataFilters from "@/domain/donors/models/filters/donor-data-filters";
import donorFilters from "@/domain/donors/models/filters/donor-filters";
import imageDataFilters from "@/domain/images/_shared/images/models/filters/image-data-filters";
import mriFilters from "@/domain/images/mris/models/filters/mri-filters";
import specimenDataFilters from "@/domain/specimens/_shared/specimens/models/filters/specimen-data-filters";
import materialFilters from "@/domain/specimens/materials/models/filters/material-filters";
import lineFilters from "@/domain/specimens/lines/models/filters/line-filters";
import organoidFilters from "@/domain/specimens/organoids/models/filters/organoid-filters";
import xenograftFilters from "@/domain/specimens/xenografts/models/filters/xenograft-filters";
import geneFilters from "@/domain/genome/genes/models/filters/gene-filters";
import ssmFilters from "@/domain/genome/variants/ssms/models/filters/ssm-filters";
import cnvFilters from "@/domain/genome/variants/cnvs/models/filters/cnv-filters";
import svFilters from "@/domain/genome/variants/svs/models/filters/sv-filters";

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
      donorDataFilters: donorDataFilters,
      donorFilters: donorFilters,
      imageDataFilters: imageDataFilters,
      mriFilters: mriFilters,
      specimenDataFilters: specimenDataFilters,
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