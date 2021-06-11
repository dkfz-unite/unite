<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Donors" :to="{ name: 'donors' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="donor">
      <div class="col-12">
        <q-separator />
        <q-tabs v-model="tab" dense align="left">
          <q-tab name="summary" label="Summary" icon="las la-user-circle" />
          <q-tab name="clinical" label="Clinical Data" icon="las la-stethoscope" :disable="!showClinicalData" />
          <q-tab name="specimens" label="Specimens" icon="las la-microscope" :disable="!showSpecimens" />
          <q-tab name="mutations" label="Mutations" icon="las la-dna" :disable="!showMutations" />
        </q-tabs>
        <q-separator />
      </div>

      <q-tab-panels v-model="tab" class="fit">
        <q-tab-panel name="summary" class="q-py-sm q-px-none">
          <u-summary-tab :donor="donor" />
        </q-tab-panel>

        <q-tab-panel name="clinical" class="q-py-sm q-px-none">
          <u-clinical-data-tab :donor="donor" />
        </q-tab-panel>

        <q-tab-panel name="specimens" class="q-py-sm q-px-none">
          <u-specimens-tab :donor="donor" />
        </q-tab-panel>

        <q-tab-panel name="mutations" class="q-py-sm q-px-none">
          <u-mutations-tab :donor="donor" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="row" v-else>
      Data is not accessible.
    </div>
  </div>
</template>

<script>
import USummaryTab from "@/components/donor/tabs/SummaryTab.vue";
import UClinicalDataTab from "@/components/donor/tabs/ClinicalDataTab.vue";
import USpecimensTab from "../../components/donor/tabs/SpecimensTab.vue"
import UMutationsTab from "@/components/donor/tabs/MutationsTab.vue";

import SearchCriteria from '@/services/criteria/criteria.search.js';

import apiClient from "@/services/api/api.client.donors.js";

export default {
  data() {
    return {
      tab: "summary",
      donor: null,
    };
  },

  computed: {
    showClinicalData() {
      return !!this.donor?.clinicalData;
    },

    showMutations() {
      return !!this.donor?.mutations;
    },

    showSpecimens() {
      // return !!this.donor.specimens;
      return true;
    }
  },

  async mounted() {
    try {
      this.donor = await apiClient.get(this.$route.params.id);
    } catch (error) {
      this.donor = null;
    }
  },

  async destroyed() {
    this.$store.state.donor.searchCriteria = new SearchCriteria();
  },

  components: {
    USummaryTab: USummaryTab,
    UClinicalDataTab: UClinicalDataTab,
    USpecimensTab: USpecimensTab,
    UMutationsTab: UMutationsTab
  },
};
</script>