<template>
  <div class="col q-gutter-y-sm">
    <div>
      <u-chips-filter
        label="Code"
        placeholder="e.g. chr1:g.10004778A>T"
        v-model="filtersCriteria.code"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="Mutation Type"
        :options="mutationTypeOptions"
        v-model="filtersCriteria.mutationType"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <q-expansion-item label="Location" :model-value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-select-filter
              label="Chromosome"
              :options="chromosomeOptions"
              v-model="filtersCriteria.chromosome"
              @update:modelValue="onUpdate"
            />
          </div>

          <template v-if="filtersCriteria.chromosome && filtersCriteria.chromosome.length == 1">
            <div>
              <u-number-filter
                label="From"
                placeholder="e.g. 100100"
                v-model="filtersCriteria.position.from"
                @update:modelValue="onUpdate"
              />
            </div>

            <div>
              <u-number-filter
                label="To"
                placeholder="e.g. 100900"
                v-model="filtersCriteria.position.to"
                @update:modelValue="onUpdate"
              />
            </div>
          </template>
        </div>
      </q-expansion-item>
    </div>

    <div>
      <q-expansion-item label="Consequences" :model-value="true" dense dense-toggle>
        <div class="col q-pt-xs q-gutter-y-sm">
          <div>
            <u-select-filter
              label="Impact"
              :options="consequenceImpactOptions"
              v-model="filtersCriteria.impact"
              @update:modelValue="onUpdate"
            />
          </div>

          <div>
            <u-select-filter
              label="Consequence"
              :options="consequenceTypeOptions"
              v-model="filtersCriteria.consequence"
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
import USelectFilter from "../../../base/SelectFilter.vue";
import filtersMixin from "../../../filters-mixin";

import MutationFiltersCriteria from "./mutation-filters-criteria";
import MutationFiltersContext from "./mutation-filters-context";
import Chromosome from "../../../../../../_models/domain/genome/enums/chromosome";
import MutationType from "../../../../../../_models/domain/genome/mutations/enums/mutation-type";
import ConsequenceImpact from "../../../../../../_models/domain/genome/mutations/enums/consequence-impact";
import ConsequenceType from "../../../../../../_models/domain/genome/mutations/enums/consequence-type";
import { mapOptions } from "../../../filter-options-helpers";

export default {
  components: {
    UChipsFilter,
    UNumberFilter,
    USelectFilter
  },

  mixins: [filtersMixin],

  data() {
    return {
      filtersCriteria: this.modelValue || new MutationFiltersCriteria(),
      filtersContext: this.context || new MutationFiltersContext()
    };
  },

  computed: {
    chromosome() {
      return this.filtersCriteria.chromosome;
    },

    mutationTypeOptions() {
      return mapOptions(this.filtersContext.mutationTypeOptions, MutationType.values);
    },

    chromosomeOptions() {
      return mapOptions(this.filtersContext.chromosomeOptions, Chromosome.values);
    },

    consequenceImpactOptions() {
      return mapOptions(this.filtersContext.consequenceImpactOptions, ConsequenceImpact.values);
    },

    consequenceTypeOptions() {
      return mapOptions(this.filtersContext.consequenceImpactOptions, ConsequenceType.values);
    }
  },

  watch: {
    chromosome(value) {
      if(value?.length != 1) {
        this.filtersCriteria.position = { from: null, to: null };
      }
    },

    modelValue(value) {
      this.filtersCriteria = value || new MutationFiltersCriteria();
    }
  }
}
</script>