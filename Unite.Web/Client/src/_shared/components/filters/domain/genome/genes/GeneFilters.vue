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
        label="Name"
        placeholder="e.g. TTN"
        v-model="filtersCriteria.symbol"
        @update:modelValue="onUpdate"
      />
    </div>

    <div>
      <u-select-filter
        label="Biotype"
        :options="biotypeOptions"
        v-model="filtersCriteria.biotype"
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
  </div>
</template>

<script>
import UChipsFilter from "../../../base/ChipsFilter.vue";
import UNumberFilter from "../../../base/NumberFilter.vue";
import USelectFilter from "../../../base/SelectFilter.vue";
import filtersMixin from "../../../filters-mixin";

import GeneFiltersCriteria from "./gene-filters-criteria";
import GeneFiltersContext from "./gene-filters-context";
import Biotype from "../../../../../../_models/domain/genome/genes/enums/biotype";
import Chromosome from "../../../../../../_models/domain/genome/enums/chromosome";
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
      filtersCriteria: this.modelValue || new GeneFiltersCriteria(),
      filtersContext: this.context || new GeneFiltersContext()
    };
  },

  computed: {
    biotypeOptions() {
      return mapOptions(this.filtersContext.biotypeOptions, Biotype.values);
    },

    chromosomeOptions() {
      return mapOptions(this.filtersContext.chromosomeOptions, Chromosome.values);
    }
  },

  watch: {
    modelValue(value) {
      this.filtersCriteria = value || new GeneFiltersCriteria();
    }
  }
}
</script>