<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-select-filter
        label="Gene Expression Type"
        :options="$store.state.filterOptions.geneExpressionSubtypes"
        v-model="criteria.geneExpressionSubtype"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="IDH Status"
        :options="$store.state.filterOptions.idhStatuses"
        v-model="criteria.idhStatus"
        @input="onInput"
      />
    </div>

    <div v-if="showIdhMutationFilter">
      <u-select-filter
        label="IDH Mutation"
        :options="$store.state.filterOptions.idhMutations"
        v-model="criteria.idhMutation"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="Methylation Status"
        :options="$store.state.filterOptions.methylationStatuses"
        v-model="criteria.methylationStatus"
        @input="onInput"
      />
    </div>

    <div v-if="showMethylationTypeFilter">
      <u-select-filter
        label="Methylation Type"
        :options="$store.state.filterOptions.methylationTypes"
        v-model="criteria.methylationType"
        @input="onInput"
      />
    </div>

    <div>
      <u-boolean-filter
        label="G-CIMP Methylation"
        v-model="criteria.gCimpMethylation"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
import USelectFilter from "./standard/SelectFilter.vue";
import UBooleanFilter from "./standard/BooleanFilter.vue";

import IDHStatus from "@/services/criteria/filters/data/specimens/filter.option.idh-status.js";
import MethylationStatus from "@/services/criteria/filters/data/specimens/filter.option.methylation-status.js";

export default {
  props: ["value"],

  data() {
    return {
      criteria: this.value,
    };
  },

  computed: {
    showIdhMutationFilter() {
      return this.criteria.idhStatus?.length == 1
          && this.criteria.idhStatus[0] == IDHStatus.Mutant.value;
    },

    showMethylationTypeFilter() {
      return this.criteria.methylationStatus?.length == 1 
          && this.criteria.methylationStatus[0] == MethylationStatus.Methylated.value;
    }
  },

  watch: {
    'criteria.idhStatus'(value) {
      let isMutant = value?.length == 1 && value[0] == IDHStatus.Mutant.value;

      if (!isMutant) {
        this.criteria.idhMutation = [];
      }
    },

    'criteria.methylationStatus'(value) {
      let isMethylated = value?.length == 1 && value[0] == MethylationStatus.Methylated.value;

      if (!isMethylated) {
        this.criteria.methylationType = [];
      }
    }
  },

  methods: {
    onInput() {
      this.criteria?.sanitise();

      this.$emit("input", this.criteria);
    },
  },

  components: {
    USelectFilter: USelectFilter,
    UBooleanFilter: UBooleanFilter
  },
};
</script>