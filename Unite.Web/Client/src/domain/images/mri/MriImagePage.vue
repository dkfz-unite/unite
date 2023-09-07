<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="image">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="MRIs" :to="{ name: 'mris' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="tabName" />
      </q-breadcrumbs>

      <q-space />

      <u-download-button
        v-if="image"
        :id="image.id"
        :reference="image.mri.referenceId"
        :data="image.data"
        :domain="DomainNames.Mris">
      </u-download-button>
    </div>

    <div class="row" v-if="image">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
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
                <u-summary-tab :image="image" />
              </q-tab-panel>

              <q-tab-panel name="profile" class="q-py-sm q-px-none">
                <u-profile-tab :image="image" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="genes" class="q-py-sm q-px-none">
                <u-genes-tab :image="image" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="ssms" class="q-py-sm q-px-none">
                <u-ssms-tab :image="image" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="cnvs" class="q-py-sm q-px-none">
                <u-cnvs-tab :image="image" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="svs" class="q-py-sm q-px-none">
                <u-svs-tab :image="image" :samples="samples" />
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
import UVariantsTabHeader from "../../_shared/components/genome/variants/VariantsTabHeader.vue";
import USummaryTab from "./components/SummaryTab.vue";
import UProfileTab from "../_shared/components/image/ProfileTab.vue";
import UGenesTab from "../_shared/components/image/GenesTab.vue";
import USsmsTab from "../_shared/components/image/SSMsTab.vue";
import UCnvsTab from "../_shared/components/image/CNVsTab.vue";
import USvsTab from "../_shared/components/image/SVsTab.vue";
import tabPageMixin from "../../_shared/tab-page-mixin";

import DomainNames from "@/_settings/domain-names";
import imageApi from "../_shared/api/image";
import donorApi from "../../donor/api";

export default {
  components: {
    UDownloadButton,
    UVariantsTabHeader,
    USummaryTab,
    UProfileTab,
    UGenesTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [tabPageMixin],

  setup() {
    return {
      DomainNames
    };
  },

  data() {
    return {
      loading: false,
      donor: null,
      image: null,
      samples: null
    };
  },

  computed: {
    tabName() {
      return this.tab === "summary" ? "Summary"
           : this.tab === "profile" ? "Profile"
           : this.tab === "genes" ? "Genes"
           : this.tab === "ssms" ? "SSMs"
           : this.tab === "cnvs" ? "CNVs"
           : this.tab === "svs" ? "SVs"
           : this.tab;
    },

    showProfile() {
      return this.showVariants || this.image?.data?.geneExp;
    },

    showGenes() {
      return this.image?.numberOfGenes || this.image?.data?.geneExp;
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

  async mounted() {
    try {
      this.loading = true;
      this.image = await imageApi.get(this.$route.params.id);
      this.donor = await donorApi.get(this.image.donorId);
      this.samples = await imageApi.getSamples(this.image.id);
    } catch (error) {
      this.image = null;
    } finally {
      this.loading = false;
    }
  },

  async unmounted() {
    this.$store.dispatch("mri/clearState");
  }
}
</script>