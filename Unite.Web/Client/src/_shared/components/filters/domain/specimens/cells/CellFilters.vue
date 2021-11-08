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
      <u-chips-filter
        label="Name"
        placeholder="e.g. BG5"
        v-model="filtersCriteria.name"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="Species"
        :options="speciesOptions"
        v-model="filtersCriteria.species"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="Type"
        :options="cellLineTypeOptions"
        v-model="filtersCriteria.type"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="Culture Type"
        :options="cellLineCultureTypeOptions"
        v-model="filtersCriteria.cultureType"
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

import CellFiltersCriteria from "./cell-filters-criteria";
import CellFiltersContext from "./cell-filters-context";
import Species from "../../../../../../_models/domain/specimens/cells/enums/species";
import CellLineType from "../../../../../../_models/domain/specimens/cells/enums/cell-type";
import CellLineCultureType from "../../../../../../_models/domain/specimens/cells/enums/cell-culture-type";
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
      filtersCriteria: this.modelValue || new CellFiltersCriteria(),
      filtersContext: this.context || new CellFiltersContext()
    };
  },

  computed: {
    speciesOptions() {
      return mapOptions(this.filtersContext.speciesOptions, Species.values);
    },

    cellLineTypeOptions() {
      return mapOptions(this.filtersContext.cellLineTypeOptions, CellLineType.values);
    },

    cellLineCultureTypeOptions() {
      return mapOptions(this.filtersContext.cellLineCultureTypeOptions, CellLineCultureType.values);
    }
  },

  watch: {
    modelValue(value) {
      this.filtersCriteria = value || new CellFiltersCriteria();
    }
  }
}
</script>