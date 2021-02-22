<template>
  <div class="col q-gutter-y-sm">
    <!-- <div>
      <u-chips-filter 
          label="ID"
          placeholder="e.g. 109"
          v-model="criteria.name"
          @input="onInput" 
      />
    </div> -->

    <div>
      <u-chips-filter
        label="Code"
        placeholder="e.g. chr1:g.10004778A>T"
        v-model="criteria.code"
        @input="onInput"
      />
    </div>

    <!-- <div>
      <u-select-filter
        label="Sequence Type"
        :options="$store.state.filterOptions.sequenceTypes"
        v-model="criteria.sequenceType"
        @input="onInput"
      />
    </div> -->

    <div>
      <u-select-filter
        label="Mutation Type"
        :options="$store.state.filterOptions.mutationTypes"
        v-model="criteria.mutationType"
        @input="onInput"
      />
    </div>

    <div>
      <q-expansion-item label="Location" :value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-select-filter
              label="Chromosome"
              :options="$store.state.filterOptions.chromosomes"
              v-model="criteria.chromosome"
              @input="onInput"
            />
          </div>

          <template v-if="criteria.chromosome && criteria.chromosome.length == 1">
            <div>
              <u-number-filter
                label="From"
                placeholder="e.g. 100100"
                v-model="criteria.position.from"
                @input="onInput"
              />
            </div>

            <div>
              <u-number-filter
                label="To"
                placeholder="e.g. 100900"
                v-model="criteria.position.to"
                @input="onInput"
              />
            </div>
          </template>
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import UChipsFilter from "./standard/ChipsFilter.vue";
import UNumberFilter from "./standard/NumberFilter.vue";
import USelectFilter from "./standard/SelectFilter.vue";

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
    USelectFilter: USelectFilter,
  },
};
</script>