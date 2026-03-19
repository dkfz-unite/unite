<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="protein">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.proteins.crumb" :to="{ name: Settings.proteins.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="Tabs[tab].crumb" />
      </q-breadcrumbs>

      <q-space />
    </div>

    <div class="row" v-if="protein">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab :name="Tabs.summary.domain" :label="Tabs.summary.title" :icon="Tabs.summary.icon" />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab">
              <q-tab-panel :name="Tabs.summary.domain" class="q-py-sm q-px-none">
                <u-summary-tab :protein="protein" />
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
// import UDownloadButton from "@/domain/_shared/entry/components/download/DownloadButton.vue";
// import UTabVariants from "@/domain/_shared/entry/components/tabs/headers/VariantsTabHeader.vue";
import USummaryTab from "./components/tabs/SummaryTab.vue";
// import UProteinTab from "./components/tabs/ProteinTab.vue";
// import UDonorsTab from "./components/tabs/DonorsTab.vue";
// import USmsTab from "./components/tabs/SMsTab.vue";
// import UCnvsTab from "./components/tabs/CNVsTab.vue";
// import USvsTab from "./components/tabs/SVsTab.vue";
import pageTabsMixin from "@/domain/_shared/entry/components/tabs/mixin";

import Settings from "@/_settings/settings";
import api from "./api";

export default {
  components:{
    // UDownloadButton,
    // UTabVariants,
    USummaryTab,
    // UProteinTab,
    // UDonorsTab,
    // USmsTab,
    // UCnvsTab,
    // USvsTab
  },

  mixins: [pageTabsMixin],

  setup() {
    return {
      Settings,
      Tabs: Settings.protein.tabs
    };
  },

  data() {
    return {
      loading: false,
      protein: null
    };
  },

  computed: {
    // showVariants() {
    //   return this.showSms || this.showCnvs || this.showSvs;
    // },

    // showSms() {
    //   return this.gene?.stats?.sms;
    // },

    // showCnvs() {
    //   return this.gene?.stats?.cnvs;
    // },

    // showSvs() {
    //   return this.gene?.stats?.svs;
    // }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        this.protein = await api.get(this.$route.params.id);
      } catch (error) {
        this.protein = null;
      } finally {
        this.loading = false;
      }
    }
  },

  async unmounted() {
    this.$store.dispatch(`${Settings.protein.domain}/clearState`);
  }
}
</script>