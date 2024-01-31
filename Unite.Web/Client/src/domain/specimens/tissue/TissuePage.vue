<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="specimen">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home'}" />
        <q-breadcrumbs-el label="Materials" :to="{ name: 'tissues' }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="tabName" />
      </q-breadcrumbs>

      <q-space />

      <u-download-button
        v-if="specimen"
        :id="specimen.id"
        :reference="specimen.referenceId"
        :data="specimen.data"
        :domain="DomainNames.Tissues">
      </u-download-button>
    </div>

    <div class="row" v-if="specimen">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab name="summary" label="Summary" icon="las la-info-circle" />
              <q-tab name="ancestry" label="Ancestry" icon="las la-sitemap" />
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
                <u-summary-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel name="ancestry" class="q-py-sm q-px-none">
                <u-ancestry-tab :specimen="specimen" :donor="donor" />
              </q-tab-panel>

              <q-tab-panel name="profile" class="q-py-sm q-px-none">
                <u-profile-tab :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="genes" class="q-py-sm q-px-none">
                <u-genes-tab title="Specimen Genes" :area="DomainNames.Tissue" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="ssms" class="q-py-sm q-px-none">
                <u-ssms-tab title="Specimen Mutations" :area="DomainNames.Tissue" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="cnvs" class="q-py-sm q-px-none">
                <u-cnvs-tab title="Specimen Copy Number Variants" :area="DomainNames.Tissue" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel name="svs" class="q-py-sm q-px-none">
                <u-svs-tab title="Specimen Structural Variants" :area="DomainNames.Tissue" :samples="samples" />
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
import UAncestryTab from "../_shared/components/specimen/AncestryTab.vue";
import UProfileTab from "@/domain/_shared/components/genome/profile/ProfileTab.vue";
import UGenesTab from "@/domain/_shared/components/genome/genes/GenesTab.vue";
import USsmsTab from "@/domain/_shared/components/genome/variants/SSMsTab.vue";
import UCnvsTab from "@/domain/_shared/components/genome/variants/CNVsTab.vue";
import USvsTab from "@/domain/_shared/components/genome/variants/SVsTab.vue";

import tabPageMixin from "../../_shared/tab-page-mixin";
import specimenPageMixin from "../_shared/specimen-page-mixin";

export default {
  components: {
    UDownloadButton,
    UVariantsTabHeader,
    USummaryTab,
    UAncestryTab,
    UProfileTab,
    UGenesTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [tabPageMixin, specimenPageMixin],

  async unmounted() {
    this.$store.dispatch("material/clearState");
  }
}
</script>