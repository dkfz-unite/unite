<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="variant">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.svs.crumb" :to="{ name: Settings.svs.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="Tabs[tab].crumb" />
      </q-breadcrumbs>

      <q-space />

      <u-download-button
        v-if="variant"
        :id="variant.id"
        :reference="variant.id"
        :data="variant.data"
        :domain="Settings.svs.domain">
      </u-download-button>
    </div>

    <div class="row" v-if="variant">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab
                :name="Tabs.summary.domain"
                :label="Tabs.summary.title"
                :icon="Tabs.summary.icon"
              />
              <q-tab
                :name="Tabs.consequences.domain"
                :label="Tabs.consequences.title"
                :icon="Tabs.consequences.icon"
                :disable="!variant.affectedFeatures?.length"
              />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab">
              <q-tab-panel :name="Tabs.summary.domain" class="q-py-sm q-px-none">
                <u-summary-tab :variant="variant" />
              </q-tab-panel>
              <q-tab-panel :name="Tabs.consequences.domain" class="q-py-sm q-px-none">
                <u-consequences-tab :variant="variant" />
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
import UDownloadButton from "../../../_shared/components/download/DownloadButton.vue";
import USummaryTab from "./components/SummaryTab.vue";
import UConsequencesTab from "../_shared/components/ConsequencesTab.vue";
import tabPageMixin from "../../../_shared/tab-page-mixin";

import Settings from "@/_settings/settings";
import api from "../_shared/api/variant";

export default {
  components:{
    UDownloadButton,
    USummaryTab,
    UConsequencesTab
  },

  mixins: [tabPageMixin],

  setup() {
    return {
      Settings,
      Tabs: Settings.sv.tabs
    };
  },

  data() {
    return {
      loading: false,
      variant: null
    };
  },

  async mounted() {
    try {
      this.loading = true;
      this.variant = await api.get(this.$route.params.id);
    } catch (error) {
      this.variant = null;
    } finally {
      this.loading = false;
    }
  },

  async unmounted() {
    this.$store.dispatch(`${Settings.sv.domain}/clearState`);
  }
}
</script>