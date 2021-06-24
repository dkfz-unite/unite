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
        placeholder="e.g. Medium ???"
        v-model="criteria.medium"
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
    USelectFilter: USelectFilter,
    UMolecularDataFilters: UMolecularDataFilters,
  },
}
</script>