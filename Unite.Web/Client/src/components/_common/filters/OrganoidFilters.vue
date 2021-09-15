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
        label="Medium"
        placeholder="e.g. Wnt3a"
        v-model="criteria.medium"
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
      <u-boolean-filter
        label="Tumorigenicity"
        v-model="criteria.tumorigenicity"
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
import UBooleanFilter from "./standard/BooleanFilter.vue";
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
    UBooleanFilter: UBooleanFilter,
    UMolecularDataFilters: UMolecularDataFilters,
  },
}
</script>