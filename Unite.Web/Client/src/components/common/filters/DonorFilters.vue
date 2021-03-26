<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-chips-filter
        label="PID"
        placeholder="e.g. ABC-123"
        v-model="criteria.id"
        @input="onInput"
      />
    </div>

    <div>
      <u-chips-filter
        label="Diagnosis"
        placeholder="e.g. Glioblastoma"
        v-model="criteria.diagnosis"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="Vital Status"
        :options="$store.state.filterOptions.vitalStatuses"
        v-model="criteria.vitalStatus"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="Gender"
        :options="$store.state.filterOptions.genders"
        v-model="criteria.gender"
        @input="onInput"
      />
    </div>

    <div>
      <q-expansion-item label="Age" :value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-select-filter
              label="Age Category"
              :options="$store.state.filterOptions.ageCategories"
              v-model="criteria.ageCategory"
              @input="onInput"
            />
          </div>

          <div>
            <u-number-filter
              label="From"
              placeholder="e.g. 50"
              v-model="criteria.age.from"
              @input="onInput"
            />
          </div>

          <div>
            <u-number-filter
              label="To"
              placeholder="e.g. 75"
              v-model="criteria.age.to"
              @input="onInput"
            />
          </div>
        </div>
      </q-expansion-item>
    </div>

    <div>
      <q-expansion-item label="Epigenetics" :value="true" dense dense-toggle>
        <div class="col q-pt-xs">
          <div class="row">
            <u-epigenetics-filters
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
import UEpigeneticsFilters from "./EpigeneticsFilters.vue";
import UChipsFilter from "./standard/ChipsFilter.vue";
import UNumberFilter from "./standard/NumberFilter.vue";
import USelectFilter from "./standard/SelectFilter.vue";

export default {
  props: ["value"],

  data() {
    return {
      criteria: this.value,
    };
  },

  methods: {
    onInput() {
      this.criteria.sanitise();

      this.$emit("input", this.criteria);
    },
  },

  components: {
    UEpigeneticsFilters: UEpigeneticsFilters,
    UChipsFilter: UChipsFilter,
    UNumberFilter: UNumberFilter,
    USelectFilter: USelectFilter,
  },
};
</script>