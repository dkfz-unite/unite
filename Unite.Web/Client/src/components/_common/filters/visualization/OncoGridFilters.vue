<template>
  <div class="col q-gutter-y-sm">
    <q-expansion-item label="Most affected" :value="true" dense dense-toggle>
      <div class="col q-pt-xs q-gutter-y-sm">
        <div>
          <u-number-filter
            :label="`Donors (max ${MAX_DONORS})`"
            placeholder="e.g. 200"
            v-model="criteria.numberOfDonors"
            @input="onInput"
          />
        </div>
        <div>
          <u-number-filter
            :label="`Genes (max ${MAX_GENES})`"
            placeholder="e.g. 50"
            v-model="criteria.numberOfGenes"
            @input="onInput"
          />
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import UNumberFilter from "../standard/NumberFilter.vue";
import {MAX_GENES, MAX_DONORS} from "../../../../services/criteria/filters/filters.oncogrid.js";

export default {
  props: ["value"],

  data() {
    return {
      criteria: this.value,
      MAX_GENES: MAX_GENES,
      MAX_DONORS: MAX_DONORS
    };
  },

  methods: {
    onInput() {
      this.criteria?.sanitise();
      this.$emit("input", this.criteria);
    },
  },

  components: {
    UNumberFilter: UNumberFilter
  },
}
</script>