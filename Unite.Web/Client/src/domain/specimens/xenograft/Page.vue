<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="specimen && donor">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.xenografts.crumb" :to="{ name: Settings.xenografts.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="Tabs[tab].crumb" />
      </q-breadcrumbs>

      <q-space />

      <u-upload-button
        v-if="specimen && donor && canUpload"
        :donorId="donor.referenceId"
        :specimenId="specimen.referenceId"
        specimenType="Xenograft">
      </u-upload-button>

      <u-download-button
        v-if="specimen"
        :id="specimen.id"
        :reference="specimen.referenceId"
        :data="specimen.data"
        :domain="Settings.xenografts.domain">
      </u-download-button>
    </div>

    <div class="row" v-if="specimen && donor">
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
                :name="Tabs.ancestry.domain" 
                :label="Tabs.ancestry.title" 
                :icon="Tabs.ancestry.icon"
              />
              <q-tab
                :name="Tabs.interventions.domain"
                :label="Tabs.interventions.title"
                :icon="Tabs.interventions.icon"
                :disable="!showInterventions"
              />
              <q-tab
                :name="Tabs.drugs.domain"
                :label="Tabs.drugs.title"
                :icon="Tabs.drugs.icon"
                :disable="!showDrugs"
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
                <u-summary-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.ancestry.domain" class="q-py-sm q-px-none">
                <u-ancestry-tab :specimen="specimen" :donor="donor" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.interventions.domain" class="q-py-sm q-px-none">
                <u-interventions-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.drugs.domain" class="q-py-sm q-px-none">
                <u-drugs-tab :specimen="specimen" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.profile.domain" class="q-py-sm q-px-none">
                <u-profile-tab :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.genes.domain" class="q-py-sm q-px-none">
                <u-genes-tab title="Specimen Genes" :area="Settings.line.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.ssms.domain" class="q-py-sm q-px-none">
                <u-ssms-tab title="Specimen Simple Somatic Mutations (SSM)" :area="Settings.xenograft.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.cnvs.domain" class="q-py-sm q-px-none">
                <u-cnvs-tab title="Specimen Copy Number Variants (CNV)" :area="Settings.xenograft.domain" :samples="samples" />
              </q-tab-panel>

              <q-tab-panel :name="Tabs.svs.domain" class="q-py-sm q-px-none">
                <u-svs-tab title="Specimen Structural Variants (SV)" :area="Settings.xenograft.domain" :samples="samples" />
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
import UUploadButton from "../_shared/components/specimen/upload/UploadButton.vue";
import UDownloadButton from "../../_shared/components/download/DownloadButton.vue";
import UTabVariants from "../../_shared/components/genome/variants/VariantsTabHeader.vue";
import USummaryTab from "./components/summary/Tab.vue";
import UAncestryTab from "../_shared/specimen/components/tabs/ancestry/Tab.vue";
import UInterventionsTab from "../_shared/specimen/components/tabs/interventions/Tab.vue";
import UDrugsTab from "../_shared/specimen/components/tabs/drugs/Tab.vue";
import UProfileTab from "@/domain/_shared/components/genome/profile/ProfileTab.vue";
import UGenesTab from "@/domain/_shared/components/genome/genes/GenesTab.vue";
import USsmsTab from "@/domain/_shared/components/genome/variants/SSMsTab.vue";
import UCnvsTab from "@/domain/_shared/components/genome/variants/CNVsTab.vue";
import USvsTab from "@/domain/_shared/components/genome/variants/SVsTab.vue";

import Settings from "@/_settings/settings";
import tabPageMixin from "../../_shared/tab-page-mixin";
import specimenPageMixin from "../_shared/specimen-page-mixin";

export default {
  components: {
    UUploadButton,
    UDownloadButton,
    UTabVariants,
    USummaryTab,
    UAncestryTab,
    UInterventionsTab,
    UDrugsTab,
    UProfileTab,
    UGenesTab,
    USsmsTab,
    UCnvsTab,
    USvsTab
  },

  mixins: [tabPageMixin, specimenPageMixin],

  setup() {
    return {
      Settings,
      Tabs: Settings.xenograft.tabs
    }
  },

  async unmounted() {
    this.$store.dispatch(`${Settings.xenograft.domain}/clearState`);
  }
}
</script>