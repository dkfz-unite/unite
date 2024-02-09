<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="donor">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.donors.crumb" :to="{ name: Settings.donors.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="Settings.donor.tabs[tab].crumb" />
      </q-breadcrumbs>

      <q-space />

      <u-download-button
        v-if="donor"
        :id="donor.id"
        :reference="donor.referenceId"
        :data="donor.data"
        :domain="DomainNames.Donors">
      </u-download-button>
    </div>

    <div class="row" v-if="donor">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab 
                :name="tabs.summary.domain" 
                :label="tabs.summary.title" 
                :icon="tabs.summary.icon" 
              />
              <q-tab 
                :name="tabs.clinical.domain" 
                :label="tabs.clinical.title" 
                :icon="tabs.clinical.icon" 
                :disable="!showClinical" 
              />
              <q-tab 
                :name="tabs.treatments.domain" 
                :label="tabs.treatments.title" 
                :icon="tabs.treatments.icon" 
                :disable="!showTreatments"
              />
              <q-tab 
                :name="tabs.specimens.domain" 
                :label="tabs.specimens.title" 
                :icon="tabs.specimens.icon" 
                :disable="!showSpecimens"
              />
              <q-tab 
                :name="tabs.mris.domain" 
                :label="tabs.mris.title" 
                :icon="tabs.mris.icon" 
                :disable="!showImages"
              />
              <q-tab 
                :name="tabs.profile.domain" 
                :label="tabs.profile.title" 
                :icon="tabs.profile.icon" 
                :disable="!showProfile"
              />
              <q-tab 
                :name="tabs.genes.domain" 
                :label="tabs.genes.title" 
                :icon="tabs.genes.icon" 
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
              <q-tab-panel :name="tabs.summary.domain" class="q-py-sm q-px-none">
                <u-summary-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.clinical.domain" class="q-py-sm q-px-none">
                <u-clinical-data-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.treatments.domain" class="q-py-sm q-px-none">
                <u-treatments-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.specimens.domain" class="q-py-sm q-px-none">
                <u-specimens-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.mris.domain" class="q-py-sm q-px-none">
                <u-mris-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.profile.domain" class="q-py-sm q-px-none">
                <u-profile-tab :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.genes.domain" class="q-py-sm q-px-none">
                <u-genes-tab title="Donor Genes" :area="Settings.donor.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.ssms.domain" class="q-py-sm q-px-none">
                <u-ssms-tab title="Donor Simple Somatic Mutations" :area="Settings.donor.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.cnvs.domain" class="q-py-sm q-px-none">
                <u-cnvs-tab title="Donor Copy Number Variants" :area="Settings.donor.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="tabs.svs.domain" class="q-py-sm q-px-none">
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
import UDownloadButton from "../_shared/components/download/DownloadButton.vue";
import UTabVariants from "../_shared/components/genome/variants/VariantsTabHeader.vue";
import USummaryTab from "./components/SummaryTab.vue";
import UClinicalDataTab from "./components/ClinicalDataTab.vue";
import UTreatmentsTab from "./components/TreatmentsTab.vue";
import USpecimensTab from "./components/SpecimensTab.vue";
import UMrisTab from "./components/MriImagesTab.vue";
import UProfileTab from "@/domain/_shared/components/genome/profile/ProfileTab.vue";
import UGenesTab from "@/domain/_shared/components/genome/genes/GenesTab.vue";
import USsmsTab from "@/domain/_shared/components/genome/variants/SSMsTab.vue";
import UCnvsTab from "@/domain/_shared/components/genome/variants/CNVsTab.vue";
import USvsTab from "@/domain/_shared/components/genome/variants/SVsTab.vue";

import Settings from "@/_settings/settings";
import DomainNames from "@/_settings/domain-names";
import tabPageMixin from "../_shared/tab-page-mixin";
import api from "./api";

export default {
  components: {
    UDownloadButton,
    UTabVariants,
    USummaryTab,
    UClinicalDataTab,
    UTreatmentsTab,
    USpecimensTab,
    UMrisTab,
    UProfileTab,
    UGenesTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [tabPageMixin],

  setup() {
    return {
      Settings,
      DomainNames
    };
  },

  data() {
    return {
      loading: false,
      donor: null,
      tabs: Settings.donor.tabs,
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