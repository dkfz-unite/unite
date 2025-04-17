<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="image">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.mrs.crumb" :to="{ name: Settings.mrs.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="Tabs[tab].crumb" />
      </q-breadcrumbs>

      <q-space />

      <u-download-button
        v-if="image"
        :id="image.id"
        :reference="image.mr.referenceId"
        :data="image.data"
        :domain="Settings.mrs.domain">
      </u-download-button>

      <u-delete-button
        v-if="image && canWriteData"
        :id="image.id"
        :reference="image.referenceId"
        @deleted="$router.push({name: Settings.mrs.domain})">
      </u-delete-button>
    </div>

    <div class="row" v-if="image">
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
                :name="Tabs.profile.domain"
                :label="Tabs.profile.title"
                :icon="Tabs.profile.icon"
                :disable="!showProfile"
              />
              <q-tab
                :name="Tabs.genes.domain"
                :label="Tabs.genes.title"
                :icon="Tabs.genes.icon"
                :disable="!showGenes"
              />
              <u-tab-variants 
                v-model="tab"
                :disable="!showVariants"
                :disableSms="!showSms"
                :disableCnvs="!showCnvs"
                :disableSvs="!showSvs"
              />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab" class="fit">
              <q-tab-panel :name="Tabs.summary.domain" class="q-py-sm q-px-none">
                <u-summary-tab :image="image" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.profile.domain" class="q-py-sm q-px-none">
                <u-profile-tab :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.genes.domain" class="q-py-sm q-px-none">
                <u-genes-tab title="Image Genes" :area="Settings.mr.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.sms.domain" class="q-py-sm q-px-none">
                <u-sms-tab title="Image Simple Mutations (SM)" :area="Settings.mr.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.cnvs.domain" class="q-py-sm q-px-none">
                <u-cnvs-tab title="Image Copy Number Variants (CNV)" :area="Settings.mr.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.svs.domain" class="q-py-sm q-px-none">
                <u-svs-tab title="Image Structural Variants (SV)" :area="Settings.mr.domain" :samples="samples" />
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
import UDownloadButton from "@/domain/_shared/entry/components/download/DownloadButton.vue";
import UDeleteButton from "../_shared/image/components/delete/DeleteButton.vue";
import UTabVariants from "@/domain/_shared/entry/components/tabs/headers/VariantsTabHeader.vue";
import USummaryTab from "./components/tabs/SummaryTab.vue";
import UProfileTab from "@/domain/_shared/entry/components/tabs/ProfileTab.vue";
import UGenesTab from "@/domain/_shared/entry/components/tabs/GenesTab.vue";
import USmsTab from "@/domain/_shared/entry/components/tabs/SMsTab.vue";
import UCnvsTab from "@/domain/_shared/entry/components/tabs/CNVsTab.vue";
import USvsTab from "@/domain/_shared/entry/components/tabs/SVsTab.vue";
import pageTabsMixin from "@/domain/_shared/entry/components/tabs/mixin";

import Settings from "@/_settings/settings";
import imageApi from "../_shared/image/api";
import { mapGetters } from "vuex";

export default {
  components: {
    UDownloadButton,
    UDeleteButton,
    UTabVariants,
    USummaryTab,
    UProfileTab,
    UGenesTab,
    USmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [pageTabsMixin],

  setup() {
    return {
      Settings,
      Tabs: Settings.mr.tabs
    };
  },

  data() {
    return {
      loading: false,
      image: null,
      samples: null
    };
  },

  computed: {
    ...mapGetters("identity", ["canWriteData"]),

    showProfile() {
      return this.showGenes || this.showVariants;
    },

    showGenes() {
      return this.image?.stats?.genes || this.image?.data?.exp;
    },

    showVariants() {
      return this.showSms || this.showCnvs || this.showSvs;
    },

    showSms() {
      return this.image?.data?.sms;
    },

    showCnvs() {
      return this.image?.data?.cnvs;
    },

    showSvs() {
      return this.image?.data?.svs;
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.image = await imageApi.get(this.$route.params.id);
      this.samples = this.image.samples;
    } catch (error) {
      this.image = null;
    } finally {
      this.loading = false;
    }
  },

  async unmounted() {
    this.$store.dispatch(`${Settings.mr.domain}/clearState`);
  }
}
</script>