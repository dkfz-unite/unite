<template>
  <q-drawer
    side="left" bordered elevated
    v-model="controls.show"
    :mini="!controls.show || controls.minimized"
    @click="onDrawerClick"
  >
    <div class="col q-pa-sm q-gutter-y-sm">
      <div class="row content-center">
        <div class="col-auto">
          <q-btn
            class="q-ml-xs"
            icon="las la-filter"
            dense rounded unelevated
          />
        </div>

        <div class="col q-px-md" v-if="!controls.minimized">
          <div class="text-subtitle1">{{title}}</div>
        </div>

        <div class="col-auto" v-if="!controls.minimized">
          <q-btn
            icon="las la-chevron-circle-left"
            dense rounded unelevated
            @click="onDrawerCloseClick"
          />
        </div>
      </div>

      <div class="row content-top">
        <div class="col-auto">
          <q-tabs v-model="tab" align="left" active-color="primary" dense vertical :indicator-color="controls.minimized ? 'transparent' : 'primary'">
            <q-tab name="donor" icon="las la-user-circle" />
            <q-tab name="tissue" icon="svguse:icons.svg#u-tissue" />
            <q-tab name="cell" icon="las la-microscope" />
            <q-tab name="organoid" icon="svguse:icons.svg#u-organoid" />
            <q-tab name="mutation" icon="las la-dna" />
          </q-tabs>
        </div>

        <q-separator vertical v-if="!controls.minimized"/>

        <div class="col" v-if="!controls.minimized">
          <q-tab-panels v-model="tab" class="q-pl-sm">
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

            <q-tab-panel name="organoid" class="q-pa-none">
              <div class="col q-gutter-y-sm">
                <div class="row">
                  <u-organoid-filters
                    v-model="criteria.organoidFilters"
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
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import UDonorFilters from "./DonorFilters.vue";
import UTissueFilters from "./TissueFilters.vue";
import UCellFilters from "./CellFilters.vue";
import UOrganoidFilters from "./OrganoidFilters.vue";
import UMutationFilters from "./MutationFilters.vue";
import UGeneFilters from "./GeneFilters.vue";

export default {
  props: {
    criteria: {
      type: Object,
      required: true
    },
    category: {
      type: String,
      required: false,
      default: "donor"
    },
    controls: {
      type: Object,
      require: true
    }
  },

  data() {
    return {
      tab: this.category
    }
  },

  computed: {
    title() {
      switch (this.tab) {
        case "donor": return "Donor Filters";
        case "tissue": return "Tissue Filters";
        case "cell": return "Cell Line Filters";
        case "organoid": return "Organoid Filters";
        case "mutation": return "Mutation Filters";
        default: return "Donor Filters"
      }
    }
  },

  watch: {
    '$q.screen.gt.sm'(value) {
      if (value) {
        this.controls.show = true;
      }
    },

    'controls.show'(value) {
      if (value && this.$q.screen.lt.md) {
        this.controls.minimized = false;
      }
    }
  },

  methods: {
    onDrawerClick(e) {
      if (this.controls.minimized) {
        this.controls.minimized = false;

        // e.stopPropagation();
      }
    },

    onDrawerCloseClick(e) {
      if (this.$q.screen.lt.md) {
        this.controls.show = false;
      } else {
        this.controls.minimized = true;
      }
    },

    onInput() {
      this.$emit("filter");
    }
  },

  mounted() {
    if(this.$q.screen.gt.sm) {
      this.controls.show = true;
    }
  },

  components: {
    UDonorFilters: UDonorFilters,
    UTissueFilters: UTissueFilters,
    UCellFilters: UCellFilters,
    UOrganoidFilters: UOrganoidFilters,
    UMutationFilters: UMutationFilters,
    UGeneFilters: UGeneFilters,
  },
};
</script>