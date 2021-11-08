<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-select-filter
        label="MGMT Status"
        :options="mgmtStatusOptions"
        v-model="filtersCriteria.mgmtStatus"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="IDH Status"
        :options="idhStatusOptions"
        v-model="filtersCriteria.idhStatus"
        @update:modelValue="onUpdate"
      />
    </div>

    <div v-if="showIdhMutationFilter">
      <u-select-filter
        label="IDH Mutation"
        :options="idhMutationOptions"
        v-model="filtersCriteria.idhMutation"
        @update:modelValue="onUpdate"
      />
    </div>

    <div v-if="showGeneExpressionSubtypeFilter">
      <u-select-filter
        label="Gene Expression Subtype"
        :options="geneExpressionSubtypeOptions"
        v-model="filtersCriteria.geneExpressionSubtype"
        @update:modelValue="onUpdate"
      />
    </div>

    <div v-if="showMethylationSubtypeFilter">
      <u-select-filter
        label="Methylation Subtype"
        :options="methylationSubtypeOptions"
        v-model="filtersCriteria.methylationSubtype"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-boolean-filter
        label="G-CIMP Methylation"
        v-model="filtersCriteria.gCimpMethylation"
        @update:modelValue="onUpdate"
      />
    </div>
  </div>
</template>

<script>
import USelectFilter from "../../base/SelectFilter.vue";
import UBooleanFilter from "../../base/BooleanFilter.vue";
import filtersMixin from "../../filters-mixin";

import SpecimenFiltersCriteria from "./specimen-filters-criteria";
import SpecimenFiltersContext from "./specimen-filters-context";
import IdhStatus from "../../../../../_models/domain/specimens/enums/idh-status";
import IdhMutation from "../../../../../_models/domain/specimens/enums/idh_mutation";
import MgmtStatus from "../../../../../_models/domain/specimens/enums/mgmt-status";
import MethylationSubtype from "../../../../../_models/domain/specimens/enums/methylation-subtype";
import GeneExpressionSubtype from "../../../../../_models/domain/specimens/enums/gene-expression-subtype";
import { mapOptions } from "../../filter-options-helpers";

export default {
  components: {
    USelectFilter,
    UBooleanFilter
  },

  mixins: [filtersMixin],

  data() {
    return {
      filtersCriteria: this.modelValue || new SpecimenFiltersCriteria(),
      filtersContext: this.context || new SpecimenFiltersContext()
    };
  },

  computed: {
    idhStatus() {
      return this.filtersCriteria.idhStatus;
    },

    showIdhMutationFilter() {
      return this.idhStatus?.length == 1
          && this.idhStatus[0] == IdhStatus.Mutant;
    },

    showGeneExpressionSubtypeFilter() {
      return this.idhStatus?.length == 1
          && this.idhStatus[0] == IdhStatus.WildType;
    },

    showMethylationSubtypeFilter() {
      return this.idhStatus?.length == 1
          && this.idhStatus[0] == IdhStatus.WildType;
    },

    mgmtStatusOptions() {
      return mapOptions(this.filtersContext.mgmtStatusOptions, MgmtStatus.values);
    },

    idhStatusOptions() {
      return mapOptions(this.filtersContext.idhStatusOptions, IdhStatus.values);
    },

    idhMutationOptions() {
      return mapOptions(this.filtersContext.idhMutationOptions, IdhMutation.values);
    },

    geneExpressionSubtypeOptions() {
      return mapOptions(this.filtersContext.geneExpressionSubtypeOptions, GeneExpressionSubtype.values);
    },

    methylationSubtypeOptions() {
      return mapOptions(this.filtersContext.methylationSubtypeOptions, MethylationSubtype.values);
    }
  },

  watch: {
    idhStatus(value) {
      let isWildType = value?.length == 1 && value[0] == IdhStatus.WildType;
      let isMutant = value?.length == 1 && value[0] == IdhStatus.Mutant;

      if (!isWildType) {
        this.filtersCriteria.geneExpressionSubtype = [];
        this.filtersCriteria.methylationSubtype = [];
      }

      if (!isMutant) {
        this.filtersCriteria.idhMutation = [];
      }
    },

    modelValue(value) {
      this.filtersCriteria = value || new SpecimenFiltersCriteria();
    }
  }
}
</script>