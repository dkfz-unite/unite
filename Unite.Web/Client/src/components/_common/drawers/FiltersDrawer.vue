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
          <q-tabs 
            v-model="tab" :indicator-color="controls.minimized ? 'transparent' : 'primary'" active-color="primary" align="left" dense vertical>
            <!-- Visualisation -->
            <q-tab v-if="mode.oncogrid" name="oncogrid" icon="las la-chart-area">
              <q-badge v-if="criteria.oncoGridFilters.numberOfFilters" rounded>
                {{criteria.oncoGridFilters.numberOfFilters}}
              </q-badge>
            </q-tab>

            <!-- Data types -->
            <q-tab name="donor" icon="las la-user-circle">
              <q-badge v-if="criteria.donorFilters.numberOfFilters" rounded>
                {{criteria.donorFilters.numberOfFilters}}
              </q-badge>
            </q-tab>

            <q-tab v-if="mode.tissues || mode.other" name="tissue" icon="svguse:icons.svg#u-tissue">
              <q-badge v-if="criteria.tissueFilters.numberOfFilters" rounded>
                {{criteria.tissueFilters.numberOfFilters}}
              </q-badge>
            </q-tab>

            <q-tab v-if="mode.cells || mode.other" name="cell" icon="las la-microscope">
              <q-badge v-if="criteria.cellLineFilters.numberOfFilters" rounded>
                {{criteria.cellLineFilters.numberOfFilters}}
              </q-badge>
            </q-tab>

            <q-tab v-if="mode.organoids || mode.other" name="organoid" icon="svguse:icons.svg#u-organoid">
              <q-badge v-if="criteria.organoidFilters.numberOfFilters" rounded>
                {{criteria.organoidFilters.numberOfFilters}}
              </q-badge>
            </q-tab>

            <q-tab v-if="mode.xenografts || mode.other" name="xenograft" icon="svguse:icons.svg#u-mouse">
              <q-badge v-if="criteria.xenograftFilters.numberOfFilters" rounded>
                {{criteria.xenograftFilters.numberOfFilters}}
              </q-badge>
            </q-tab>

            <q-tab name="gene" icon="svguse:icons.svg#u-gene-alt">
              <q-badge v-if="criteria.geneFilters.numberOfFilters" rounded>
                {{criteria.geneFilters.numberOfFilters}}
              </q-badge>
            </q-tab>

            <q-tab name="mutation" icon="svguse:icons.svg#u-mutation-alt">
              <q-badge v-if="criteria.mutationFilters.numberOfFilters" rounded>
                {{criteria.mutationFilters.numberOfFilters}}
              </q-badge>
            </q-tab>
          </q-tabs>
        </div>

        <q-separator vertical v-if="!controls.minimized" />

        <div class="col" v-if="!controls.minimized">
          <q-tab-panels v-model="tab" class="q-pl-sm">
            <!-- Visualisation -->
            <q-tab-panel name="oncogrid" class="q-pa-none">
              <div class="col q-gutter-y-sm">
                <div class="row">
                  <u-oncogrid-filters
                      v-model="criteria.oncoGridFilters"
                      @input="onInput"
                  />
                </div>
              </div>
            </q-tab-panel>

            <!-- Data types -->
            <q-tab-panel name="donor" class="q-pa-none">
              <div class="col q-gutter-y-sm">
                <div class="row">
                  <u-donor-filters
                    v-model="criteria.donorFilters"
                    @input="onInput"
                  />
                </div>
                <div class="row" v-if="criteria.donorFilters.numberOfFilters">
                  <q-btn 
                    label="Clear" 
                    color="primary" 
                    class="q-ma-xs" 
                    dense flat no-caps 
                    @click="criteria.donorFilters.clear(); onInput();"
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
                <div class="row" v-if="criteria.tissueFilters.numberOfFilters">
                  <q-btn 
                    label="Clear" 
                    color="primary" 
                    class="q-ma-xs" 
                    dense flat no-caps 
                    @click="criteria.tissueFilters.clear(); onInput();"
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
                <div class="row" v-if="criteria.cellLineFilters.numberOfFilters">
                  <q-btn 
                    label="Clear" 
                    color="primary" 
                    class="q-ma-xs" 
                    dense flat no-caps 
                    @click="criteria.cellLineFilters.clear(); onInput();"
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
                <div class="row" v-if="criteria.organoidFilters.numberOfFilters">
                  <q-btn 
                    label="Clear" 
                    color="primary" 
                    class="q-ma-xs" 
                    dense flat no-caps 
                    @click="criteria.organoidFilters.clear(); onInput();"
                  />
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="xenograft" class="q-pa-none">
              <div class="col q-gutter-y-sm">
                <div class="row">
                  <u-xenograft-filters
                    v-model="criteria.xenograftFilters"
                    @input="onInput"
                  />
                </div>
                <div class="row" v-if="criteria.xenograftFilters.numberOfFilters">
                  <q-btn 
                    label="Clear" 
                    color="primary" 
                    class="q-ma-xs" 
                    dense flat no-caps 
                    @click="criteria.xenograftFilters.clear(); onInput();"
                  />
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="gene" class="q-pa-none">
              <div class="col q-hutter-y-sm">
                <div>
                  <u-gene-filters
                    v-model="criteria.geneFilters"
                    @input="onInput"
                  />
                </div>
                <div class="row" v-if="criteria.geneFilters.numberOfFilters">
                  <q-btn 
                    label="Clear" 
                    color="primary" 
                    class="q-ma-xs" 
                    dense flat no-caps 
                    @click="criteria.geneFilters.clear(); onInput();"
                  />
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="mutation" class="q-pa-none">
              <div class="col q-gutter-y-sm">
                <div>
                  <u-mutation-filters
                    v-model="criteria.mutationFilters"
                    @input="onInput"
                  />
                </div>
                <div class="row" v-if="criteria.mutationFilters.numberOfFilters">
                  <q-btn 
                    label="Clear" 
                    color="primary" 
                    class="q-ma-xs" 
                    dense flat no-caps 
                    @click="criteria.mutationFilters.clear(); onInput();"
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
import UDonorFilters from "../filters/DonorFilters.vue";
import UTissueFilters from "../filters/TissueFilters.vue";
import UCellFilters from "../filters/CellFilters.vue";
import UOrganoidFilters from "../filters/OrganoidFilters.vue";
import UXenograftFilters from "../filters/XenograftFilters.vue";
import UMutationFilters from "../filters/MutationFilters.vue";
import UGeneFilters from "../filters/GeneFilters.vue";
import UOncogridFilters from "../filters/visualization/OncoGridFilters.vue";

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
      tab: this.category,

      mode: {
        tissues: this.category == "tissue",
        cells: this.category == "cell",
        organoids: this.category == "organoid",
        xenografts: this.category == "xenograft",
        oncogrid: this.category == "oncogrid",
        other: ["donor", "gene", "mutation", "oncogrid"].includes(this.category)
      }
    }
  },

  computed: {
    title() {
      switch (this.tab) {
        case "donor": return "Donor Filters";
        case "tissue": return "Tissue Filters";
        case "cell": return "Cell Line Filters";
        case "organoid": return "Organoid Filters";
        case "xenograft": return "Xenograft Filters";
         case "gene": return "Gene Filters";
        case "mutation": return "Mutation Filters";
        case "oncogrid": return "Oncogrid Filters";
        default: return "Filters"
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
    UXenograftFilters: UXenograftFilters,
    UMutationFilters: UMutationFilters,
    UGeneFilters: UGeneFilters,
    UOncogridFilters: UOncogridFilters
  },
};
</script>

<style lang="scss">
.u-filter-tab {
  width: 50px;
}
</style>
