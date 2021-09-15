<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-chips-filter
        label="Name"
        placeholder="e.g. TTN"
        v-model="criteria.symbol"
        @input="onInput"
      />
    </div>

    <div>
      <u-select-filter
        label="Biotype"
        :options="$store.state.filterOptions.biotypes"
        v-model="criteria.biotype"
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
};
</script>