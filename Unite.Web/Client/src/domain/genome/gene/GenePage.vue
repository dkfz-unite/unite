<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="gene">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.genes.crumb" :to="{ name: Settings.genes.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="Tabs[tab].crumb" />
      </q-breadcrumbs>

      <q-space />

      <u-download-button
        v-if="gene"
        :id="gene.id"
        :reference="gene.symbol"
        :data="gene.data"
        :domain="Settings.genes.domain">
      </u-download-button>
    </div>

    <div class="row" v-if="gene">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab :name="Tabs.summary.domain" :label="Tabs.summary.title" :icon="Tabs.summary.icon" />
              <q-tab :name="Tabs.protein.domain" :label="Tabs.protein.title" :icon="Tabs.protein.icon" />
              <q-tab :name="Tabs.donors.domain" :label="Tabs.donors.title" :icon="Tabs.donors.icon" />
              <u-tab-variants 
                v-model="tab"
                :disable="!showVariants"
                :disableSsms="!showSsms"
                :disableCnvs="!showCnvs"
                :disableSvs="!showSvs" 
              />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab">
              <q-tab-panel :name="Tabs.summary.domain" class="q-py-sm q-px-none">
                <u-summary-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.protein.domain" class="q-py-sm q-px-none">
                <u-protein-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.donors.domain" class="q-py-sm q-px-none">
                <u-donors-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.ssms.domain" class="q-py-sm q-px-none">
                <u-ssms-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.cnvs.domain" class="q-py-sm q-px-none">
                <u-cnvs-tab :gene="gene" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.svs.domain" class="q-py-sm q-px-none">
                <u-svs-tab :gene="gene" />
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
import UDownloadButton from "../../_shared/components/download/DownloadButton.vue";
import UTabVariants from "../../_shared/components/genome/variants/VariantsTabHeader.vue";
import USummaryTab from "./components/SummaryTab.vue";
import UProteinTab from "./components/ProteinTab.vue";
import UDonorsTab from "./components/DonorsTab.vue";
import USsmsTab from "./components/SSMsTab.vue";
import UCnvsTab from "./components/CNVsTab.vue";
import USvsTab from "./components/SVsTab.vue";
import tabPageMixin from "../../_shared/tab-page-mixin";

import Settings from "@/_settings/settings";
import DomainNames from "@/_settings/domain-names";
import api from "./api";

export default {
  components:{
    UDownloadButton,
    UTabVariants,
    USummaryTab,
    UProteinTab,
    UDonorsTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [tabPageMixin],

  setup() {
    return {
      Settings,
      Tabs: Settings.gene.tabs,
      DomainNames
    };
  },

  data() {
    return {
      loading: false,
      gene: null
    };
  },

  computed: {
    showVariants() {
      return this.showSsms || this.showCnvs || this.showSvs;
    },

    showSsms() {
      return this.gene?.numberOfSsms;
    },

    showCnvs() {
      return this.gene?.numberOfCnvs;
    },

    showSvs() {
      return this.gene?.numberOfSvs;
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        this.gene = await api.get(this.$route.params.id);
      } catch (error) {
        this.gene = null;
      } finally {
        this.loading = false;
      }
    }
  },

  async unmounted() {
    this.$store.dispatch(`${Settings.gene.domain}/clearState`);
  }
}
</script>