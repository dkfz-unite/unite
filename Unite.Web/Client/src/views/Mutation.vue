<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Mutations" :to="{ name: 'mutations' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="mutation">
      <div class="col-12">
        <q-separator />
        <q-tabs v-model="tab" dense align="left">
          <q-tab name="summary" label="Summary" icon="las la-dna" />
          <q-tab name="donors" label="Donors" icon="las la-user-circle" :disable="!showDonors" />
        </q-tabs>
        <q-separator />
      </div>

      <q-tab-panels v-model="tab" style="width: 100%">
        <q-tab-panel name="summary" class="q-py-sm q-px-none">
          <u-summary-tab :mutation="mutation" />
        </q-tab-panel>

        <q-tab-panel name="donors" class="q-py-sm q-px-none">
          <u-donors-tab :mutation="mutation" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="row" v-else>
      Data is not accessible.
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

  computed: {
    showDonors() {
      return !!this.mutation?.donors;
    }
  },

  async mounted() {
    try {
      this.mutation = await apiClient.get(this.$route.params.id);
    } catch (error) {
      this.mutation = null;
    }
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