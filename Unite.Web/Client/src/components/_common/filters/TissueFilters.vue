<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-chips-filter
        label="External ID"
        placeholder="e.g. ABC-123"
        v-model="criteria.referenceId"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="Type"
        :options="$store.state.filterOptions.tissueTypes"
        v-model="criteria.type"
        @input="onInput"
      />
    </div>

    <div v-if="showTumorTypeFilter">
      <u-select-filter
        label="Tumor Type"
        :options="$store.state.filterOptions.tumorTypes"
        v-model="criteria.tumorType"
        @input="onInput"
      />
    </div>

    <div>
      <u-chips-filter
        label="Source"
        placeholder="e.g. Solid tissue"
        v-model="criteria.source"
        @input="onInput"
      />
    </div>

    <div>
      <q-expansion-item label="Molecular Data" :value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div class="row">
            <u-molecular-data-filters 
              v-model="criteria" 
              @input="onInput" 
            />
          </div>
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import UChipsFilter from "./standard/ChipsFilter.vue";
import USelectFilter from "./standard/SelectFilter.vue";
import UMolecularDataFilters from "./MolecularDataFilters.vue";

import TissueType from "@/services/criteria/filters/data/specimens/tissues/filter.option.tissue-type.js";

export default {
  props: ["value"],

  data() {
    return {
      state: {},

      criteria: this.value,
    };
  },

  computed: {
    showTumorTypeFilter() {
      return this.criteria.type?.length == 1
          && this.criteria.type[0] == TissueType.Tumor.value;
    },
  },

  watch: {
    'criteria.type'(value) {
      let isTumor = value?.length == 1 && value[0] == TissueType.Tumor.value;

      if (!isTumor) {
        this.criteria.tumorType = [];
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
    UChipsFilter: UChipsFilter,
    USelectFilter: USelectFilter,
    UMolecularDataFilters: UMolecularDataFilters,
  },
}
</script>