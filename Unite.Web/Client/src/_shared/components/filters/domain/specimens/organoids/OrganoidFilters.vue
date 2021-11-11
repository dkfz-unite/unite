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
        label="Medium"
        placeholder="e.g. Wnt3a"
        v-model="filtersCriteria.medium"
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
      <u-boolean-filter
        label="Tumorigenicity"
        v-model="filtersCriteria.tumorigenicity"
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
import UBooleanFilter from "../../../base/BooleanFilter.vue";
import UMolecularDataFilters from "../MolecularDataFilters.vue";
import filtersMixin from "../../../filters-mixin";

import OrganoidFiltersCriteria from "./organoid-filters-criteria";
import OrganoidFiltersContext from "./organoid-filters-context";

export default {
  components: {
    UChipsFilter,
    UBooleanFilter,
    UMolecularDataFilters
  },

  mixins: [filtersMixin],

  data() {
    return {
      filtersCriteria: this.modelValue || new OrganoidFiltersCriteria(),
      filtersContext: this.context || new OrganoidFiltersContext()
    };
  },

  watch: {
    modelValue(value) {
      this.filtersCriteria = value || new OrganoidFiltersCriteria();
    }
  }
}
</script>