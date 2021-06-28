<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-chips-filter
        label="Code"
        placeholder="e.g. chr1:g.10004778A>T"
        v-model="criteria.code"
        @input="onInput"
      />
    </div>

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

    <div>
      <q-expansion-item label="Consequences" :value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-select-filter
              label="Impact"
              :options="$store.state.filterOptions.impacts"
              v-model="criteria.impact"
              @input="onInput"
            />
          </div>

          <div>
            <u-select-filter
              label="Consequence"
              :options="$store.state.filterOptions.consequenceTypes"
              v-model="criteria.consequence"
              @input="onInput"
            />
          </div>
        </div>
      </q-expansion-item>
    </div>

    <div>
      <q-expansion-item label="Gene" :value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-chips-filter
              label="Gene"
              placeholder="e.g. TTN"
              v-model="criteria.gene"
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
import USelectFilter from "./standard/SelectFilter.vue";

export default {
  props: ["value"],

  data() {
    return {
      state: {},

      criteria: this.value,
    };
  },

  watch: {
    'criteria.chromosome'(value) {
      if(value?.length != 1) {
        this.criteria.position = { from: null, to: null };
      }
    }
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
}
</script>