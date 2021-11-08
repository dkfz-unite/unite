<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="specimen">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Organoids" :to="{ name: 'organoids' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="specimen">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="ancestry" label="Ancestry" icon="las la-sitemap" />
              <q-tab name="interventions" label="Interventions" icon="las la-biohazard" :disable="!showInterventions" />
              <q-tab name="genes" label="Genes" icon="svguse:/icons.svg#u-gene-alt" :disable="!showGenes" />
              <q-tab name="mutations" label="Mutations" icon="svguse:/icons.svg#u-mutation-alt" :disable="!showMutations" />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab" class="fit">
              <q-tab-panel name="summary" class="q-py-sm q-px-none">
                <u-summary-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="ancestry" class="q-py-sm q-px-none">
                <u-ancestry-tab 
                  :donor="donor" 
                  :specimens="[specimen]"
                  :current="specimen.id"
                />
              </q-tab-panel>

              <q-tab-panel name="interventions" class="q-py-sm q-px-none">
                <u-interventions-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="genes" class="q-py-sm q-px-none">
                <u-genes-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="mutations" class="q-py-sm q-px-none">
                <u-mutations-tab :specimen="specimen" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="grey" />
    </q-inner-loading>
  </div>
</template>

<script>
import USummaryTab from "./components/SummaryTab.vue";
import UInterventionsTab from "./components/InterventionsTab.vue";
import UAncestryTab from "../_shared/components/specimen/AncestryTab.vue";
import UGenesTab from "../_shared/components/specimen/GenesTab.vue";
import UMutationsTab from "../_shared/components/specimen/MutationsTab.vue";
import tabPageMixin from "../../_shared/tab-page-mixin";

import specimenApi from "../_shared/api/specimen";
import donorApi from "../../donor/api";

export default {
  components: {
    USummaryTab,
    UAncestryTab,
    UInterventionsTab,
    UGenesTab,
    UMutationsTab
  },

  mixins: [tabPageMixin],

  data() {
    return {
      loading: false,
      donor: null,
      specimen: null
    };
  },

  computed: {
    showInterventions() {
      return !!this.specimen?.organoid?.interventions;
    },

    showGenes() {
      return !!this.specimen?.numberOfGenes;
    },

    showMutations() {
      return !!this.specimen?.numberOfMutations;
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.specimen = await specimenApi.get(this.$route.params.id);
      this.donor = await donorApi.get(this.specimen.donorId);
    } catch (error) {
      this.specimen = null;
    } finally {
      this.loading = false;
    }
  }
}
</script>