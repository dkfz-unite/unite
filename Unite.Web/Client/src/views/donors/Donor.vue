<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="donor">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Donors" :to="{ name: 'donors' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="donor">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-user-circle" />
              <q-tab name="clinical" label="Clinical Data" icon="las la-stethoscope" :disable="!showClinicalData" />
              <q-tab name="treatments" label="Treatments" icon="las la-pills" :disable="!showTreatments" />
              <q-tab name="specimens" label="Specimens" icon="las la-microscope" :disable="!showSpecimens" />
              <q-tab name="mutations" label="Mutations" icon="las la-dna" :disable="!showMutations" />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab" class="fit">
              <q-tab-panel name="summary" class="q-py-sm q-px-none">
                <u-summary-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="clinical" class="q-py-sm q-px-none">
                <u-clinical-data-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="treatments" class="q-py-sm q-px-none">
                <u-treatments-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="specimens" class="q-py-sm q-px-none">
                <u-specimens-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="mutations" class="q-py-sm q-px-none">
                <u-mutations-tab :donor="donor" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-else>
      <u-spinner :loading="loading" />
    </div>
  </div>
</template>

<script>
import USummaryTab from "../../components/donor/tabs/SummaryTab.vue";
import UClinicalDataTab from "../../components/donor/tabs/ClinicalDataTab.vue";
import UTreatmentsTab from "../../components/donor/tabs/TreatmentsTab.vue"
import USpecimensTab from "../../components/donor/tabs/SpecimensTab.vue"
import UMutationsTab from "../../components/donor/tabs/MutationsTab.vue";

import apiClient from "../../services/api/api.client.donors.js";

export default {
  data() {
    return {
      tab: "summary",
      loading: false,
      donor: null,
    };
  },

  computed: {
    showClinicalData() {
      return !!this.donor?.clinicalData;
    },

    showTreatments() {
      return !!this.donor?.treatments?.length
    },

    showSpecimens() {
      return !!this.donor?.numberOfSpecimens;
    },

    showMutations() {
      return !!this.donor?.numberOfMutations;
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.donor = await apiClient.get(this.$route.params.id);
    } catch (error) {
      this.donor = null;
    } finally {
      this.loading = false;
    }
  },

  async destroyed() {
    this.$store.dispatch("donor/clearState");
  },

  components: {
    USummaryTab: USummaryTab,
    UClinicalDataTab: UClinicalDataTab,
    UTreatmentsTab: UTreatmentsTab,
    USpecimensTab: USpecimensTab,
    UMutationsTab: UMutationsTab
  },
};
</script>