<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-chips-filter
        label="ID"
        placeholder="e.g. 123"
        v-model="filtersCriteria.id"
        @update:modelValue="onUpdate"
      />
    </div>

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
        label="Diagnosis"
        placeholder="e.g. Glioblastoma"
        v-model="filtersCriteria.diagnosis"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-chips-filter
        label="Therapy"
        placeholder="e.g. Temodal therapy"
        v-model="filtersCriteria.therapy"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-single-filter
        label="Vital Status"
        :options="vitalSatusOptions"
        v-model="filtersCriteria.vitalStatus"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="Sex"
        :options="genderOptions"
        v-model="filtersCriteria.gender"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <q-expansion-item label="Age" :model-value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-number-filter
              label="From"
              placeholder="e.g. 50"
              v-model="filtersCriteria.age.from"
              @update:modelValue="onUpdate"
            />
          </div>

          <div>
            <u-number-filter
              label="To"
              placeholder="e.g. 75"
              v-model="filtersCriteria.age.to"
              @update:modelValue="onUpdate"
            />
          </div>
        </div>
      </q-expansion-item>
    </div>

    <div>
      <u-boolean-filter
        label="MTA Protected"
        v-model="filtersCriteria.mtaProtected"
        @update:modelValue="onUpdate"
      />
    </div>

    <div v-if="filtersCriteria.mtaProtected">
      <u-chips-filter
        label="Work Package"
        placeholder="e.g. N2M2"
        v-model="filtersCriteria.workPackage"
        @update:modelValue="onUpdate"
      />
    </div>
  </div>
</template>

<script>
import UChipsFilter from "../../base/ChipsFilter.vue";
import UNumberFilter from "../../base/NumberFilter.vue";
import USelectFilter from "../../base/SelectFilter.vue";
import USelectSingleFilter from "../../base/SelectSingleFilter.vue";
import UBooleanFilter from "../../base/BooleanFilter.vue";
import filtersMixin from "../../filters-mixin";

import DonorFiltersCriteria from "./donor-filters-criteria";
import DonorFiltersContext from "./donor-filters-context";
import VitalStatus from "../../../../../_models/domain/donors/enums/vital-status";
import Gender from "../../../../../_models/domain/donors/enums/gender";
import { mapOptions } from "../../filter-options-helpers";

export default {
  components: {
    UChipsFilter,
    UNumberFilter,
    USelectFilter,
    USelectSingleFilter,
    UBooleanFilter
  },

  mixins: [filtersMixin],

  data() {
    return {
      filtersCriteria: this.modelValue || new DonorFiltersCriteria(),
      filtersContext: this.context || new DonorFiltersContext()
    };
  },

  computed: {
    vitalSatusOptions() {
      return mapOptions(this.filtersContext.vitalSatusOptions, VitalStatus.values);
    },

    genderOptions() {
      return mapOptions(this.filtersContext.genderOptions, Gender.values);
    }
  },

  watch: {
    modelValue(value) {
      this.filtersCriteria = value || new DonorFiltersCriteria();
    }
  }
}
</script>