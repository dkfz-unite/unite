<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="donor">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Donors" :to="{ name: 'donors' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="tabName" />
      </q-breadcrumbs>
    </div>

    <div class="row" v-if="donor">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="clinical" label="Clinical Data" icon="las la-stethoscope" :disable="!showClinical" />
              <q-tab name="treatments" label="Treatments" icon="las la-pills" :disable="!showTreatments" />
              <q-tab name="specimens" label="Specimens" icon="las la-microscope" :disable="!showSpecimens" />
              <q-tab name="mris" label="Images" icon="las la-x-ray" :disable="!showImages" />
              <q-tab name="profile" label="Profile" icon="las la-chart-bar" :disable="!showProfile" />
              <q-tab name="genes" label="Genes" icon="svguse:/icons.svg#u-gene" :disable="!showGenes" />
              <u-variants-tab-header 
                v-model="tab"
                :disable="!showVariants"
                :disableSsms="!showSsms"
                :disableCnvs="!showCnvs"
                :disableSvs="!showSvs" />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab" class="fit">
              <q-tab-panel name="summary" class="q-py-sm q-px-none">
                <u-summary-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="clinical" class="q-py-sm q-px-none">
                <u-clinical-data-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="treatments" class="q-py-sm q-px-none">
                <u-treatments-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="specimens" class="q-py-sm q-px-none">
                <u-specimens-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="mris" class="q-py-sm q-px-none">
                <u-mris-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="profile" class="q-py-sm q-px-none">
                <u-profile-tab :donor="donor" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="genes" class="q-py-sm q-px-none">
                <u-genes-tab :donor="donor" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="ssms" class="q-py-sm q-px-none">
                <u-ssms-tab :donor="donor" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="cnvs" class="q-py-sm q-px-none">
                <u-cnvs-tab :donor="donor" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="svs" class="q-py-sm q-px-none">
                <u-svs-tab :donor="donor" :samples="samples" />
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
import UVariantsTabHeader from "../_shared/components/genome/variants/VariantsTabHeader.vue";
import USummaryTab from "./components/SummaryTab.vue";
import UClinicalDataTab from "./components/ClinicalDataTab.vue";
import UTreatmentsTab from "./components/TreatmentsTab.vue";
import USpecimensTab from "./components/SpecimensTab.vue";
import UMrisTab from "./components/MriImagesTab.vue";
import UProfileTab from "./components/ProfileTab.vue";
import UGenesTab from "./components/GenesTab.vue";
import USsmsTab from "./components/SSMsTab.vue";
import UCnvsTab from "./components/CNVsTab.vue";
import USvsTab from "./components/SVsTab.vue";
import tabPageMixin from "../_shared/tab-page-mixin";

import api from "./api";

export default {
  components: {
    UVariantsTabHeader,
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
    tabName() {
      return this.tab === "summary" ? "Summary"
           : this.tab === "clinical" ? "Clinical"
           : this.tab === "treatments" ? "Treatments"
           : this.tab === "specimens" ? "Specimens"
           : this.tab === "mris" ? "MRI"
           : this.tab === "profile" ? "Profile"
           : this.tab === "genes" ? "Genes"
           : this.tab === "ssms" ? "SSMs"
           : this.tab === "cnvs" ? "CNVs"
           : this.tab === "svs" ? "SVs"
           : this.tab;
    },

    showClinical() {
      return this.donor?.data?.clinical;
    },

    showTreatments() {
      return this.donor?.data?.treatments
    },

    showSpecimens() {
      return this.donor?.data?.tissues || this.donor?.data?.cells || this.donor?.data?.organoids || this.donor?.data?.xenografts;
    },

    showImages() {
      return this.donor?.data?.mris || this.donor?.data?.cts;
    },

    showProfile() {
      return this.showVariants || this.donor?.data?.geneExp;
    },

    showGenes() {
      return this.donor?.numberOfGenes || this.donor?.data?.geneExp;
    },

    showVariants() {
      return this.showSsms || this.showCnvs || this.showSvs;
    },

    showSsms() {
      return this.donor?.numberOfSsms;
    },

    showCnvs() {
      return this.donor?.numberOfCnvs;
    },

    showSvs() {
      return this.donor?.numberOfSvs;
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
        this.samples = await api.getSamples(this.$route.params.id);
      } catch (error) {
        this.donor = null;
        this.samples = null;
      } finally {
        this.loading = false;
      }
    }
  },

  async unmounted() {
    this.$store.dispatch("donor/clearState");
  }
}
</script>