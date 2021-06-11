<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Tissues" :to="{ name: 'tissues' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="specimen">
      <div class="col-12">
        <q-separator />
        <q-tabs v-model="tab" dense align="left">
          <q-tab name="summary" label="Summary" icon="svguse:/icons.svg#u-tissue" />
          <q-tab name="hierarchy" label="Ancestry" icon="las la-sitemap" />
          <q-tab name="mutations" label="Mutations" icon="las la-dna" :disable="!specimen.mutations" />
        </q-tabs>
        <q-separator />
      </div>

      <q-tab-panels v-model="tab" class="fit">
        <q-tab-panel name="summary" class="q-py-sm q-px-none">
          <u-summary-tab :specimen="specimen" />
        </q-tab-panel>

        <q-tab-panel name="hierarchy" class="q-py-sm q-px-none">
          <u-hierarchy-tab 
            :donor="donor" 
            :specimens="[specimen]"
            :current="specimen.id"
          />
        </q-tab-panel>

        <q-tab-panel name="mutations" class="q-py-sm q-px-none">
          <u-mutations-tab :specimen="specimen" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="row" v-else>
      Data is not accessible.
    </div>
  </div>
</template>

<script>
import USummaryTab from "../../components/specimens/tissue/tabs/SummaryTab.vue";
import UHierarchyTab from "../../components/specimens/base/tabs/AncestryTab.vue";
import UMutationsTab from "../../components/specimens/base/tabs/MutationsTab.vue";

import tissuesApiClient from "../../services/api/api.client.tissues.js";
import donorsApiClient from "../../services/api/api.client.donors.js";

export default {
  data() {
    return {
      tab: "summary",
      donor: null,
      specimen: null
    }
  },

  async mounted() {
    try {
      this.specimen = await tissuesApiClient.get(this.$route.params.id);
      this.donor = await donorsApiClient.get(this.specimen.donorId);
    } catch (error) {
      this.specimen = null;
    }
  },

  components: {
    USummaryTab: USummaryTab,
    UHierarchyTab: UHierarchyTab,
    UMutationsTab: UMutationsTab
  },
};
</script>