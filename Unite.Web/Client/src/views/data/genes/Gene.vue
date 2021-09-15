<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="gene">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Genes" :to="{ name: 'genes' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="gene">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="donors" label="Donors" icon="las la-user-circle" />
              <q-tab name="mutations" label="Mutations" icon="svguse:/icons.svg#u-mutation-alt" />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="summary" class="q-py-sm q-px-none">
                <u-summary-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel name="donors" class="q-py-sm q-px-none">
                <u-donors-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel name="mutations" class="q-py-sm q-px-none">
                <u-mutations-tab :gene="gene" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import USummaryTab from "../../../components/gene/SummaryTab.vue";
import UDonorsTab from "../../../components/gene/DonorsTab.vue";
import UMutationsTab from "../../../components/gene/MutationsTab.vue";

import apiClient from "../../../services/api/api.client.genes.js";

export default {
  data() {
    return {
      tab: "summary",
      loading: false,
      gene: null,
    };
  },

  async mounted() {
    try {
      this.loading = true;
      this.gene = await apiClient.get(this.$route.params.id);
    } catch (error) {
      this.gene = null;
    } finally {
      this.loading = false;
    }
  },

  async destroyed() {
    this.$store.dispatch("gene/clearState");
  },

  components:{
    USummaryTab: USummaryTab,
    UDonorsTab: UDonorsTab,
    UMutationsTab: UMutationsTab
  }
}
</script>