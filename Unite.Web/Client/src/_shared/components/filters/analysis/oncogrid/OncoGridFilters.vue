<template>
  <div class="col q-gutter-y-sm">
    <q-expansion-item label="Most affected" :model-value="true" dense dense-toggle>
      <div class="col q-pt-xs q-gutter-y-sm">
        <div>
          <u-number-filter
            :label="`Donors (max ${MAX_DONORS})`"
            placeholder="e.g. 200"
            v-model.number="filtersCriteria.numberOfDonors"
            @update:modelValue="onUpdate"
          />
        </div>
        <div>
          <u-number-filter
            :label="`Genes (max ${MAX_GENES})`"
            placeholder="e.g. 50"
            v-model.number="filtersCriteria.numberOfGenes"
            @update:modelValue="onUpdate"
          />
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import UNumberFilter from "../../base/NumberFilter.vue";
import filtersMixin from "../../filters-mixin";

import OncogridFiltersCriteria from "./oncogrid-filters-criteria";
import { MAX_GENES, MAX_DONORS } from "./oncogrid-filters-criteria";

export default {
  components: {
    UNumberFilter: UNumberFilter
  },

  mixins: [filtersMixin],

  data() {
    return {
      MAX_GENES: MAX_GENES,
      MAX_DONORS: MAX_DONORS,

      filtersCriteria: this.modelValue || new OncogridFiltersCriteria()
    };
  },

  watch: {
    modelValue(value) {
      this.filtersCriteria = value || new OncogridFiltersCriteria();
    }
  }
}
</script>