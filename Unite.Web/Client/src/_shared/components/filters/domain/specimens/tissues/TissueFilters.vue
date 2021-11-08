<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-chips-filter
        label="External ID"
        placeholder="e.g. ABC-123"
        v-model="filtersCriteria.referenceId"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="Type"
        :options="tissueTypeOptions"
        v-model="filtersCriteria.type"
        @update:modelValue="onUpdate"
      />
    </div>

    <div v-if="showTumorTypeFilter">
      <u-select-filter
        label="Tumor Type"
        :options="tumorTypeOptions"
        v-model="filtersCriteria.tumorType"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-chips-filter
        label="Source"
        placeholder="e.g. Solid tissue"
        v-model="filtersCriteria.source"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <q-expansion-item label="Molecular Data" :model-value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div class="row">
            <u-molecular-data-filters 
              v-model="filtersCriteria"
              :context="filtersContext"
              @update:modelValue="onUpdate"
            />
          </div>
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import UChipsFilter from "../../../base/ChipsFilter.vue";
import USelectFilter from "../../../base/SelectFilter.vue";
import UMolecularDataFilters from "../MolecularDataFilters.vue";
import filtersMixin from "../../../filters-mixin";

import TissueFiltersCriteria from "./tissue-filters-criteria";
import TissueFiltersContext from "./tissue-filters-context";
import TissueType from "../../../../../../_models/domain/specimens/tissues/enums/tissue-type";
import TumorType from "../../../../../../_models/domain/specimens/tissues/enums/tumor-type";
import { mapOptions } from "../../../filter-options-helpers";

export default {
  components: {
    UChipsFilter,
    USelectFilter,
    UMolecularDataFilters
  },

  mixins: [filtersMixin],

  data() {
    return {
      filtersCriteria: this.modelValue || new TissueFiltersCriteria(),
      filtersContext: this.context || new TissueFiltersContext()
    };
  },

  computed: {
    tissueType() {
      return this.filtersCriteria.type;
    },

    showTumorTypeFilter() {
      return this.tissueType?.length == 1
          && this.tissueType[0] == TissueType.Tumor;
    },

    tissueTypeOptions() {
      return mapOptions(this.filtersContext.tissueTypeOptions, TissueType.values);
    },

    tumorTypeOptions() {
      return mapOptions(this.filtersContext.tumorTypeOptions, TumorType.values);
    }
  },

  watch: {
    tissueType(value) {
      let isTumor = value?.length == 1 && value[0] == TissueType.Tumor;

      if (!isTumor) {
        this.filtersCriteria.tumorType = [];
      }
    },

    modelValue(value) {
      this.filtersCriteria = value || new TissueFiltersCriteria();
    }
  }
}
</script>