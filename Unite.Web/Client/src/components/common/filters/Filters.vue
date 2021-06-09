<template>
  <div class="col">
    <q-splitter :value="18" disable>
      <template v-slot:before>
        <q-tabs v-model="tab" align="left" active-color="primary" dense vertical>
          <q-tab name="donor" icon="las la-user-circle" />
          <q-tab name="tissue" icon="svguse:icons.svg#u-tissue" />
          <q-tab name="cell" icon="las la-microscope" />
          <q-tab name="mutation" icon="las la-dna" />
          <!-- <q-tab name="radiology" icon="las la-x-ray" disable /> -->
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels class="q-ml-sm" v-model="tab">
          <q-tab-panel name="donor" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-donor-filters
                  v-model="criteria.donorFilters"
                  @input="onInput"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="cell" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-cell-filters
                  v-model="criteria.cellLineFilters"
                  @input="onInput"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="tissue" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-tissue-filters
                  v-model="criteria.tissueFilters"
                  @input="onInput"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="mutation" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-mutation-filters
                  v-model="criteria.mutationFilters"
                  @input="onInput"
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import UDonorFilters from "./DonorFilters.vue";
import UTissueFilters from "./TissueFilters.vue";
import UCellFilters from "./CellFilters.vue";
import UMutationFilters from "./MutationFilters.vue";
import UGeneFilters from "./GeneFilters.vue";

export default {
  props: ["value", "selected"],

  data() {
    return {
      tab: this.getSelectedTab(this.selected),
      criteria: this.value,
    };
  },

  methods: {
    onInput() {
      this.$emit("input", this.criteria);
    },

    getSelectedTab(value) {
      switch (value) {
        case "donor":
          return value;
        case "tissue":
          return value;
        case "cell":
          return value;
        case "mutation":
          return value;
        // case "radiology":
        //   return value;
        default:
          return "donor";
      }
    },
  },

  components: {
    UDonorFilters: UDonorFilters,
    UTissueFilters: UTissueFilters,
    UCellFilters: UCellFilters,
    UMutationFilters: UMutationFilters,
    UGeneFilters: UGeneFilters,
  },
}
</script>