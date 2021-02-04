<template>
  <div class="col q-px-sm q-pt-sm q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" to="/" />
        <q-breadcrumbs-el label="Mutations" to="/mutations" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <q-separator />
      <q-tabs v-model="tab" dense align="left">
        <q-tab name="summary" label="Summary" icon="las la-dna" />
        <q-tab name="donors" label="Affected Donors" icon="las la-user-circle" />
      </q-tabs>
      
      <q-separator />
      <q-tab-panels v-model="tab" style="width: 100%">
        <q-tab-panel name="summary" class="q-py-sm q-px-none">
          <u-summary-tab :mutation="mutation" />
        </q-tab-panel>

        <q-tab-panel name="donors" class="q-py-sm q-px-none">
          <u-donors-tab :mutation="mutation" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import USummaryTab from "@/components/mutation/tabs/SummaryTab.vue";
import UDonorsTab from "@/components/mutation/tabs/DonorsTab.vue";

import SearchCriteria from '@/services/criteria/criteria.search.js';

import apiClient from "@/services/api/api.client.mutations.js";

export default {
  data() {
    return {
      tab: "summary",
      mutation: null,
    };
  },

  async mounted() {
    this.mutation = await apiClient.get(this.$route.params.id);
  },

  async destroyed() {
    this.$store.state.mutation.searchCriteria = new SearchCriteria();
  },

  components:{
    USummaryTab: USummaryTab,
    UDonorsTab: UDonorsTab
  }
};
</script>