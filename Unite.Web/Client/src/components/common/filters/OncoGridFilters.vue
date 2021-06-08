<template>
  <div class="col">
    <q-splitter :value="18" disable>
      <template v-slot:before>
        <q-tabs v-model="tab" align="left" active-color="primary" dense vertical>
          <q-tab name="donor" icon="las la-user-circle"/>
          <q-tab name="mutation" icon="las la-dna"/>
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels class="q-ml-sm" v-model="tab">
          <q-tab-panel name="donor" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-donor-filters v-model="criteria.donorFilters" @input="onInput"/>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="mutation" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-mutation-filters v-model="criteria.mutationFilters" @input="onInput"/>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <q-expansion-item label="Most affected" :value="true" dense dense-toggle>
          <div class="col q-pt-xs q-gutter-y-sm">
            <div>
              <u-number-filter
                  :label="'Donors (max ' + MAX_DONORS + ')'"
                  placeholder="e.g. 200"
                  v-model="criteria.oncoGridFilters.mostAffectedDonorCount"
                  @input="onInput"
              />
            </div>
            <div>
              <u-number-filter
                  :label="'Genes (max ' + MAX_GENES + ')'"
                  placeholder="e.g. 50"
                  v-model="criteria.oncoGridFilters.mostAffectedGeneCount"
                  @input="onInput"
              />
            </div>
          </div>
        </q-expansion-item>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import UNumberFilter from "./standard/NumberFilter.vue";
import UDonorFilters from "./DonorFilters.vue";
import UMutationFilters from "./MutationFilters.vue";
import UGeneFilters from "./GeneFilters.vue";
import {MAX_GENES, MAX_DONORS} from "@/services/criteria/filters/filters.oncogrid.js";

export default {
  props: ["value", "selected"],

  data() {
    return {
      tab: this.getSelectedTab(this.selected),
      criteria: this.value,
      MAX_GENES: MAX_GENES,
      MAX_DONORS: MAX_DONORS
    };
  },

  methods: {
    onInput() {
      this.criteria.oncoGridFilters.sanitise();
      this.$emit("input", this.criteria);
    },

    getSelectedTab(value) {
      switch (value) {
        case "donor":
          return value;
        case "mutation":
          return value;
        default:
          return "donor";
      }
    },
  },

  components: {
    UDonorFilters: UDonorFilters,
    UMutationFilters: UMutationFilters,
    UGeneFilters: UGeneFilters,
    UNumberFilter: UNumberFilter
  },
};
</script>