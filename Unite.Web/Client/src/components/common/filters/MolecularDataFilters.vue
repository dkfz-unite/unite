<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-select-filter
        label="MGMT Status"
        :options="$store.state.filterOptions.mgmtStatuses"
        v-model="criteria.mgmtStatus"
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

    <div v-if="showGeneExpressionSubtypeFilter">
      <u-select-filter
        label="Gene Expression Subtype"
        :options="$store.state.filterOptions.geneExpressionSubtypes"
        v-model="criteria.geneExpressionSubtype"
        @input="onInput"
      />
    </div>

    <div v-if="showMethylationSubtypeFilter">
      <u-select-filter
        label="Methylation Subtype"
        :options="$store.state.filterOptions.methylationSubtypes"
        v-model="criteria.methylationSubtype"
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

import IdhStatus from "../../../services/criteria/filters/data/specimens/filter.option.idh-status.js";

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
          && this.criteria.idhStatus[0] == IdhStatus.Mutant.value;
    },

    showGeneExpressionSubtypeFilter() {
      return this.criteria.idhStatus?.length == 1
          && this.criteria.idhStatus[0] == IdhStatus.WildType.value;
    },

    showMethylationSubtypeFilter() {
      return this.criteria.idhStatus?.length == 1
          && this.criteria.idhStatus[0] == IdhStatus.WildType.value;
    }
  },

  watch: {
    'criteria.idhStatus'(value) {
      let isWildType = value?.length == 1 && value[0] == IdhStatus.WildType.value;
      let isMutant = value?.length == 1 && value[0] == IdhStatus.Mutant.value;

      if (!isWildType) {
        this.criteria.geneExpressionSubtype = [];
        this.criteria.methylationSubtype = [];
      }

      if (!isMutant) {
        this.criteria.idhMutation = [];
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