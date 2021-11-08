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
        label="Mouse Strain"
        placeholder="e.g. NSG"
        v-model="filtersCriteria.mouseStrain"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-chips-filter
        label="Intervention"
        placeholder="e.g. Drug treatment"
        v-model="filtersCriteria.intervention"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <q-expansion-item label="Survival Days" :value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-number-filter
              label="From"
              placeholder="e.g. 14"
              v-model="filtersCriteria.survivalDays.from"
              @update:modelValue="onUpdate"
            />
          </div>

          <div>
            <u-number-filter
              label="To"
              placeholder="e.g. 28"
              v-model="filtersCriteria.survivalDays.to"
              @update:modelValue="onUpdate"
            />
          </div>
        </div>
      </q-expansion-item>
    </div>

    <div>
      <u-boolean-filter
        label="Tumorigenicity"
        v-model="filtersCriteria.tumorigenicity"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="Tumor Growth Form"
        v-model="filtersCriteria.tumorGrowthForm"
        :options="tumorGrowthFormOptions"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <q-expansion-item label="Molecular Data" :value="true" dense dense-toggle>
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
import UNumberFilter from "../../../base/NumberFilter.vue";
import UBooleanFilter from "../../../base/BooleanFilter.vue";
import USelectFilter from "../../../base/SelectFilter.vue";
import UMolecularDataFilters from "../MolecularDataFilters.vue";
import filtersMixin from "../../../filters-mixin";

import XenograftFiltersCriteria from "./xenograft-filters-criteria";
import XenograftFiltersContext from "./xenograft-filters-context";
import TumorGrowthForm from "../../../../../../_models/domain/specimens/xenografts/enums/tumor-growth-form";
import { mapOptions } from "../../../filter-options-helpers";

export default {
  components: {
    UChipsFilter,
    UNumberFilter,
    UBooleanFilter,
    USelectFilter,
    UMolecularDataFilters
  },

  mixins: [filtersMixin],

  data() {
    return {
      filtersCriteria: this.modelValue || new XenograftFiltersCriteria(),
      filtersContext: this.modelValue || new XenograftFiltersContext()
    };
  },

  computed: {
    tumorGrowthFormOptions() {
      return mapOptions(this.filtersContext.tumorGrowthFormOptions, TumorGrowthForm.values);
    }
  },

  watch: {
    modelValue(value) {
      this.filtersCriteria = value || new XenograftFiltersCriteria();
    }
  }
}
</script>