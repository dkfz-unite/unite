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
              <q-tab name="clinical" label="Clinical Data" icon="las la-stethoscope" :disable="!showClinicalData" />
              <q-tab name="treatments" label="Treatments" icon="las la-pills" :disable="!showTreatments" />
              <q-tab name="specimens" label="Specimens" icon="las la-microscope" :disable="!showSpecimens" />
              <q-tab name="mris" label="Images" icon="las la-x-ray" :disable="!showImages" />
              <q-tab name="genes" label="Genes" icon="svguse:/icons.svg#u-gene" :disable="!showGenes" />
              <u-variants-tab-header 
                v-model="tab"
                :disable="!showVariants"
                :disableSsms="!showMutations"
                :disableCnvs="!showCopyNumberVariants"
                :disableSvs="!showStructuralVariants" />
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

              <q-tab-panel name="genes" class="q-py-sm q-px-none">
                <u-genes-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="ssms" class="q-py-sm q-px-none">
                <u-ssms-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="cnvs" class="q-py-sm q-px-none">
                <u-cnvs-tab :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="svs" class="q-py-sm q-px-none">
                <u-svs-tab :donor="donor" />
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
    UGenesTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [tabPageMixin],

  data() {
    return {
      loading: false,
      donor: null
    };
  },

  computed: {
    tabName() {
      return this.tab === "summary" ? "Summary"
           : this.tab === "clinical" ? "Clinical"
           : this.tab === "treatments" ? "Treatments"
           : this.tab === "specimens" ? "Specimens"
           : this.tab === "mris" ? "MRI"
           : this.tab === "genes" ? "Genes"
           : this.tab === "ssms" ? "SSMs"
           : this.tab === "cnvs" ? "CNVs"
           : this.tab === "svs" ? "SVs"
           : this.tab;
    },

    showClinicalData() {
      return !!this.donor?.clinicalData;
    },

    showTreatments() {
      return !!this.donor?.treatments?.length
    },

    showSpecimens() {
      return !!this.donor?.numberOfSpecimens;
    },

    showImages() {
      return !!this.donor?.numberOfImages;
    },

    showGenes() {
      return !!this.donor?.numberOfGenes;
    },

    showVariants() {
      return !!this.donor?.numberOfMutations
          || !!this.donor?.numberOfCopyNumberVariants
          || !!this.donor?.numberOfStructuralVariants;
    },

    showMutations() {
      return !!this.donor?.numberOfMutations;
    },

    showCopyNumberVariants() {
      return !!this.donor?.numberOfCopyNumberVariants;
    },

    showStructuralVariants() {
      return !!this.donor?.numberOfStructuralVariants;
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
      } catch (error) {
        this.donor = null;
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