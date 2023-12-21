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
                <u-genes-tab title="Image Genes" :area="DomainNames.Mri" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="ssms" class="q-py-sm q-px-none">
                <u-ssms-tab title="Image Mutations" :area="DomainNames.Mri" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="cnvs" class="q-py-sm q-px-none">
                <u-cnvs-tab title="Image Copy Number Variants" :area="DomainNames.Mri" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="svs" class="q-py-sm q-px-none">
                <u-svs-tab title="Image Structural Variants" :area="DomainNames.Mri" :samples="samples" />
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
import UProfileTab from "@/domain/_shared/components/genome/profile/ProfileTab.vue";
import UGenesTab from "@/domain/_shared/components/genome/genes/GenesTab.vue";
import USsmsTab from "@/domain/_shared/components/genome/variants/SSMsTab.vue";
import UCnvsTab from "@/domain/_shared/components/genome/variants/CNVsTab.vue";
import USvsTab from "@/domain/_shared/components/genome/variants/SVsTab.vue";

import DomainNames from "@/_settings/domain-names";
import tabPageMixin from "../../_shared/tab-page-mixin";
import imageApi from "../_shared/api/image";

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
      return this.showGenes || this.showVariants;
    },

    showGenes() {
      return this.image?.numberOfGenes || this.image?.data?.geneExp;
    },

    showVariants() {
      return this.showSsms || this.showCnvs || this.showSvs;
    },

    showSsms() {
      return this.image?.data?.ssms;
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
    this.$store.dispatch("mri/clearState");
  }
}
</script>