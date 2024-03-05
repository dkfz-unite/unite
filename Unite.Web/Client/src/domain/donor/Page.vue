<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="donor">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.donors.crumb" :to="{ name: Settings.donors.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="Tabs[tab].crumb" />
      </q-breadcrumbs>

      <q-space />

      <u-download-button
        v-if="donor"
        :id="donor.id"
        :reference="donor.referenceId"
        :data="donor.data"
        :domain="Settings.donors.domain">
      </u-download-button>
    </div>

    <div class="row" v-if="donor">
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
                :name="Tabs.clinical.domain" 
                :label="Tabs.clinical.title" 
                :icon="Tabs.clinical.icon" 
                :disable="!showClinical" 
              />
              <q-tab 
                :name="Tabs.treatments.domain" 
                :label="Tabs.treatments.title" 
                :icon="Tabs.treatments.icon" 
                :disable="!showTreatments"
              />
              <q-tab 
                :name="Tabs.specimens.domain" 
                :label="Tabs.specimens.title" 
                :icon="Tabs.specimens.icon" 
                :disable="!showSpecimens"
              />
              <q-tab 
                :name="Tabs.mris.domain" 
                :label="Tabs.mris.title" 
                :icon="Tabs.mris.icon" 
                :disable="!showImages"
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
            <q-tab-panels v-model="tab" class="fit">
              <q-tab-panel :name="Tabs.summary.domain" class="q-py-sm q-px-none">
                <u-summary-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.clinical.domain" class="q-py-sm q-px-none">
                <u-clinical-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.treatments.domain" class="q-py-sm q-px-none">
                <u-treatments-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.specimens.domain" class="q-py-sm q-px-none">
                <u-ancestry-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.mris.domain" class="q-py-sm q-px-none">
                <u-mris-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.profile.domain" class="q-py-sm q-px-none">
                <u-profile-tab :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.genes.domain" class="q-py-sm q-px-none">
                <u-genes-tab title="Donor Genes" :area="Settings.donor.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.ssms.domain" class="q-py-sm q-px-none">
                <u-ssms-tab title="Donor Simple Somatic Mutations" :area="Settings.donor.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.cnvs.domain" class="q-py-sm q-px-none">
                <u-cnvs-tab title="Donor Copy Number Variants" :area="Settings.donor.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.svs.domain" class="q-py-sm q-px-none">
                <u-svs-tab title="Donor Structural Variants" :area="Settings.donor.domain" :samples="samples" />
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
import UTabVariants from "@/domain/_shared/entry/components/tabs/headers/VariantsTabHeader.vue";
import USummaryTab from "./components/tabs/SummaryTab.vue";
import UClinicalTab from "./components/tabs/ClinicalTab.vue";
import UTreatmentsTab from "./components/tabs/TreatmentsTab.vue";
import UAncestryTab from "./components/tabs/AncestryTab.vue";
import UMrisTab from "./components/tabs/MrisTab.vue";
import UProfileTab from "@/domain/_shared/entry/components/tabs/ProfileTab.vue";
import UGenesTab from "@/domain/_shared/entry/components/tabs/GenesTab.vue";
import USsmsTab from "@/domain/_shared/entry/components/tabs/SSMsTab.vue";
import UCnvsTab from "@/domain/_shared/entry/components/tabs/CNVsTab.vue";
import USvsTab from "@/domain/_shared/entry/components/tabs/SVsTab.vue";
import pageTabsMixin from "@/domain/_shared/entry/components/tabs/mixin";

import Settings from "@/_settings/settings";
import api from "./api";

export default {
  components: {
    UDownloadButton,
    UTabVariants,
    USummaryTab,
    UClinicalTab,
    UTreatmentsTab,
    UAncestryTab,
    UMrisTab,
    UProfileTab,
    UGenesTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [pageTabsMixin],

  setup() {
    return {
      Settings,
      Tabs: Settings.donor.tabs
    };
  },

  data() {
    return {
      loading: false,
      donor: null,
      samples: null,
      sample: null
    };
  },

  provide() {
    return {
      donor: this.donor,
      samples: this.samples,
    };
  },

  computed: {
    showClinical() {
      return this.donor?.data?.clinical;
    },

    showTreatments() {
      return this.donor?.data?.treatments
    },

    showSpecimens() {
      return this.donor?.data?.materials || this.donor?.data?.lines || this.donor?.data?.organoids || this.donor?.data?.xenografts;
    },

    showImages() {
      return this.donor?.data?.mris || this.donor?.data?.cts;
    },

    showProfile() {
      return this.showGenes || this.showVariants;
    },

    showGenes() {
      return this.donor?.numberOfGenes || this.donor?.data?.geneExp;
    },

    showVariants() {
      return this.showSsms || this.showCnvs || this.showSvs;
    },

    showSsms() {
      return this.donor?.data?.ssms;
    },

    showCnvs() {
      return this.donor?.data?.cnvs;
    },

    showSvs() {
      return this.donor?.data?.svs;
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        this.donor = await api.get(this.$route.params.id);
        this.samples = this.donor.samples;
      } catch (error) {
        this.donor = null;
        this.samples = null;
      } finally {
        this.loading = false;
      }
    }
  },

  async unmounted() {
    this.$store.dispatch(`${Settings.donor.domain}/clearState`);
  }
}
</script>