<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="mutation">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Mutations" :to="{ name: 'mutations' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="mutation">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="protein" label="Protein" icon="svguse:/icons.svg#u-lolliplot" />
              <q-tab name="donors" label="Donors" icon="las la-user-circle" />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="summary" class="q-py-sm q-px-none">
                <u-summary-tab :mutation="mutation" />
              </q-tab-panel>

              <q-tab-panel name="protein" class="q-py-sm q-px-none">
                <u-protein-tab :mutation="mutation" />
              </q-tab-panel>

              <q-tab-panel name="donors" class="q-py-sm q-px-none">
                <u-donors-tab :mutation="mutation" />
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
import USummaryTab from "../../../components/mutation/SummaryTab.vue";
import UProteinTab from "../../../components/mutation/ProteinTab.vue";
import UDonorsTab from "../../../components/mutation/DonorsTab.vue";

import apiClient from "../../../services/api/api.client.mutations.js";

export default {
  data() {
    return {
      tab: "summary",
      loading: false,
      mutation: null,
    };
  },

  async mounted() {
    try {
      this.loading = true;
      this.mutation = await apiClient.get(this.$route.params.id);
    } catch (error) {
      this.mutation = null;
    } finally {
      this.loading = false;
    }
  },

  async destroyed() {
    this.$store.dispatch("mutation/clearState");
  },

  components:{
    USummaryTab: USummaryTab,
    UProteinTab: UProteinTab,
    UDonorsTab: UDonorsTab
  }
}
</script>