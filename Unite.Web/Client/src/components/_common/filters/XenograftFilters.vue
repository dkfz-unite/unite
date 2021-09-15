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
      <u-chips-filter
        label="Mouse Strain"
        placeholder="e.g. NSG"
        v-model="criteria.mouseStrain"
        @input="onInput"
      />
    </div>

    <div>
      <u-chips-filter
        label="Intervention"
        placeholder="e.g. Drug treatment"
        v-model="criteria.intervention"
        @input="onInput"
      />
    </div>

    <div>
      <q-expansion-item label="Survival Days" :value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-number-filter
              label="From"
              placeholder="e.g. 14"
              v-model="criteria.survivalDays.from"
              @input="onInput"
            />
          </div>

          <div>
            <u-number-filter
              label="To"
              placeholder="e.g. 28"
              v-model="criteria.survivalDays.to"
              @input="onInput"
            />
          </div>
        </div>
      </q-expansion-item>
    </div>

    <div>
      <u-boolean-filter
        label="Tumorigenicity"
        v-model="criteria.tumorigenicity"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="Tumor Growth Form"
        :options="$store.state.filterOptions.tumorGrowthForms"
        v-model="criteria.tumorGrowthForm"
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
import UNumberFilter from "./standard/NumberFilter.vue";
import UBooleanFilter from "./standard/BooleanFilter.vue";
import USelectFilter from "./standard/SelectFilter.vue";
import UMolecularDataFilters from "./MolecularDataFilters.vue";

export default {
  props: ["value"],

  data() {
    return {
      state: {},

      criteria: this.value,
    };
  },

  methods: {
    onInput() {
      this.criteria?.sanitise();

      this.$emit("input", this.criteria);
    },
  },

  components: {
    UChipsFilter: UChipsFilter,
    UNumberFilter: UNumberFilter,
    UBooleanFilter: UBooleanFilter,
    USelectFilter: USelectFilter,
    UMolecularDataFilters: UMolecularDataFilters,
  },
}
</script>